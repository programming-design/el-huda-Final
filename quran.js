/* ============ Quran reader ============
   Text / translation / tafsir : alquran.cloud API
   Reciters / audio            : mp3quran.net v3 API
   (https://www.mp3quran.net/eng/api — large, professional reciter library
   with official full-surah files and real ayah-timing data) */
const QURAN_BASE = "https://api.alquran.cloud/v1";
const MP3Q_BASE  = "https://www.mp3quran.net/api/v3";
const translationEdition = { en: "en.sahih", fr: "fr.hamidullah" };
/* mp3quran.net language codes for its `language=` query param */
const MP3Q_LANG = { ar: "ar", en: "eng", fr: "fr" };

/* Small built-in fallback in case the mp3quran API can't be reached
   (offline / network hiccup). Servers double as a "read" for ayah timing,
   so ayah-by-ayah playback still works even in fallback mode. */
const MP3Q_FALLBACK = [
  { value: "fallback-afasy",  reciterName: "مشاري راشد العفاسي", moshafName: "حفص عن عاصم - مرتل", server: "https://server8.mp3quran.net/afs/",  surahSet: null },
  { value: "fallback-husary", reciterName: "محمود خليل الحصري",  moshafName: "حفص عن عاصم - مرتل", server: "https://server13.mp3quran.net/husr/", surahSet: null },
  { value: "fallback-sudais", reciterName: "عبدالرحمن السديس",   moshafName: "حفص عن عاصم - مرتل", server: "https://server11.mp3quran.net/sds/",  surahSet: null }
];

let MP3Q_OPTIONS = [...MP3Q_FALLBACK];   // flattened list: one entry per reciter+riwayah (moshaf)
let MP3Q_TIMING_READS = null;            // reads that have ayah-by-ayah timing data (fetched once, cached)
let TAFSIR_EDITIONS = [{identifier:"ar.muyassar", language:"ar", name:"التفسير الميسر", englishName:"Tafsir Al-Muyassar"}];

let surahListCache = null;
let currentSurahData = null;
let currentReciter = localStorage.getItem('elhuda_reciter') || MP3Q_OPTIONS[0].value;
let currentMushafStyle = localStorage.getItem('elhuda_mushaf_style') || 'quran-uthmani';
let currentTafsirSource = localStorage.getItem('elhuda_tafsir_source') || 'ar.muyassar';
let fontScale = parseFloat(localStorage.getItem('elhuda_quran_font')) || 1;
let audioMode = 'ayah'; // 'ayah' | 'surah'

function qLang(){ return document.body.getAttribute('data-lang') || 'ar'; }
function pageMode(){
  const c = document.getElementById('quran-ayat');
  if(!c) return '';
  if(c.classList.contains('mode-audio')) return 'audio';
  if(c.classList.contains('mode-tafsir')) return 'tafsir';
  return 'read';
}
function pad3(n){ return String(n).padStart(3, '0'); }
function getCurrentMoshaf(){ return MP3Q_OPTIONS.find(o => o.value === currentReciter) || MP3Q_OPTIONS[0]; }

/* ---------- Play / pause icons (Font Awesome, already loaded site-wide) ---------- */
function setPlayIcon(btn, playing){
  if(!btn) return;
  btn.innerHTML = `<i class="fa-solid ${playing ? 'fa-pause' : 'fa-play'}"></i>`;
}
function setSurahBtnIcon(playing){
  const btn = document.getElementById('playSurahBtn');
  if(!btn) return;
  const label = (translations[qLang()]||translations.ar).play_surah;
  btn.innerHTML = `<i class="fa-solid ${playing ? 'fa-pause' : 'fa-play'}"></i> ${label}`;
}
function resetOtherPlayButtons(except){
  document.querySelectorAll('.play-btn').forEach(b=>{ if(b!==except) setPlayIcon(b, false); });
  const surahBtn = document.getElementById('playSurahBtn');
  if(surahBtn && surahBtn!==except) setSurahBtnIcon(false);
}
/* Highlights the ayah currently being recited and smoothly scrolls it
   into view, whether we're in card mode or mushaf page mode. */
