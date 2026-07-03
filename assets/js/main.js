/* ==========================================================================
   main.js — Site behaviour
   --------------------------------------------------------------------------
   Each concern lives in its own init* function; all are wired up in init()
   at the bottom. Reads content from data.js.
   ========================================================================== */

/* ---- Services: render pills from data.js + wire the department toggle ---- */
function initServices(){
  const check = '<span class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  const render = (list, el) => {
    if(!el) return;
    el.innerHTML = list.map(s => `<div class="svc">${check}<span>${s}</span></div>`).join('');
  };
  render(PAEDIATRIC_SERVICES, document.getElementById('grid-ped'));
  render(GYNAECOLOGY_SERVICES, document.getElementById('grid-gyn'));

  document.querySelectorAll('.tbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tbtn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.svc-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
    });
  });
}

/* ---- Dark / light theme (persisted in localStorage) ---- */
function initTheme(){
  const root = document.documentElement;
  const btn = document.getElementById('themeBtn');
  const sun  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round"/></svg>';
  const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const apply = (theme) => {
    root.setAttribute('data-theme', theme);
    btn.innerHTML = theme === 'dark' ? sun : moon;
    try { localStorage.setItem('theme', theme); } catch(e){}
  };
  const preferred = () => {
    try { return localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'); }
    catch(e){ return 'light'; }
  };

  apply(preferred());
  btn.addEventListener('click', () => apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
}

/* ---- Mobile slide-in menu ---- */
function initMobileMenu(){
  const menu = document.getElementById('mobileMenu');
  const btn  = document.getElementById('menuBtn');
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* ---- Reveal elements as they scroll into view ---- */
function initReveal(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---- Animated count-up statistics ---- */
function initCounters(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || '';
      let start = null;
      const step = (t) => {
        if(!start) start = t;
        const p = Math.min((t - start) / 1400, 1);
        const val = Math.floor((1 - Math.pow(1 - p, 3)) * end);
        el.textContent = val.toLocaleString() + suffix;
        if(p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(c => io.observe(c));
}

/* ---- Sticky-header polish + back-to-top button ---- */
function initScrollUi(){
  const header = document.getElementById('header');
  const toTop  = document.getElementById('toTop');
  addEventListener('scroll', () => {
    const y = scrollY;
    header.style.boxShadow = y > 10 ? 'none' : '';
    toTop.classList.toggle('show', y > 600);
  });
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Footer year ---- */
function initYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
}

/* ---- Boot ---- */
function init(){
  initServices();
  initTheme();
  initMobileMenu();
  initReveal();
  initCounters();
  initScrollUi();
  initYear();
}

document.addEventListener('DOMContentLoaded', init);
