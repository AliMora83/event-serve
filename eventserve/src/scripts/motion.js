/* ==========================================================================
   EventServe motion
   No dependencies. Reveal + parallax + count-up share ONE rAF loop and ONE
   observer pattern so nothing fights for the main thread.
   ========================================================================== */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

/* Marks the document so CSS only hides reveal targets when JS is running.
   Without this, a JS failure leaves the page permanently blank.            */
document.documentElement.classList.add('js');

/* -------------------------------------------------------------------------
   1. Scroll reveal
   Fires once, then unobserves. Stagger is set per-element via a CSS var so
   the delay lives in CSS, not in JS timers.
   ------------------------------------------------------------------------- */
function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (prefersReduced.matches) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
  );

  targets.forEach((el) => {
    const step = Number(el.dataset.revealStep || 0);
    if (step) el.style.setProperty('--reveal-delay', `${step * 80}ms`);
    observer.observe(el);
  });
}

/* -------------------------------------------------------------------------
   2. Parallax
   Scroll position is read ONCE per frame and cached. Never read scrollY
   inside the transform write — that forces layout thrash.
   ------------------------------------------------------------------------- */
function initParallax() {
  const layers = Array.from(document.querySelectorAll('.parallax__media'));
  if (!layers.length || prefersReduced.matches) return;

  let ticking = false;
  let viewportH = window.innerHeight;

  function update() {
    ticking = false;
    for (const layer of layers) {
      const band = layer.closest('.parallax');
      const rect = band.getBoundingClientRect();

      // Skip anything off-screen entirely.
      if (rect.bottom < 0 || rect.top > viewportH) continue;

      const speed = Number(band.dataset.parallaxSpeed || 0.25);
      // Progress: -1 (band below viewport) .. 1 (band above viewport)
      const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
      const shift = progress * speed * 100;

      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    viewportH = window.innerHeight;
    onScroll();
  }, { passive: true });

  update();
}

/* -------------------------------------------------------------------------
   3. Stat count-up
   Reuses the reveal observer pattern. Respects the suffix in the markup
   (150+, 70%) rather than hardcoding it.
   ------------------------------------------------------------------------- */
function initCountUp() {
  const stats = document.querySelectorAll('[data-count-to]');
  if (!stats.length) return;

  if (prefersReduced.matches) {
    stats.forEach((el) => {
      el.textContent = el.dataset.countTo + (el.dataset.countSuffix || '');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  function run(el) {
    const target = Number(el.dataset.countTo);
    const suffix = el.dataset.countSuffix || '';
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  stats.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------
   4. Mobile nav
   ------------------------------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });

  // Close on Escape so keyboard users aren't trapped.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  });
}

function boot() {
  initNav();
  initReveal();
  initParallax();
  initCountUp();
}

boot();

/* View Transitions were dropped in Sprint 1 — 15.4KB of client JS for a
   cosmetic cross-page fade on a four-page site. If ClientRouter is ever
   reinstated in BaseLayout, re-add this line so motion re-initialises after
   a DOM swap:
       document.addEventListener('astro:page-load', boot);
*/
