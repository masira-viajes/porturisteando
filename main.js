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

  // ── Masira Instagram Popup (accessibility improvements) ──
  const igPopup = document.getElementById('masiraPopup');
  if (igPopup) {
    const igClose = document.getElementById('igPopupClose');
    const igCta = document.getElementById('igPopupCta');
    const igCard = igPopup.querySelector('.ig-popup-card');
    const igText = igPopup.querySelector('.ig-popup-text');
    const STORAGE_KEY = 'masiraPopupSeen';

    // ensure popup/card focusable and described
    if (igCard && !igCard.hasAttribute('tabindex')) igCard.setAttribute('tabindex', '-1');
    if (igText && !igText.id) igText.id = 'igPopupDesc';
    if (igText) igPopup.setAttribute('aria-describedby', igText.id);

    // ensure external link rel is safe
    if (igCta && igCta.target === '_blank') {
      const rel = new Set((igCta.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener'); rel.add('noreferrer');
      igCta.setAttribute('rel', Array.from(rel).join(' '));
    }

    let lastFocused = null;

    function setBackgroundInert(inert) {
      document.querySelectorAll('body > *').forEach(el => {
        if (!el.contains(igPopup)) {
          try { el.inert = inert; } catch(e) {}
          el.setAttribute('aria-hidden', inert ? 'true' : 'false');
        }
      });
    }

    function getFocusable(container) {
      return Array.from(container.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'))
        .filter(el => el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }

    const openPopup = () => {
      lastFocused = document.activeElement;
      igPopup.classList.add('open');
      igPopup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setBackgroundInert(true);
      // move focus into the dialog (prefer close button)
      const first = (igClose && !igClose.disabled) ? igClose : igCard;
      (first || igCard).focus();

n    };

    const closePopup = () => {
      igPopup.classList.remove('open');
      igPopup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setBackgroundInert(false);
      try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    };

    // Focus trap: handle Tab navigation inside popup
    function onKeyDown(e) {
      if (!igPopup.classList.contains('open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closePopup(); return; }
      if (e.key === 'Tab') {
        const focusable = getFocusable(igPopup);
        if (focusable.length === 0) { e.preventDefault(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    // always open on every page (no session persistence)
    setTimeout(() => {
      openPopup();
      document.addEventListener('keydown', onKeyDown);
    }, 1000);

    if (igClose) igClose.addEventListener('click', closePopup);
    igPopup.addEventListener('click', (e) => { if (e.target === igPopup) closePopup(); });
    if (igCta) igCta.addEventListener('click', closePopup);
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