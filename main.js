document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Menu Toggle ──
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── Fade-in Observer ──
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  setTimeout(() => {
    document.querySelectorAll('.hero .fade-in, .subhero .fade-in').forEach(el => el.classList.add('visible'));
  }, 100);

  // ── Category Nav — Gastronomia ──
  if (document.getElementById('tradicional')) {
    const gastroSections = ['tradicional','bacalao','francesinha','mariscos','sardinas','sandwiches','vegetarianos','nata','glutenfree'];
    const gastroBtns = document.querySelectorAll('.cat-nav-btn');
    wireCategoryBtns(gastroSections, gastroBtns);
    initCategoryNav(gastroSections, gastroBtns);
  }

  // ── Category Nav — Experiencias ──
  if (document.getElementById('planazos')) {
    const expSections = ['planazos','bodegas','cervezas','rooftops','marcha','top10','compras'];
    const expBtns = document.querySelectorAll('.cat-nav-btn');
    wireCategoryBtns(expSections, expBtns);
    initCategoryNav(expSections, expBtns);
  }

  // ── Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll('.lightbox-trigger').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

});

// ── Wire tab clicks ──
function wireCategoryBtns(sections, navBtns) {
  const catNav = document.getElementById('catNav');
  if (!catNav) return;
  navBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const el = document.getElementById(sections[i]);
      if (!el) return;
      const navH = document.querySelector('nav').offsetHeight;
      const catH = catNav.offsetHeight;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navH - catH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── Active tab on scroll ──
function initCategoryNav(sections, navBtns) {
  const catNav = document.getElementById('catNav');
  if (!catNav) return;

  function updateActiveTab() {
    const navH = document.querySelector('nav').offsetHeight;
    const catH = catNav.offsetHeight;
    const scrollY = window.pageYOffset + navH + catH + 20;
    let activeIdx = 0;
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) activeIdx = i;
    });
    navBtns.forEach((btn, i) => btn.classList.toggle('active', i === activeIdx));
    const activeBtn = navBtns[activeIdx];
    if (activeBtn) {
      const left = activeBtn.offsetLeft - catNav.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      catNav.scrollTo({ left, behavior: 'smooth' });
    }
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });
  updateActiveTab();
}