function highlightPlayingAyah(num){
  if(currentMushafStyle === 'quran-page'){
    highlightPageMarker(num);
    return;
  }
  document.querySelectorAll('.ayah-card.playing').forEach(c=> c.classList.remove('playing'));
  const card = document.querySelector(`.ayah-card[data-ayah="${num}"]`);
  if(card){
    card.classList.add('playing');
    card.scrollIntoView({behavior:'smooth', block:'center'});
  }
}

/* ---------- Surah list ---------- */
async function loadSurahList(){
  const select = document.getElementById('surahSelect');
  if(!select) return;
  if(!surahListCache){
    try{
      const res = await fetch(`${QURAN_BASE}/surah`);
      const json = await res.json();
      surahListCache = json.data;
    }catch(e){
      select.innerHTML = `<option>—</option>`;
      return;
    }
  }
  const lang = qLang();
  const current = select.value;
  select.innerHTML = surahListCache.map(s=>{
    const label = lang === 'ar'
      ? `${s.number}. ${s.name}`
      : `${s.number}. ${s.englishName} — ${s.englishNameTranslation}`;
    return `<option value="${s.number}">${label}</option>`;
  }).join('');
  if(current) select.value = current;
}

/* ---------- mp3quran.net: ayah-timing "reads" (used to match a chosen
   reciter/moshaf to real per-ayah timestamps within its full-surah file) ---------- */
function normalizeServerUrl(u){
  return (u || '').trim().toLowerCase().replace(/\/+$/, '');
}
async function loadTimingReads(){
  if(MP3Q_TIMING_READS) return MP3Q_TIMING_READS;
  try{
    const res = await fetch(`${MP3Q_BASE}/ayat_timing/reads`);
    const json = await res.json();
    MP3Q_TIMING_READS = Array.isArray(json) ? json : [];
  }catch(e){
    MP3Q_TIMING_READS = [];
  }
  return MP3Q_TIMING_READS;
}
function findTimingReadForServer(server){
  if(!MP3Q_TIMING_READS) return null;
  const target = normalizeServerUrl(server);
  return MP3Q_TIMING_READS.find(r => normalizeServerUrl(r.folder_url) === target) || null;
}

/* ---------- Reciter list (dynamic, from mp3quran.net — hundreds of
   reciters across multiple riwayat) ---------- */
async function loadReciterList(){
  const select = document.getElementById('reciterSelect');
  if(!select) return;
  const lang = MP3Q_LANG[qLang()] || 'ar';

  await loadTimingReads();

  try{
    const res = await fetch(`${MP3Q_BASE}/reciters?language=${lang}`);
    const json = await res.json();
    if(json.reciters && json.reciters.length){
      const flat = [];
      json.reciters.forEach(r=>{
        (r.moshaf || []).forEach(m=>{
          flat.push({
            value: String(m.id),
            reciterName: r.name,
            moshafName: m.name,
            server: m.server,
            surahSet: m.surah_list ? new Set(String(m.surah_list).split(',').map(n=>parseInt(n,10))) : null
          });
        });
      });
      if(flat.length) MP3Q_OPTIONS = flat;
    }
  }catch(e){ /* keep fallback list */ }

  // group options by reciter for a tidy <optgroup> dropdown
  const byReciter = new Map();
  MP3Q_OPTIONS.forEach(o=>{
    if(!byReciter.has(o.reciterName)) byReciter.set(o.reciterName, []);
    byReciter.get(o.reciterName).push(o);
  });
  select.innerHTML = [...byReciter.entries()].map(([name, opts])=>{
    if(opts.length === 1){
      return `<option value="${opts[0].value}">${name}</option>`;
    }
    return `<optgroup label="${name}">${opts.map(o=>`<option value="${o.value}">${o.moshafName}</option>`).join('')}</optgroup>`;
  }).join('');

  if(MP3Q_OPTIONS.find(o=>o.value===currentReciter)){
    select.value = currentReciter;
  } else {
    currentReciter = MP3Q_OPTIONS[0].value;
    select.value = currentReciter;
  }
  refreshAudioModeAvailability();

  select.addEventListener('change', ()=>{
    currentReciter = select.value;
    localStorage.setItem('elhuda_reciter', currentReciter);
    refreshAudioModeAvailability();
    if(currentSurahData) loadSurah(currentSurahData.number);
  });
}

