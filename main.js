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