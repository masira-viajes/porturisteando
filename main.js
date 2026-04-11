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

  // ── Intersection Observer for Fade-in ──
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // ── Trigger hero fade-ins immediately ──
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-in, .subhero .fade-in').forEach(el => el.classList.add('visible'));
  }, 100);

  // ── Category Nav — Gastronomia ──
  const gastroSections = ['tradicional','bacalao','francesinha','mariscos','sardinas','sandwiches','vegetarianos','nata','glutenfree'];
  const gastroBtns = document.querySelectorAll('.cat-nav-btn');
  if (document.getElementById('tradicional')) {
    initCategoryNav(gastroSections, gastroBtns);
    wireCategoryBtns(gastroSections, gastroBtns);
  }

  // ── Category Nav — Experiencias ──
  const expSections = ['planazos','bodegas','cervezas','rooftops','marcha','gratis','compras'];
  const expBtns = document.querySelectorAll('.cat-nav-btn');
  if (document.getElementById('planazos')) {
    initCategoryNav(expSections, expBtns);
    wireCategoryBtns(expSections, expBtns);
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
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

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

function initCategoryNav(sections, navBtns) {
  const catNav = document.getElementById('catNav');
  if (!catNav) return;

  function updateActiveTab() {
    const navHeight = document.querySelector('nav').offsetHeight;
    const catNavHeight = catNav.offsetHeight;
    const offset = navHeight + catNavHeight + 20;
    const scrollY = window.pageYOffset + offset;

    let activeIdx = 0;
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) activeIdx = i;
    });

    navBtns.forEach((btn, i) => btn.classList.toggle('active', i === activeIdx));

    const activeBtn = navBtns[activeIdx];
    if (activeBtn) {
      const scrollLeft = activeBtn.offsetLeft - catNav.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      catNav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });
  updateActiveTab();
}

  }

  // ── Intersection Observer for Fade-in ──
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // ── Trigger hero fade-ins immediately ──
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-in, .subhero .fade-in').forEach(el => el.classList.add('visible'));
  }, 100);
});

/**
 * Shared logic for sticky category navigation (Gastronomía & Experiencias)
 */
function initCategoryNav(sections, navBtns) {
  const catNav = document.getElementById('catNav');
  if (!catNav) return;

  function updateActiveTab() {
    const navHeight = document.querySelector('nav').offsetHeight;
    const catNavHeight = catNav.offsetHeight;
    const offset = navHeight + catNavHeight + 20;
    const scrollY = window.pageYOffset + offset;

    let activeIdx = 0;
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) activeIdx = i;
    });

    navBtns.forEach((btn, i) => btn.classList.toggle('active', i === activeIdx));

    const activeBtn = navBtns[activeIdx];
    if (activeBtn) {
      const scrollLeft = activeBtn.offsetLeft - catNav.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      catNav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });
  updateActiveTab();
}