/* Disables "ayah by ayah" mode (forces "full surah") whenever the chosen
   reciter/moshaf has no matching ayah-timing data on mp3quran.net — keeps
   the UI honest instead of silently breaking per-ayah playback. */
function refreshAudioModeAvailability(){
  const ayahBtn = document.getElementById('audioModeAyah');
  const note = document.getElementById('audioTimingNote');
  if(!ayahBtn) return;
  const moshaf = getCurrentMoshaf();
  const hasTiming = !!findTimingReadForServer(moshaf.server);
  ayahBtn.disabled = !hasTiming;
  ayahBtn.classList.toggle('disabled', !hasTiming);
  if(!hasTiming && audioMode === 'ayah'){
    audioMode = 'surah';
    const surahBtn = document.getElementById('audioModeSurah');
    if(surahBtn) surahBtn.click();
  }
  if(note){
    const t = translations[qLang()] || translations.ar;
    note.textContent = hasTiming ? '' : (t.audio_no_ayah_timing || '');
    note.style.display = hasTiming ? 'none' : '';
  }
}

/* ---------- Tafsir editions (dynamic, from API, multilingual) ---------- */
async function loadTafsirList(){
  const select = document.getElementById('tafsirSource');
  if(!select) return;
  try{
    const res = await fetch(`${QURAN_BASE}/edition/type/tafsir`);
    const json = await res.json();
    if(json.data && json.data.length) TAFSIR_EDITIONS = json.data;
  }catch(e){ /* keep fallback */ }

  const lang = qLang();
  const langMap = {ar:'ar', en:'en', fr:'fr'};
  const preferred = TAFSIR_EDITIONS.filter(e => e.language === langMap[lang]);
  const arabicOnes = TAFSIR_EDITIONS.filter(e => e.language === 'ar');
  const others = TAFSIR_EDITIONS.filter(e => e.language !== langMap[lang] && e.language !== 'ar');

  function optList(arr){
    return arr.map(e => `<option value="${e.identifier}">${e.name || e.englishName} (${e.language})</option>`).join('');
  }

  let html = '';
  if(preferred.length && lang !== 'ar'){
    html += `<optgroup label="${lang.toUpperCase()}">${optList(preferred)}</optgroup>`;
  }
  html += `<optgroup label="AR">${optList(arabicOnes)}</optgroup>`;
  if(others.length){
    html += `<optgroup label="${(translations[lang]||translations.ar).quran_hub_tafsir_h}">${optList(others)}</optgroup>`;
  }
  select.innerHTML = html;

  // pick a sensible default: preferred-language tafsir if available, else current/ar.muyassar
  if(preferred.length && lang !== 'ar' && !TAFSIR_EDITIONS.find(e=>e.identifier===currentTafsirSource && e.language===langMap[lang])){
    currentTafsirSource = preferred[0].identifier;
  }
  if(TAFSIR_EDITIONS.find(e=>e.identifier===currentTafsirSource)){
    select.value = currentTafsirSource;
  } else if(arabicOnes.length){
    currentTafsirSource = arabicOnes[0].identifier;
    select.value = currentTafsirSource;
  }

  select.addEventListener('change', ()=>{
    currentTafsirSource = select.value;
    localStorage.setItem('elhuda_tafsir_source', currentTafsirSource);
    if(currentSurahData) loadSurah(currentSurahData.number);
  });
}

