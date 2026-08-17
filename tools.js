/* ============ Zakat Calculator ============ */
function setupZakat(){
  const btn = document.getElementById('zakatCalcBtn');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const cash = parseFloat(document.getElementById('zakatCash').value) || 0;
    const gold = parseFloat(document.getElementById('zakatGold').value) || 0;
    const total = cash + gold;
    const zakat = total * 0.025;
    document.getElementById('zakatResult').textContent = zakat.toLocaleString(undefined, {maximumFractionDigits:2});
  });
}

/* ============ Qibla Direction ============ */
const KAABA = {lat:21.4225, lng:39.8262};
function setupQibla(){
  const statusEl = document.getElementById('qiblaStatus');
  const resultEl = document.getElementById('qiblaResult');
  if(!statusEl) return;
  const lang = document.body.getAttribute('data-lang') || 'ar';
  const t = translations[lang] || translations.ar;
  statusEl.textContent = t.qibla_locating;

  if(!navigator.geolocation){
    statusEl.innerHTML = '<i data-lucide="alert-triangle" style="width:14px;height:14px;vertical-align:-2px;"></i> ' + t.qibla_locating;
    if(typeof lucide!=='undefined') lucide.createIcons();
    return;
  }
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude, longitude} = pos.coords;
    const bearing = calcQiblaBearing(latitude, longitude);
    statusEl.textContent = `${t.prayer_location_label}: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    resultEl.innerHTML = `<span class="qibla-degrees">${bearing.toFixed(1)}°</span>`;
    const arrow = document.getElementById('qiblaArrow');
    if(arrow) arrow.style.transform = `rotate(${bearing}deg)`;
  }, ()=>{
    statusEl.innerHTML = '<i data-lucide="alert-triangle" style="width:14px;height:14px;vertical-align:-2px;"></i> ' + t.prayer_allow;
    if(typeof lucide!=='undefined') lucide.createIcons();
  });
}
function calcQiblaBearing(lat, lng){
  const toRad = d => d * Math.PI/180;
  const toDeg = r => r * 180/Math.PI;
  const phiK = toRad(KAABA.lat), lambdaK = toRad(KAABA.lng);
  const phi = toRad(lat), lambda = toRad(lng);
  const psi = toDeg(Math.atan2(
    Math.sin(lambdaK - lambda),
    Math.cos(phi)*Math.tan(phiK) - Math.sin(phi)*Math.cos(lambdaK - lambda)
  ));
  return (psi + 360) % 360;
}

/* ============ Hijri Calendar ============ */
async function setupHijri(){
  const el = document.getElementById('hijriToday');
  if(!el) return;
  try{
    const res = await fetch('https://api.aladhan.com/v1/gToH');
    const json = await res.json();
    const h = json.data.hijri;
    const lang = document.body.getAttribute('data-lang') || 'ar';
    const monthName = lang === 'ar' ? h.month.ar : h.month.en;
    el.textContent = `${h.day} ${monthName} ${h.year} هـ`;
  }catch(e){
    el.textContent = '—';
  }
}

/* ============ Quran Search ============ */
async function setupQuranSearch(){
  const btn = document.getElementById('searchBtn');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if(!btn) return;
  async function doSearch(){
    const q = input.value.trim();
    if(!q) return;
    const lang = document.body.getAttribute('data-lang') || 'ar';
    const t = translations[lang] || translations.ar;
    const edition = lang === 'ar' ? 'ar' : lang;
    results.innerHTML = `<p class="quran-status">${t.quran_loading}</p>`;
    try{
      const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/${edition}`);
      const json = await res.json();
      if(json.code !== 200 || !json.data || !json.data.matches || !json.data.matches.length){
        results.innerHTML = `<p class="quran-status">${t.search_no_results}</p>`;
        return;
      }
      results.innerHTML = `<p style="color:var(--text-dim); margin-bottom:14px;">${t.search_results_label} ${json.data.count}</p>` +
        json.data.matches.map(m => `
          <div class="ayah-card">
            <div class="ayah-top"><span class="ayah-num"><span>${m.surah.number}:${m.numberInSurah}</span></span></div>
            <p class="ayah-arabic" style="font-size:1.2em;">${m.text}</p>
            <p class="ayah-translation"><strong>${m.surah.englishName} — ${m.surah.name}</strong></p>
          </div>`).join('');
    }catch(e){
      results.innerHTML = `<p class="quran-status">⚠️ ${e.message||e}</p>`;
    }
  }
  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e=>{ if(e.key === 'Enter') doSearch(); });
}

/* ============ Quran Tracker ============ */
function getTrackerLog(){
  try{ return JSON.parse(localStorage.getItem('elhuda_tracker')) || []; }catch(e){ return []; }
}
function setupTracker(){
  const addBtn = document.getElementById('trackerAddBtn');
  if(!addBtn) return;
  renderTrackerLog();
  addBtn.addEventListener('click', ()=>{
    const val = parseFloat(document.getElementById('trackerPages').value);
    if(!val || val <= 0) return;
    const log = getTrackerLog();
    log.unshift({date: new Date().toISOString().slice(0,10), pages: val});
    localStorage.setItem('elhuda_tracker', JSON.stringify(log));
    document.getElementById('trackerPages').value = '';
    renderTrackerLog();
  });
  const resetBtn = document.getElementById('trackerResetBtn');
  if(resetBtn){
    resetBtn.addEventListener('click', ()=>{
      localStorage.removeItem('elhuda_tracker');
      renderTrackerLog();
    });
  }
}
function renderTrackerLog(){
  const log = getTrackerLog();
  const total = log.reduce((s,e)=> s + e.pages, 0);
  const totalEl = document.getElementById('trackerTotal');
  const lang = document.body.getAttribute('data-lang') || 'ar';
  const t = translations[lang] || translations.ar;
  if(totalEl) totalEl.textContent = `${total} ${t.tracker_pages_unit}`;
  const listEl = document.getElementById('trackerLogList');
  if(listEl){
    listEl.innerHTML = log.map(e => `
      <div class="tracker-row"><span>${e.date}</span><span>${e.pages} ${t.tracker_pages_unit}</span></div>
    `).join('') || `<p style="color:var(--text-dim);">—</p>`;
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  setupZakat();
  setupQibla();
  setupHijri();
  setupQuranSearch();
  setupTracker();
});
document.addEventListener('langchange', ()=>{
  setupHijri();
  renderTrackerLog();
});
