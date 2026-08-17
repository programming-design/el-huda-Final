/* ============ Prayer times: Aladhan API + geolocation ============ */
const PRAYER_KEYS = ["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"];
const PRAYER_I18N = {Fajr:"p_fajr", Sunrise:"p_sunrise", Dhuhr:"p_dhuhr", Asr:"p_asr", Maghrib:"p_maghrib", Isha:"p_isha"};

let prayerTimings = null;

function pLang(){ return document.body.getAttribute('data-lang') || 'ar'; }

async function fetchTimings(lat, lon){
  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data.timings;
}

function renderTimings(timings){
  prayerTimings = timings;
  PRAYER_KEYS.forEach(key=>{
    const el = document.getElementById('time-'+key);
    if(el) el.textContent = timings[key];
  });
  highlightNextPrayer();
}

function highlightNextPrayer(){
  if(!prayerTimings) return;
  const now = new Date();
  const nowMinutes = now.getHours()*60 + now.getMinutes();
  let next = null;
  for(const key of PRAYER_KEYS){
    if(key === 'Sunrise') continue;
    const [h,m] = prayerTimings[key].split(':').map(Number);
    const mins = h*60+m;
    if(mins > nowMinutes){ next = key; break; }
  }
  if(!next) next = 'Fajr';

  document.querySelectorAll('.prayer-cell').forEach(c=>c.classList.remove('next-prayer'));
  const cell = document.getElementById('cell-'+next);
  if(cell) cell.classList.add('next-prayer');

  const lang = pLang();
  const label = document.getElementById('next-prayer-label');
  if(label){
    const name = (translations[lang]||translations.ar)[PRAYER_I18N[next]];
    const nextText = (translations[lang]||translations.ar).prayer_next;
    label.textContent = `${nextText}: ${name} — ${prayerTimings[next]}`;
  }
}

function initPrayer(){
  const status = document.getElementById('location-status');
  if(!status) return;

  const lang = pLang();
  status.textContent = (translations[lang]||translations.ar).prayer_locating;

  if(!navigator.geolocation){
    status.textContent = (translations[lang]||translations.ar).prayer_default_note;
    fetchTimings(21.4225, 39.8262).then(renderTimings);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos=>{
      const {latitude, longitude} = pos.coords;
      fetchTimings(latitude, longitude).then(t=>{
        renderTimings(t);
        const l = pLang();
        status.textContent = `${(translations[l]||translations.ar).prayer_location_label}: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
      });
    },
    ()=>{
      const l = pLang();
      status.textContent = (translations[l]||translations.ar).prayer_allow + ' — ' + (translations[l]||translations.ar).prayer_default_note;
      fetchTimings(21.4225, 39.8262).then(renderTimings);
    }
  );

  setInterval(highlightNextPrayer, 30000);
}

document.addEventListener('DOMContentLoaded', initPrayer);
document.addEventListener('langchange', highlightNextPrayer);