/* ---------- Mushaf style selector ---------- */
function setupMushafStyle(){
  const select = document.getElementById('mushafStyle');
  if(!select) return;
  select.value = currentMushafStyle;
  applyMushafStyleClass();
  select.addEventListener('change', ()=>{
    currentMushafStyle = select.value;
    localStorage.setItem('elhuda_mushaf_style', currentMushafStyle);
    applyMushafStyleClass();
    if(currentSurahData) loadSurah(currentSurahData.number);
  });
}
function applyMushafStyleClass(){
  const container = document.getElementById('quran-ayat');
  if(!container) return;
  container.classList.remove('style-uthmani','style-simple','style-tajweed','style-page');
  if(currentMushafStyle === 'quran-simple') container.classList.add('style-simple');
  else if(currentMushafStyle === 'quran-tajweed') container.classList.add('style-tajweed');
  else if(currentMushafStyle === 'quran-page') container.classList.add('style-page');
  else container.classList.add('style-uthmani');

  const legend = document.getElementById('tajweedLegend');
  if(legend) legend.style.display = (currentMushafStyle === 'quran-tajweed') ? 'block' : 'none';
}

/* ---------- Tafsir source: initial setup ---------- */
function setupTafsirSource(){
  const select = document.getElementById('tafsirSource');
  if(!select) return Promise.resolve();
  return loadTafsirList();
}

/* ---------- Audio mode (manual ayah / continuous full-surah) ---------- */
let sequentialPlaying = false;
function setupAudioMode(){
  const ayahBtn = document.getElementById('audioModeAyah');
  const surahBtn = document.getElementById('audioModeSurah');
  const playSurahBtn = document.getElementById('playSurahBtn');
  if(!ayahBtn || !surahBtn) return;
  function update(){
    ayahBtn.classList.toggle('active', audioMode==='ayah');
    surahBtn.classList.toggle('active', audioMode==='surah');
    document.querySelectorAll('.play-btn').forEach(b=> b.style.display = audioMode==='ayah' ? '' : 'none');
    if(playSurahBtn) playSurahBtn.style.display = audioMode==='surah' ? '' : 'none';
    if(audioMode!=='surah') stopSequential();
  }
  ayahBtn.addEventListener('click', ()=>{ if(ayahBtn.disabled) return; audioMode='ayah'; update(); });
  surahBtn.addEventListener('click', ()=>{ audioMode='surah'; update(); });
  if(playSurahBtn){
    setSurahBtnIcon(false);
    playSurahBtn.addEventListener('click', ()=>{
      if(sequentialPlaying) stopSequential();
      else playFullSurah();
    });
  }
  update();
}

function stopSequential(){
  sequentialPlaying = false;
  if(audioPlayer){
    audioPlayer.pause();
    audioPlayer.ontimeupdate = null;
  }
  document.querySelectorAll('.ayah-card.playing').forEach(c=> c.classList.remove('playing'));
  document.querySelectorAll('.page-ayah-num.playing').forEach(s=> s.classList.remove('playing'));
  setSurahBtnIcon(false);
}

/* Play the whole surah as a single continuous recitation file straight
   from mp3quran.net's own servers for the selected reciter/riwayah. When
   real ayah-timing data is available for that reciter, the ayah being
   recited is highlighted and auto-scrolled into view as the file plays. */
