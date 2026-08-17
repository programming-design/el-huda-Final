/* ============================================================
   render.js — self-contained, timing-safe renderer
   All dynamic content rendering for El Huda
   ============================================================ */

/* ---- helpers ---- */
function currentLang(){
  return document.body ? (document.body.getAttribute('data-lang') || 'ar') : 'ar';
}

/* ============ Daily rotating quote ============ */
function renderDailyQuote(){
  const el = document.getElementById('daily-quote');
  if(!el || typeof dailyQuotes === 'undefined') return;
  const lang = currentLang();
  const list = dailyQuotes[lang] || dailyQuotes.ar;
  const idx = Math.floor(Date.now() / 86400000) % list.length;
  const item = list[idx];
  el.innerHTML = `<span class="dq-type">${item.type}</span><p class="dq-text">${item.text}</p><span class="dq-ref">${item.ref}</span>`;
}

/* ============ Hadiths ============ */
function renderHadiths(){
  const wrap = document.getElementById('hadiths-list');
  if(!wrap || typeof hadithsList === 'undefined') return;
  const lang = currentLang();
  const list = hadithsList[lang] || hadithsList.ar;
  wrap.innerHTML = list.map(item => `
    <div class="card anim-card">
      <div class="icon"><i data-lucide="book-marked"></i></div>
      <p class="hadith-text">${item.h}</p>
      <span class="hadith-ref">${item.r}</span>
      <p class="hadith-note">${item.t}</p>
    </div>`).join('');
  attachCardAnimations(wrap);
}

/* ============ Duas & Dhikr ============ */
function renderDuasDhikr(){
  const dWrap = document.getElementById('dhikr-list');
  const uWrap = document.getElementById('duas-list');
  if(typeof dhikrList === 'undefined') return;
  const lang = currentLang();
  if(dWrap){
    dWrap.innerHTML = (dhikrList[lang]||dhikrList.ar).map(item => `
      <div class="card anim-card">
        <div class="icon"><i data-lucide="list-checks"></i></div>
        <p class="hadith-text">${item.a}</p>
        <span class="hadith-ref">${item.c}</span>
        <p class="hadith-note">${item.n}</p>
      </div>`).join('');
    attachCardAnimations(dWrap);
  }
  if(uWrap){
    uWrap.innerHTML = (duasList[lang]||duasList.ar).map(item => `
      <div class="card anim-card">
        <div class="icon"><i data-lucide="hand-heart"></i></div>
        <h4>${item.h}</h4>
        <p class="hadith-text">${item.a}</p>
      </div>`).join('');
    attachCardAnimations(uWrap);
  }
}

/* ============ Stories (grid used e.g. on the home page) ============ */
function renderStories(){
  const wrap = document.getElementById('stories-list');
  if(!wrap || typeof storiesList === 'undefined') return;
  const lang = currentLang();
  const list = storiesList[lang] || storiesList.ar;
  const slugs = (typeof storySlugs !== 'undefined') ? storySlugs : [];
  const icons = (typeof storyIcons !== 'undefined') ? storyIcons : [];
  wrap.innerHTML = list.map((item, i) => {
    var firstPara = item.s.split(/\n\s*\n/)[0].trim();
    var first = firstPara.indexOf('. ') > -1 ? firstPara.substring(0, firstPara.indexOf('. ')+1) : firstPara;
    return `<a class="card anim-card" href="story.html?id=${slugs[i]||''}" style="text-decoration:none;display:block;">
      <div class="icon"><i data-lucide="${icons[i]||'sparkles'}"></i></div>
      <h4>${item.p}</h4>
      <p>${first}</p>
    </a>`;
  }).join('');
  attachCardAnimations(wrap);
  if(typeof lucide!=='undefined') lucide.createIcons();
}

/* ============ Asma al-Husna (THE FIX) ============ */
function renderAsma(){
  const wrap = document.getElementById('asma-list');
  if(!wrap) return;
  if(typeof asmaList === 'undefined' || !Array.isArray(asmaList) || asmaList.length === 0){
    // retry in 100ms — content.js may not be fully executed yet
    setTimeout(renderAsma, 100);
    return;
  }
  const lang = currentLang();
  const meaningKey = lang === 'ar' ? 'ar_meaning' : (lang === 'fr' ? 'fr' : 'en');
  wrap.innerHTML = asmaList.map((item, i) => `
    <div class="card anim-card asma-card" style="animation-delay:${Math.min(i*0.03,0.5)}s">
      <div class="asma-num">${i+1}</div>
      <div class="asma-ar">${item.ar}</div>
      <div class="asma-tr">${item.tr}</div>
      <div class="asma-meaning">${item[meaningKey] || item.en}</div>
    </div>`).join('');
  attachCardAnimations(wrap);
}

/* ============ FAQ ============ */
function renderFaq(){
  const wrap = document.getElementById('faq-list');
  if(!wrap || typeof faqList === 'undefined') return;
  const lang = currentLang();
  const list = faqList[lang] || faqList.ar;
  wrap.innerHTML = list.map(item => `
    <details class="faq-item">
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>`).join('');
}

/* ============ Library ============ */
function renderLibrary(){
  const wrap = document.getElementById('library-list');
  if(!wrap || typeof libraryLinks === 'undefined') return;
  const lang = currentLang();
  wrap.innerHTML = libraryLinks.map(item => `
    <a class="card anim-card" href="${item.url}" target="_blank" rel="noopener" style="text-decoration:none;display:block;">
      <div class="icon"><i data-lucide="link"></i></div>
      <h4>${item.title}</h4>
      <p>${item.desc[lang] || item.desc.en}</p>
    </a>`).join('');
  attachCardAnimations(wrap);
}

/* ============ Animation: attach to dynamically created cards ============ */
function attachCardAnimations(container){
  if(!container) return;
  const cards = container.querySelectorAll('.anim-card');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, {threshold:0.08, rootMargin:'0px 0px -30px 0px'});
    cards.forEach(c => obs.observe(c));
  } else {
    cards.forEach(c => c.classList.add('in'));
  }
}

/* ============ Master render — called once everything is ready ============ */
function renderAll(){
  renderDailyQuote();
  renderHadiths();
  renderDuasDhikr();
  renderStories();
  renderAsma();
  renderFaq();
  renderLibrary();
  activateRevealElements();
}

/* ============ Global reveal: activates .reveal and .anim-card on ALL pages ============ */
function activateRevealElements(){
  const items = document.querySelectorAll('.reveal:not(.in), .anim-card:not(.in):not(.vis)');
  if(!items.length) return;
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, {threshold:0.05, rootMargin:'0px 0px -20px 0px'});
    items.forEach(el => obs.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }
}

/* ============ Init: fire after DOM + all scripts ready ============ */
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', ()=>{ renderAll(); if(typeof lucide!=='undefined') lucide.createIcons(); });
} else {
  renderAll();
  if(typeof lucide!=='undefined') lucide.createIcons();
}

document.addEventListener('langchange', ()=>{ renderAll(); if(typeof lucide!=='undefined') lucide.createIcons(); });
