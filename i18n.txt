/**
 * i18n.js — Static JSON Translation
 * Loads ar_to_LANG.json and translates all Arabic text nodes
 */
(async () => {
  const DICTS = {};

  async function loadDict(lang) {
    if (DICTS[lang]) return DICTS[lang];
    try {
      const r = await fetch(`translations/ar_to_${lang}.json?v=4`);
      if (!r.ok) throw 0;
      DICTS[lang] = await r.json();
    } catch { DICTS[lang] = {}; }
    return DICTS[lang];
  }

  const SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','CANVAS','SVG','PATH','CIRCLE','INPUT','TEXTAREA','SELECT']);
  let snapshot = null;

  function nodes() {
    const list = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const t = n.textContent.trim();
      if (t.length < 2 || !/[\u0600-\u06FF]/.test(t)) continue;
      const p = n.parentElement;
      if (!p || SKIP.has(p.tagName)) continue;
      if (p.closest('.brand,.lang-pill,.theme-wrap,.theme-panel,#bg3d,[data-no-translate]')) continue;
      list.push(n);
    }
    return list;
  }

  function save() {
    if (snapshot) return;
    snapshot = new Map();
    nodes().forEach(n => snapshot.set(n, n.textContent));
    document.querySelectorAll('[data-i18n]').forEach(el => { if (!el.dataset.ar) el.dataset.ar = el.innerHTML.trim(); });
    document.querySelectorAll('[placeholder]').forEach(el => { if (!el.dataset.arph) el.dataset.arph = el.placeholder; });
    if (!document.documentElement.dataset.artitle) document.documentElement.dataset.artitle = document.title;
  }

  function restore() {
    if (!snapshot) return;
    snapshot.forEach((t, n) => { try { n.textContent = t; } catch {} });
    document.querySelectorAll('[data-i18n]').forEach(el => { if (el.dataset.ar) el.innerHTML = el.dataset.ar; });
    document.querySelectorAll('[placeholder]').forEach(el => { if (el.dataset.arph) el.placeholder = el.dataset.arph; });
    if (document.documentElement.dataset.artitle) document.title = document.documentElement.dataset.artitle;
    meta('ar', 'rtl');
  }

  function apply(dict, lang) {
    nodes().forEach(n => { const t = n.textContent.trim(); if (dict[t]) try { n.textContent = dict[t]; } catch {} });
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const orig = el.dataset.ar || el.innerHTML.trim();
      const clean = orig.replace(/<[^>]*>/g,'').trim();
      if (dict[clean]) el.innerHTML = dict[clean];
      else if (dict[orig]) el.innerHTML = dict[orig];
    });
    document.querySelectorAll('[placeholder]').forEach(el => { const ph = el.dataset.arph || el.placeholder; if (dict[ph]) el.placeholder = dict[ph]; });
    const t = document.documentElement.dataset.artitle || document.title;
    const ar = t.replace(/ \| El Huda$/,'').trim();
    if (dict[ar]) document.title = dict[ar] + ' | El Huda';
    meta(lang, 'ltr');
  }

  function meta(lang, dir) {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.dataset.lang = lang;
    document.querySelectorAll('#langSelect').forEach(s => s.value = lang);
    localStorage.setItem('elhuda_lang', lang);
    document.dispatchEvent(new CustomEvent('langchange', {detail:{lang}}));
  }

  function loader(show, lang) {
    let el = document.getElementById('_i18n_l');
    if (!el && show) {
      el = document.createElement('div');
      el.id = '_i18n_l';
      el.style.cssText = 'position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:rgba(8,15,12,.97);border:1px solid #c9a84c;border-radius:12px;padding:10px 22px;z-index:9999;font-size:.85rem;color:#e8d5a3;box-shadow:0 6px 28px rgba(0,0,0,.6);backdrop-filter:blur(12px);font-family:Tajawal,sans-serif;transition:opacity .3s;';
      document.body.appendChild(el);
    }
    if (!el) return;
    if (show) { el.style.opacity='1'; el.textContent='جارٍ التحميل…'; }
    else { el.style.opacity='0'; setTimeout(()=>el?.remove(),300); }
  }

  window.switchLang = async (lang) => {
    if (lang === 'ar') { restore(); return; }
    loader(true, lang);
    const dict = await loadDict(lang);
    if (Object.keys(dict).length) apply(dict, lang);
    loader(false);
  };

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    save();
    const saved = localStorage.getItem('elhuda_lang') || 'ar';
    if (saved !== 'ar') setTimeout(() => window.switchLang(saved), 300);
    // Re-apply after dynamic renders
    document.addEventListener('langchange', () => {
      const l = localStorage.getItem('elhuda_lang') || 'ar';
      if (l !== 'ar') setTimeout(async () => {
        const d = await loadDict(l);
        if (Object.keys(d).length) apply(d, l);
      }, 200);
    });
  });
})();