function playFullSurah(){
  if(!currentSurahData || !currentSurahData.audioMeta || !currentSurahData.audioMeta.available) return;
  sequentialPlaying = true;
  resetOtherPlayButtons();
  setSurahBtnIcon(true);

  document.querySelectorAll('.ayah-card.playing, .page-ayah-num.playing').forEach(c=> c.classList.remove('playing'));

  if(!audioPlayer) audioPlayer = new Audio();
  audioPlayer.onerror = ()=>{ if(sequentialPlaying) stopSequential(); };
  audioPlayer.onended = ()=>{ if(sequentialPlaying) stopSequential(); };

  const timing = currentSurahData.timing;
  let lastAyah = null;
  audioPlayer.ontimeupdate = timing ? ()=>{
    const ms = audioPlayer.currentTime * 1000;
    let current = null;
    for(const ayahNum in timing){
      const seg = timing[ayahNum];
      if(ms >= seg.start && ms < seg.end){ current = ayahNum; break; }
    }
    if(current && current !== lastAyah){
      lastAyah = current;
      highlightPlayingAyah(current);
    }
  } : null;

  audioPlayer.src = currentSurahData.audioMeta.url;
  audioPlayer.play().catch(()=>{ stopSequential(); });
}

/* Plays a single ayah by seeking into the reciter's full-surah file and
   stopping at that ayah's end timestamp (real per-ayah audio, sourced
   from mp3quran.net's ayah-timing API — no separate per-ayah files
   needed). Also highlights and auto-scrolls to the ayah being played. */
function playAyahTimed(url, startMs, endMs, btn, ayahNum){
  if(!url) return;
  if(!audioPlayer) audioPlayer = new Audio();
  sequentialPlaying = false;
  audioPlayer.onerror = null;
  audioPlayer.onended = null;
  resetOtherPlayButtons(btn);

  const alreadyOnThisAyah = audioPlayer.src === url && !audioPlayer.paused &&
    Math.abs(audioPlayer.currentTime*1000 - startMs) < (endMs-startMs) + 500;
  if(alreadyOnThisAyah){
    audioPlayer.pause();
    audioPlayer.ontimeupdate = null;
    if(btn) setPlayIcon(btn, false);
    return;
  }

  const startPlayback = ()=>{
    audioPlayer.currentTime = startMs / 1000;
    audioPlayer.play();
    if(ayahNum != null) highlightPlayingAyah(ayahNum);
  };
  if(audioPlayer.src !== url){
    audioPlayer.src = url;
    audioPlayer.addEventListener('loadedmetadata', startPlayback, { once: true });
  } else {
    startPlayback();
  }

  audioPlayer.ontimeupdate = ()=>{
    if(audioPlayer.currentTime*1000 >= endMs){
      audioPlayer.pause();
      audioPlayer.ontimeupdate = null;
      if(btn) setPlayIcon(btn, false);
    }
  };
  if(btn) setPlayIcon(btn, true);
}

/* ---------- Load ayah timing for the current reciter + surah, if the
   selected moshaf has timing data on mp3quran.net ---------- */
const timingCache = {};
async function loadAyahTiming(readId, surahNumber){
  const key = `${readId}_${surahNumber}`;
  if(timingCache[key]) return timingCache[key];
  try{
    const res = await fetch(`${MP3Q_BASE}/ayat_timing?surah=${surahNumber}&read=${readId}`);
    const json = await res.json();
    const map = {};
    (Array.isArray(json) ? json : []).forEach(row=>{
      if(row.ayah && row.ayah > 0){
        map[row.ayah] = { start: row.start_time, end: row.end_time };
      }
    });
    timingCache[key] = map;
  }catch(e){
    timingCache[key] = null;
  }
  return timingCache[key];
}

