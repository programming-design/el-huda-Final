/**
 * ai-translate.js — ترجمة تلقائية بـ Claude API
 * يستبدل النظام اليدوي في lang.js بترجمة ذكية فورية
 */

const AI_TRANSLATE = (() => {
  // Cache: { 'fr': { key: translatedText } }
  const cache = JSON.parse(localStorage.getItem('elhuda_ai_cache') || '{}');
  const cacheVersion = '1.0';
  let isTranslating = false;

  // ── الحصول على كل النصوص الأصلية (العربية) من الصفحة
  function collectTexts() {
    const texts = {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      // نحفظ النص العربي الأصلي في data-ar إذا لم يكن محفوظاً
      if (!el.dataset.ar) {
        el.dataset.ar = el.innerHTML.trim();
      }
      texts[key] = el.dataset.ar;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!el.dataset.arPh) {
        el.dataset.arPh = el.getAttribute('placeholder') || '';
      }
      texts[key + '__ph'] = el.dataset.arPh;
    });
    return texts;
  }

  // ── ترجمة batch بـ Claude API
  async function translateBatch(texts, targetLang) {
    const langNames = { fr: 'French', en: 'English', ar: 'Arabic' };
    const langName = langNames[targetLang] || targetLang;

    const textsJson = JSON.stringify(texts, null, 2);

    const prompt = `You are a professional Islamic content translator. Translate the following JSON object from Arabic to ${langName}.

Rules:
- Return ONLY valid JSON, no markdown, no explanation
- Keep all HTML tags exactly as they are (e.g. <span>, <strong>, <i data-lucide="..."></i>)
- Keep Arabic quotes (« ») for Quran verses and hadith
- Preserve Islamic terms naturally (Allah, ﷺ, inshallah, etc.)
- Keep all emojis unchanged
- Short UI labels should be concise
- Translate naturally and professionally for a Muslim audience

Input JSON:
${textsJson}

Return the translated JSON object with the same keys:`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    const text = data.content.map(b => b.text || '').join('');

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    return JSON.parse(jsonMatch[0]);
  }

  // ── تطبيق الترجمة على الصفحة
  function applyTranslations(dict, lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key + '__ph']) el.setAttribute('placeholder', dict[key + '__ph']);
    });

    // اتجاه النص
    document.body.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('#langSelect').forEach(s => s.value = lang);
    localStorage.setItem('elhuda_lang', lang);
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  // ── إعادة النص العربي
  function restoreArabic() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.dataset.ar) el.innerHTML = el.dataset.ar;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      if (el.dataset.arPh) el.setAttribute('placeholder', el.dataset.arPh);
    });
    document.body.setAttribute('data-lang', 'ar');
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.querySelectorAll('#langSelect').forEach(s => s.value = 'ar');
    localStorage.setItem('elhuda_lang', 'ar');
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: 'ar' } }));
  }

  // ── عرض مؤشر التحميل
  function showLoader(show, lang) {
    let loader = document.getElementById('ai-translate-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'ai-translate-loader';
      loader.style.cssText = `
        position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
        background:rgba(20,40,30,.95);border:1px solid var(--gold,#b8860b);
        border-radius:12px;padding:12px 22px;z-index:9999;
        display:flex;align-items:center;gap:10px;font-size:.88rem;
        color:#e8d5a3;box-shadow:0 8px 28px rgba(0,0,0,.5);
        backdrop-filter:blur(10px);transition:opacity .3s;
      `;
      document.body.appendChild(loader);
    }
    if (show) {
      const langEmoji = { fr: '🇫🇷', en: '🇬🇧', ar: '🇲🇦' }[lang] || '🌐';
      loader.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        <span>جارٍ الترجمة إلى ${langEmoji}...</span>
      `;
      loader.style.opacity = '1';
      loader.style.display = 'flex';
      if (!document.getElementById('ai-spin-style')) {
        const st = document.createElement('style');
        st.id = 'ai-spin-style';
        st.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
        document.head.appendChild(st);
      }
    } else {
      loader.style.opacity = '0';
      setTimeout(() => { if (loader) loader.style.display = 'none'; }, 400);
    }
  }

  // ── الدالة الرئيسية
  async function translate(lang) {
    if (isTranslating) return;

    // العربية → استعادة مباشرة
    if (lang === 'ar') {
      restoreArabic();
      return;
    }

    // جمع النصوص أولاً (يحفظ النص العربي)
    const texts = collectTexts();
    const pageKey = window.location.pathname.split('/').pop() || 'index';
    const cacheKey = `${cacheVersion}_${pageKey}_${lang}`;

    // تحقق من الكاش
    if (cache[cacheKey]) {
      applyTranslations(cache[cacheKey], lang);
      return;
    }

    isTranslating = true;
    showLoader(true, lang);

    try {
      // ترجمة على دفعات إذا كانت النصوص كثيرة
      const keys = Object.keys(texts);
      const BATCH = 60;
      let translated = {};

      for (let i = 0; i < keys.length; i += BATCH) {
        const batchKeys = keys.slice(i, i + BATCH);
        const batchTexts = {};
        batchKeys.forEach(k => batchTexts[k] = texts[k]);
        const result = await translateBatch(batchTexts, lang);
        translated = { ...translated, ...result };
      }

      // حفظ في الكاش
      cache[cacheKey] = translated;
      try {
        localStorage.setItem('elhuda_ai_cache', JSON.stringify(cache));
      } catch(e) {
        // localStorage ممتلئ — نمسح الكاش القديم
        localStorage.removeItem('elhuda_ai_cache');
      }

      applyTranslations(translated, lang);

    } catch (err) {
      console.error('AI Translate error:', err);
      // Fallback: استخدم الترجمات اليدوية إن وُجدت
      if (typeof translations !== 'undefined' && translations[lang]) {
        const dict = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (dict[key]) el.innerHTML = dict[key];
        });
        document.body.setAttribute('data-lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = 'ltr';
        document.querySelectorAll('#langSelect').forEach(s => s.value = lang);
        localStorage.setItem('elhuda_lang', lang);
      } else {
        // أظهر رسالة خطأ بسيطة
        showError();
      }
    } finally {
      isTranslating = false;
      showLoader(false);
    }
  }

  function showError() {
    const loader = document.getElementById('ai-translate-loader');
    if (loader) {
      loader.innerHTML = '⚠️ تعذّرت الترجمة — تحقق من الاتصال';
      loader.style.borderColor = '#e55';
      setTimeout(() => { loader.style.opacity = '0'; }, 3000);
    }
  }

  // ── مسح الكاش (للمطورين)
  function clearCache() {
    localStorage.removeItem('elhuda_ai_cache');
    Object.keys(cache).forEach(k => delete cache[k]);
    console.log('AI translate cache cleared');
  }

  return { translate, clearCache };
})();

// ── ربط بـ langSelect في جميع الصفحات
document.addEventListener('DOMContentLoaded', () => {
  // جمع النصوص العربية فوراً قبل أي تغيير
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!el.dataset.ar) el.dataset.ar = el.innerHTML.trim();
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    if (!el.dataset.arPh) el.dataset.arPh = el.getAttribute('placeholder') || '';
  });

  // استعادة اللغة المحفوظة
  const saved = localStorage.getItem('elhuda_lang');
  if (saved && saved !== 'ar') {
    AI_TRANSLATE.translate(saved);
  }
});
