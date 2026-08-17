/**
 * effects.js — El Huda Premium 2026
 * Three.js particle canvas + cursor glow + smooth interactions
 */

// ── THREE.JS BACKGROUND ──
(function initBG() {
  const canvas = document.getElementById('bg3d');
  if (!canvas) return;

  function tryInit() {
    if (typeof THREE === 'undefined') { setTimeout(tryInit, 200); return; }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // ── Particles
    const count = window.innerWidth < 700 ? 600 : 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const gold = new THREE.Color('#c9a84c');
    const green = new THREE.Color('#1a6b45');
    const dim = new THREE.Color('#0d1a14');

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const r = Math.random();
      const c = r < 0.15 ? gold : r < 0.35 ? green : dim;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── Mouse parallax
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.3;
      my = (e.clientY / window.innerHeight - 0.5) * 0.3;
    }, { passive: true });

    // ── Animate
    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      frame += 0.003;
      points.rotation.y = frame * 0.04 + mx;
      points.rotation.x = frame * 0.015 - my;
      renderer.render(scene, camera);
    }
    animate();

    // ── Resize
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }, { passive: true });
  }

  tryInit();
})();

// ── CURSOR GLOW (desktop only)
(function initCursor() {
  if (window.innerWidth < 900 || window.matchMedia('(hover:none)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;width:400px;height:400px;border-radius:50%;
    background:radial-gradient(circle, rgba(201,168,76,.06) 0%, transparent 70%);
    pointer-events:none;z-index:0;transform:translate(-50%,-50%);
    transition:left .12s ease,top .12s ease;will-change:left,top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
})();

// ── SMOOTH REVEAL (intersection observer)
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .stagger, .reveal-up, .reveal-scale').forEach(el => {
    if (!el.classList.contains('in')) obs.observe(el);
  });
})();

// ── CARD TILT (subtle, desktop)
(function initTilt() {
  if (window.innerWidth < 900) return;
  document.querySelectorAll('.feature-card, .bento-cell, .card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    }, { passive: true });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ── RIPPLE on buttons
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn, .quick-chip, .feature-card');
  if (!btn) return;
  const r = btn.getBoundingClientRect();
  const rip = document.createElement('span');
  const size = Math.max(r.width, r.height) * 1.5;
  rip.style.cssText = `
    position:absolute;width:${size}px;height:${size}px;border-radius:50%;
    background:rgba(255,255,255,.1);pointer-events:none;
    left:${e.clientX - r.left - size/2}px;
    top:${e.clientY - r.top - size/2}px;
    transform:scale(0);animation:ripple .5s ease-out;
  `;
  if (!document.getElementById('_ripple_css')) {
    const s = document.createElement('style');
    s.id = '_ripple_css';
    s.textContent = '@keyframes ripple{to{transform:scale(1);opacity:0}}';
    document.head.appendChild(s);
  }
  btn.style.position = btn.style.position || 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(rip);
  setTimeout(() => rip.remove(), 550);
});

// ── TOPBAR: subtle solidify effect on scroll (theme-aware, matches the
// original "glass block" look in both Dark and Light instead of a
// hardcoded dark-only color).
(() => {
  const tb = document.getElementById('topbar');
  if (!tb) return;
  const onScroll = () => tb.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