/* ---------- Load a surah ---------- */
async function loadSurah(number){
  stopSequential();
  const container = document.getElementById('quran-ayat');
  if(!container) return;
  const lang = qLang();
  const t = translations[lang] || translations.ar;
  const mode = pageMode();
  container.innerHTML = `<p class="quran-status">${t.quran_loading}</p>`;

  const apiArabicEdition = (currentMushafStyle === 'quran-page' || mode === 'tafsir') ? 'quran-uthmani' : currentMushafStyle;
  const editionSet = [apiArabicEdition];
  if(mode === 'tafsir') editionSet.push(currentTafsirSource, "quran-uthmani");
  if(translationEdition[lang]) editionSet.push(translationEdition[lang]);

  const editions = [...new Set(editionSet)].join(',');

  try{
    const res = await fetch(`${QURAN_BASE}/surah/${number}/editions/${editions}`);
    const json = await res.json();
    if(json.code !== 200 || !json.data) throw new Error('API error');

    const byEdition = {};
    json.data.forEach(ed => { byEdition[ed.edition.identifier] = ed; });

    currentSurahData = {
      number,
      arabic: byEdition[apiArabicEdition] || byEdition["quran-uthmani"],
      plainArabic: byEdition["quran-uthmani"],
      tafsir: byEdition[currentTafsirSource],
      translation: translationEdition[lang] ? byEdition[translationEdition[lang]] : null,
      audioMeta: null,
      timing: null
    };

    if(mode === 'audio'){
      const moshaf = getCurrentMoshaf();
      const available = !moshaf.surahSet || moshaf.surahSet.has(number);
      currentSurahData.audioMeta = {
        url: `${moshaf.server}${pad3(number)}.mp3`,
        available
      };
      if(available){
        const timingRead = findTimingReadForServer(moshaf.server);
        if(timingRead){
          currentSurahData.timing = await loadAyahTiming(timingRead.id, number);
        }
      }
    }

    renderAyat();
    recordReadingProgress(number, currentSurahData.arabic.ayahs.length);
  }catch(e){
    container.innerHTML = `<p class="quran-status">⚠️ ${e.message || e}</p>`;
  }
}

/* ---------- Real reading-progress tracking ----------
   Marks a surah as "read" the first time its ayahs are actually loaded
   and displayed (not merely selected in a dropdown). Progress = total
   distinct ayahs viewed across all surahs, out of the Quran's 6236. */
const QURAN_TOTAL_AYAT = 6236;
function recordReadingProgress(surahNumber, ayahCount){
  let read = {};
  try{ read = JSON.parse(localStorage.getItem('quran_read_surahs')) || {}; }catch(e){ read = {}; }
  read[surahNumber] = ayahCount;
  localStorage.setItem('quran_read_surahs', JSON.stringify(read));
  const totalRead = Object.values(read).reduce((a,b)=>a+b, 0);
  localStorage.setItem('quran_progress_ayat', String(totalRead));
  localStorage.setItem('quran_progress_pct', String(Math.min(100, Math.round(totalRead / QURAN_TOTAL_AYAT * 100))));
  localStorage.setItem('quran_last_surah', String(surahNumber));
}

/* ---------- Render ayat ---------- */
function renderAyat(){
  const container = document.getElementById('quran-ayat');
  if(!container || !currentSurahData || !currentSurahData.arabic) return;
  const mode = pageMode();
  if(mode === 'audio' && currentSurahData.audioMeta && !currentSurahData.audioMeta.available){
    const t = translations[qLang()] || translations.ar;
    const banner = `<p class="quran-status">⚠️ ${t.audio_surah_unavailable}</p>`;
    if(currentMushafStyle === 'quran-page'){ renderMushafPage(); }
    else { renderAyahCards(); }
    container.insertAdjacentHTML('afterbegin', banner);
    return;
  }
  if(mode !== 'tafsir' && currentMushafStyle === 'quran-page'){
    renderMushafPage();
    return;
  }
  renderAyahCards();
}

/* ---------- Mushaf page-style continuous render ---------- */
function renderMushafPage(){
  const container = document.getElementById('quran-ayat');
  const {arabic} = currentSurahData;
  const lang = qLang();
  const mode = pageMode();
  const surahInfo = (surahListCache || []).find(s => s.number === currentSurahData.number);
  const surahName = surahInfo ? (lang === 'ar' ? surahInfo.name : `${surahInfo.englishName} — ${surahInfo.englishNameTranslation}`) : '';
  const audioOk = mode === 'audio' && currentSurahData.audioMeta && currentSurahData.audioMeta.available;
  const timing = currentSurahData.timing;

  const ayahsHtml = arabic.ayahs.map((ayah)=>{
    let clickable = '';
    if(audioOk && audioMode === 'ayah' && timing && timing[ayah.numberInSurah]){
      const seg = timing[ayah.numberInSurah];
      clickable = `onclick="playAyahTimed('${currentSurahData.audioMeta.url}', ${seg.start}, ${seg.end}, null, ${ayah.numberInSurah})"`;
    }
    return `${ayah.text} <span class="page-ayah-num" id="pageayah-${ayah.numberInSurah}" ${clickable}>${toArabicDigits(ayah.numberInSurah)}</span>`;
  }).join(' ');

  container.innerHTML = `
    <div class="mushaf-page reveal in">
      <div class="mushaf-banner">${surahName}</div>
      <p class="mushaf-flow">${ayahsHtml}</p>
    </div>
  `;
}

function highlightPageMarker(num){
  document.querySelectorAll('.page-ayah-num.playing').forEach(s=>s.classList.remove('playing'));
  const marker = document.getElementById('pageayah-'+num);
  if(marker){
    marker.classList.add('playing');
    marker.scrollIntoView({behavior:'smooth', block:'center'});
  }
}

function toArabicDigits(n){
  const map = {'0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩'};
  return String(n).split('').map(d=>map[d]||d).join('');
}

/* ---------- Per-ayah card render (default) ---------- */
function renderAyahCards(){
  const container = document.getElementById('quran-ayat');
  if(!container || !currentSurahData || !currentSurahData.arabic) return;
  const {arabic, translation, tafsir} = currentSurahData;
  const lang = qLang();
  const t = translations[lang] || translations.ar;
  const mode = pageMode();
  const audioOk = mode === 'audio' && currentSurahData.audioMeta && currentSurahData.audioMeta.available;
  const timing = currentSurahData.timing;

  container.innerHTML = arabic.ayahs.map((ayah, i)=>{
    const trText = translation && translation.ayahs[i] ? translation.ayahs[i].text : '';
    const tafText = tafsir && tafsir.ayahs[i] ? tafsir.ayahs[i].text : '';
    const ayahText = currentMushafStyle === 'quran-tajweed' ? tajweedToHtml(ayah.text) : ayah.text;

    let playBtn = '';
    if(mode === 'audio' && audioMode === 'ayah'){
      if(audioOk && timing && timing[ayah.numberInSurah]){
        const seg = timing[ayah.numberInSurah];
        playBtn = `<button class="play-btn" onclick="playAyahTimed('${currentSurahData.audioMeta.url}', ${seg.start}, ${seg.end}, this, ${ayah.numberInSurah})" title="${t.quran_play}"><i class="fa-solid fa-play"></i></button>`;
      } else {
        playBtn = `<button class="play-btn" disabled style="opacity:.35;cursor:not-allowed;" title="${t.audio_no_ayah_timing}"><i class="fa-solid fa-play"></i></button>`;
      }
    }

    const tafsirBlock = mode === 'tafsir'
      ? `<div class="ayah-translation" style="margin-top:10px;"><strong>${t.quran_tafsir_label}:</strong><br>${tafText || '—'}</div>`
      : '';

    return `
    <div class="ayah-card reveal-scale in" data-ayah="${ayah.numberInSurah}">
      <div class="ayah-top">
        <span class="ayah-num"><span>${ayah.numberInSurah}</span></span>
        ${playBtn}
      </div>
      <p class="ayah-arabic">${ayahText}</p>
      ${translation ? `<p class="ayah-translation"><strong>${t.quran_translation_label}:</strong> ${trText}</p>` : ''}
      ${tafsirBlock}
    </div>`;
  }).join('');
}

/* ---------- Tajweed parser ----------
   The "quran-tajweed" edition returns text containing segments like:
   [h:9421[ٱ]   -> rule code "h", numeric id, marked text "ٱ"
   Segments can be nested. We iteratively unwrap the innermost
   bracket groups and wrap them in <span class="tw-XXXX"> with a
   class derived from the rule code, mapped to a tajweed category. */
const TAJWEED_CODE_MAP = {
  h: 'ham_wasl',      // hamzat al-wasl / silent
  s: 'ham_wasl',      // silent letters
  l: 'ham_wasl',      // lam shamsiyyah (silent)
  n: 'ghunnah',       // ghunnah / noon & meem mushaddad
  g: 'ghunnah',
  q: 'qalqalah',      // qalqalah letters
  m: 'madd_normal',   // madd (generic)
  d: 'idgham',        // idgham
  i: 'ikhfa',         // ikhfa / iqlab
  k: 'ikhfa',
  t: 'qalqalah'
};

function tajweedToHtml(text){
  if(!text || text.indexOf('[') === -1) return text;
  let out = text;
  let safety = 0;
  // Repeatedly resolve the innermost [code:id[content]] groups
  const re = /\[([a-zA-Z]+):?[^\[\]]*\[([^\[\]]*)\]/;
  while(re.test(out) && safety < 200){
    out = out.replace(re, (m, code, content) => {
      const cls = TAJWEED_CODE_MAP[code.toLowerCase()] || 'other';
      return `<span class="tw-${cls}">${content}</span>`;
    });
    safety++;
  }
  // remove any leftover stray brackets that weren't matched
  out = out.replace(/[\[\]]/g, '');
  return out;
}

/* ---------- Audio ---------- */
let audioPlayer = null;
function playAyah(url, btn){
  if(!url) return;
  if(!audioPlayer){ audioPlayer = new Audio(); }
  sequentialPlaying = false;
  audioPlayer.onerror = null;
  audioPlayer.ontimeupdate = null;
  resetOtherPlayButtons(btn);
  if(audioPlayer.src === url && !audioPlayer.paused){
    audioPlayer.pause();
    if(btn) setPlayIcon(btn, false);
    return;
  }
  audioPlayer.src = url;
  audioPlayer.play();
  if(btn){
    setPlayIcon(btn, true);
    audioPlayer.onended = ()=> setPlayIcon(btn, false);
  }
}

/* ---------- Font size ---------- */
function applyFontScale(){
  document.documentElement.style.setProperty('--quran-font', fontScale);
  localStorage.setItem('elhuda_quran_font', fontScale);
}
function setupFontControls(){
  const dec = document.getElementById('fontDec');
  const inc = document.getElementById('fontInc');
  if(dec) dec.addEventListener('click', ()=>{ fontScale = Math.max(0.7, +(fontScale-0.1).toFixed(2)); applyFontScale(); });
  if(inc) inc.addEventListener('click', ()=>{ fontScale = Math.min(2, +(fontScale+0.1).toFixed(2)); applyFontScale(); });
  applyFontScale();
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', async ()=>{
  const select = document.getElementById('surahSelect');
  if(!select) return;
  await loadSurahList();
  await loadReciterList();
  setupMushafStyle();
  await setupTafsirSource();
  setupAudioMode();
  select.addEventListener('change', ()=> loadSurah(select.value));
  setupFontControls();

  const params = new URLSearchParams(window.location.search);
  const fromUrl = parseInt(params.get('surah'), 10);
  const lastRead = parseInt(localStorage.getItem('quran_last_surah'), 10);
  const startSurah = (fromUrl >= 1 && fromUrl <= 114) ? fromUrl : ((lastRead >= 1 && lastRead <= 114) ? lastRead : 1);
  if(select.value !== String(startSurah)) select.value = String(startSurah);
  loadSurah(startSurah);
});

document.addEventListener('langchange', async ()=>{
  if(!document.getElementById('surahSelect')) return;
  await loadSurahList();
  await loadReciterList();
  if(document.getElementById('tafsirSource')) await loadTafsirList();
  const select = document.getElementById('surahSelect');
  if(currentSurahData) loadSurah(select.value);
});
