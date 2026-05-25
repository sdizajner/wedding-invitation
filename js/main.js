/* ============================================================
   Branka & Branko — Wedding Invitation v2
   main.js
   ============================================================ */

(() => {
  'use strict';

  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
  if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. CINEMATIC PRELOADER ---------- */
  function runCinematicPreloader() {
    console.log('[Preloader] runCinematicPreloader called - hasGSAP:', hasGSAP, 'hasScrollTrigger:', hasScrollTrigger);
    const preloader = document.getElementById('cinematicPreloader');
    console.log('[Preloader] preloader element:', preloader ? 'found' : 'NOT FOUND');
    if (!preloader) return Promise.resolve();

    // Session storage key
const sessionKey = 'wedding_preloader_shown';

// Samo za testiranje — forsira prikaz preloadera svaki put.
// Kada završiš testiranje, obriši ovu liniju.
sessionStorage.removeItem(sessionKey);

const isPreloaderShown = sessionStorage.getItem(sessionKey);

// If preloader was already shown this session, skip animation
    if (isPreloaderShown && isPreloaderShown === 'true') {
      if (!prefersReducedMotion && hasGSAP) {
        // Very quick 300ms fade-out for repeat visits
        return new Promise((resolve) => {
          gsap.timeline({
            onComplete: () => {
              preloader.classList.add('is-hidden');
              preloader.style.display = 'none';
              document.body.style.overflow = '';
              resolve();
            },
          })
          .to('#cinematicPreloader', {
            opacity: 0, duration: 0.3, ease: 'power2.in',
          });
        });
      } else {
        preloader.classList.add('is-hidden');
        preloader.style.display = 'none';
        document.body.style.overflow = '';
        return Promise.resolve();
      }
    }

    // Mark preloader as shown
    sessionStorage.setItem(sessionKey, 'true');

    // Disable scroll during preloader
    document.body.style.overflow = 'hidden';

    // Fallback: auto-hide after 5 seconds max
    const fallbackTimer = setTimeout(() => {
      hidePreloader();
    }, 5000);

    function hidePreloader() {
      clearTimeout(fallbackTimer);
      preloader.classList.add('is-hidden');
      preloader.style.display = 'none';
      document.body.style.overflow = '';
    }

    // If reduced motion, skip animation
    if (prefersReducedMotion) {
      console.log('[Preloader] Skipping animation due to prefers-reduced-motion');
      hidePreloader();
      return Promise.resolve();
    }

    // If GSAP not available, skip animation
    if (!hasGSAP) {
      console.log('[Preloader] Skipping animation - GSAP not available');
      hidePreloader();
      return Promise.resolve();
    }

    console.log('[Preloader] Starting GSAP animation timeline');
    
    // Get all elements we need to animate
const lines = document.querySelectorAll('.cinematic-preloader__line');
const names = document.querySelectorAll('.cinematic-preloader__name');
const subtitle = document.querySelector('.cinematic-preloader__subtitle');
const bg = document.querySelector('.cinematic-preloader__bg');
const glow = document.querySelector('.cinematic-preloader__glow');
const content = document.querySelector('.cinematic-preloader__content');
const preloaderEl = document.getElementById('cinematicPreloader');

console.log('[Preloader] Elements found - lines:', lines.length, 'names:', names.length);    
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          hidePreloader();
          resolve();
        },
      });

      // Timeline sequence
      tl
        // 0. Start: all elements at 0 opacity
.set([
  lines,
  names,
  subtitle,
], { opacity: 0 }, 0)

        // 1. Background fades in (0.4s)
        .fromTo(bg,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.inOut' },
          0
        )

        // 2. Glow effect fades in (0.6s)
        .fromTo(glow,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          0.2
        )

        // 3. Top decorative line appears (0.5s)
        .fromTo(lines[0],
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out' },
          0.5
        )

        // 5. Ampersand fades in (0.5s)

        // 6. Names appear with subtle y movement (0.7s each)
.fromTo(names,
  { opacity: 0, y: 18, filter: 'blur(8px)' },
  {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
  },
  0.75
)
        // 7. Subtitle fades in (0.5s)
.fromTo(subtitle,
  { opacity: 0, y: 10 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
  1.35
)
        // 8. Bottom decorative line appears (0.5s)
.fromTo(lines[1],
  { opacity: 0, scaleX: 0 },
  { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out' },
  1.15
)
        // 9. Hold at peak for 0.8s

.to({}, { duration: 1.6 }, 2.0)
        // 10. Content fades out + slight upward move (0.6s)
        .to(content,
          { opacity: 0, y: -24, duration: 0.6, ease: 'power2.inOut' },
          2.85
        )

        // 11. Glow dissipates (0.5s)
        .to(glow,
          { opacity: 0, duration: 0.5, ease: 'power2.in' },
          2.85
        )

        // 12. Entire preloader slides up and fades (0.7s)
        .to(preloaderEl,
          { opacity: 0, yPercent: -40, duration: 0.7, ease: 'expo.inOut' },
          3.0
        );
    });
  }

  /* ---------- 2. HEADER ---------- */
  function initHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 3. MOBILE MENU ---------- */
  function initMobileMenu() {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    const close = () => {
      btn.classList.remove('is-open');
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    const open = () => {
      btn.classList.add('is-open');
      menu.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    btn.addEventListener('click', () => {
      if (menu.classList.contains('is-open')) close(); else open();
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
    });
  }

  /* ---------- 4. HERO ---------- */
  function initHero() {
    if (!hasGSAP || prefersReducedMotion) return;

    gsap.set('.hero__page-num', { opacity: 0, y: 12 });
    gsap.set('.hero__word', { opacity: 0, y: 80, clipPath: 'inset(0 0 100% 0)' });
    gsap.set('.hero__amp', { opacity: 0, scale: 0.85, rotate: -4 });
    gsap.set('.hero__caption', { opacity: 0, y: 16 });
    gsap.set('.hero__media-frame img', { scale: 1.18, opacity: 0 });
    gsap.set('.hero__media-caption', { opacity: 0, y: 16 });
    gsap.set('.hero__date-card', { opacity: 0, x: 40, y: 20 });
    gsap.set('.hero__deco', { opacity: 0, scale: 0.7, rotation: -20 });
    gsap.set('.hero__vertical-text', { opacity: 0, x: 20 });
    gsap.set('.hero__lede', { opacity: 0, y: 24 });
    gsap.set('.hero__meta-item', { opacity: 0, y: 20 });
    gsap.set('.hero__actions', { opacity: 0, y: 20 });
    gsap.set('.hero__scroll', { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.2 },
      delay: 0.1,
    });

    tl.to('.hero__page-num', { opacity: 1, y: 0, duration: 0.9 })
      .to('.hero__word', {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
        duration: 1.5, ease: 'expo.out', stagger: 0.22,
      }, '-=0.5')
      .to('.hero__amp', {
        opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.3)',
      }, '-=1.3')
      .to('.hero__media-frame img', {
        scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out',
      }, '-=1.6')
      .to('.hero__media-caption', { opacity: 1, y: 0, duration: 0.8 }, '-=1.0')
      .to('.hero__deco', { opacity: 0.5, scale: 1, rotation: 0, duration: 1.2 }, '-=1.2')
      .to('.hero__vertical-text', { opacity: 1, x: 0, duration: 0.8 }, '-=0.9')
      .to('.hero__caption', { opacity: 1, y: 0, duration: 0.8 }, '-=0.9')
      .to('.hero__date-card', { opacity: 1, x: 0, y: 0, duration: 1.1, ease: 'expo.out' }, '-=0.8')
      .to('.hero__lede', { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
      .to('.hero__meta-item', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, '-=0.6')
      .to('.hero__actions', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.hero__scroll', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
  }

  /* ---------- 5. REVEAL ---------- */
  function initReveal() {
    if (!hasScrollTrigger || prefersReducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach(el => el.style.opacity = '1');
      return;
    }
    const els = document.querySelectorAll('[data-reveal]:not(.hero [data-reveal])');
    els.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
  }

  /* ---------- 6. SECTION HEADS ---------- */
  function initSectionHeads() {
    if (!hasScrollTrigger || prefersReducedMotion) return;
    document.querySelectorAll('.section-head').forEach((head) => {
      const top = head.querySelector('.section-head__top');
      const title = head.querySelector('.section-head__title');
      const lede = head.querySelector('.section-head__lede');
      const items = [top, title, lede].filter(Boolean);

      gsap.fromTo(items,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          duration: 1.3, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: head, start: 'top 85%' },
        }
      );

      // Title clip reveal
      if (title) {
        gsap.fromTo(title,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.6, ease: 'expo.out',
            scrollTrigger: { trigger: head, start: 'top 85%' },
          }
        );
      }
    });
  }

  /* ---------- 7. PARALLAX ---------- */
  function initParallax() {
    if (!hasScrollTrigger || prefersReducedMotion) return;
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const img = el.querySelector('img');
      if (!img) return;
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0.15;
      gsap.fromTo(img,
        { yPercent: -speed * 30 },
        {
          yPercent: speed * 30,
          ease: 'none',
          scrollTrigger: {
            trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1,
          },
        }
      );
    });
  }

  /* ---------- 8. TIMELINE  (huge years scrub-in) ---------- */
  function initTimeline() {
    if (!hasScrollTrigger || prefersReducedMotion) return;

    document.querySelectorAll('.timeline__item').forEach((item) => {
      const year = item.querySelector('.timeline__year span');
      const content = item.querySelector('.timeline__content');

      if (year) {
        // Slide year horizontally and fade in
        const isB = item.classList.contains('timeline__item--b');
        gsap.fromTo(year,
          { opacity: 0, x: isB ? -120 : 120, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 1.6, ease: 'expo.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        );

        // Subtle parallax while in view
        gsap.fromTo(year,
          { xPercent: isB ? -3 : 3 },
          {
            xPercent: isB ? 3 : -3, ease: 'none',
            scrollTrigger: {
              trigger: item, start: 'top bottom', end: 'bottom top', scrub: 1.2,
            },
          }
        );
      }

      if (content) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 78%' },
        });
        const roman = content.querySelector('.timeline__roman');
        const title = content.querySelector('.timeline__title');
        const meta = content.querySelector('.timeline__meta');
        const body = content.querySelector('.timeline__body');
        const items = [roman, title, meta, body].filter(Boolean);
        tl.fromTo(items,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.1 }
        );
      }
    });
  }

  /* ---------- 9. CARDS ---------- */
  function initCards() {
    if (!hasScrollTrigger || prefersReducedMotion) return;
    const cards = document.querySelectorAll('.cards .card');
    if (!cards.length) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1.3, ease: 'expo.out', stagger: 0.16,
        scrollTrigger: { trigger: '.cards', start: 'top 82%' },
      }
    );
  }

  /* ---------- 10. COUNTDOWN ---------- */
  function initCountdown() {
    const grid = document.getElementById('countdownGrid');
    if (!grid) return;

    const target = new Date(2026, 8, 14, 16, 30, 0).getTime();
    const days  = grid.querySelector('[data-cd="days"]');
    const hours = grid.querySelector('[data-cd="hours"]');
    const mins  = grid.querySelector('[data-cd="minutes"]');
    const secs  = grid.querySelector('[data-cd="seconds"]');

    const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, '0');
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      days.textContent  = pad(d);
      hours.textContent = pad(h);
      mins.textContent  = pad(m);
      secs.textContent  = pad(s);
    };
    tick(); setInterval(tick, 1000);

    if (hasScrollTrigger && !prefersReducedMotion) {
      gsap.fromTo('.countdown__head > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.countdown', start: 'top 80%' },
        }
      );
      gsap.fromTo('.countdown__cell',
        { opacity: 0, y: 80, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1.4, ease: 'expo.out', stagger: 0.14,
          scrollTrigger: { trigger: '.countdown__grid', start: 'top 85%' },
        }
      );
    }
  }

  /* ---------- 11. GALLERY (clip reveal) ---------- */
  function initGallery() {
    if (!hasScrollTrigger || prefersReducedMotion) return;
    document.querySelectorAll('.gallery__item').forEach((item, i) => {
      const frame = item.querySelector('.gallery__frame');
      const cap = item.querySelector('figcaption');

      gsap.fromTo(frame,
        { clipPath: 'inset(20% 20% 20% 20%)', scale: 1.04 },
        {
          clipPath: 'inset(0% 0% 0% 0%)', scale: 1,
          duration: 1.6, ease: 'expo.out',
          delay: (i % 2) * 0.08,
          scrollTrigger: { trigger: item, start: 'top 88%' },
        }
      );
      if (cap) {
        gsap.fromTo(cap,
          { opacity: 0, y: 14 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        );
      }
    });
  }

  /* ---------- 12. LOCATION ---------- */
  function initLocation() {
    if (!hasScrollTrigger || prefersReducedMotion) return;
    const map = document.querySelector('.location__map');
    const card = document.querySelector('.location__card');
    if (map) {
      gsap.fromTo(map,
        { opacity: 0, x: -30, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)',
          duration: 1.6, ease: 'expo.out',
          scrollTrigger: { trigger: '.location__grid', start: 'top 75%' },
        }
      );
    }
    if (card) {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.location__grid', start: 'top 70%' },
        }
      );
      gsap.fromTo(card.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.location__grid', start: 'top 70%' },
        }
      );
    }
  }

  /* ---------- 13. MANIFESTO ---------- */
  function initManifesto() {
    if (!hasScrollTrigger || prefersReducedMotion) return;
    const quote = document.querySelector('.manifesto__quote');
    const text = document.querySelector('.manifesto__text p');
    const sign = document.querySelector('.manifesto__sign');
    if (quote) {
      gsap.fromTo(quote,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 0.22, y: 0, scale: 1, duration: 1.6, ease: 'expo.out',
          scrollTrigger: { trigger: '.manifesto', start: 'top 80%' },
        }
      );
    }
    if (text) {
      gsap.fromTo(text,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: '.manifesto', start: 'top 78%' },
        }
      );
    }
    if (sign) {
      gsap.fromTo(sign,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: '.manifesto', start: 'top 78%' },
        }
      );
    }
  }

  /* ---------- 14. RSVP ---------- */
  function initRSVP() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;
    const success = document.getElementById('rsvpSuccess');
    const nameInput = form.querySelector('#name');
    const nameError = form.querySelector('#nameError');

    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length > 0) {
        nameError.textContent = '';
        nameInput.closest('.field').classList.remove('field--error');
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (nameInput.value.trim().length < 2) {
        nameError.textContent = nameInput.dataset.errorRequired || 'Molimo unesite Vaše ime i prezime.';
        nameInput.closest('.field').classList.add('field--error');
        nameInput.focus();
        return;
      }

      const formItems = form.querySelectorAll('.field, .field-row, button.btn');

      if (hasGSAP && !prefersReducedMotion) {
        gsap.to(formItems, {
          opacity: 0, y: -10, duration: 0.5, ease: 'power2.in', stagger: 0.04,
          onComplete: () => {
            formItems.forEach(el => el.style.display = 'none');
            success.hidden = false;
            gsap.fromTo(success, { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
          },
        });
      } else {
        formItems.forEach(el => el.style.display = 'none');
        success.hidden = false;
      }
      form.reset();

      setTimeout(() => {
        if (!success.hidden) {
          if (hasGSAP && !prefersReducedMotion) {
            gsap.to(success, {
              opacity: 0, y: -10, duration: 0.5, ease: 'power2.in',
              onComplete: () => {
                success.hidden = true;
                success.style.opacity = '';
                success.style.transform = '';
                formItems.forEach(el => { el.style.display = ''; });
                gsap.fromTo(formItems, { opacity: 0, y: 10 },
                  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05 });
              },
            });
          } else {
            success.hidden = true;
            formItems.forEach(el => el.style.display = '');
          }
        }
      }, 9000);
    });

    // RSVP head reveal
    if (hasScrollTrigger && !prefersReducedMotion) {
      gsap.fromTo('.rsvp__head > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.rsvp', start: 'top 80%' },
        }
      );
      gsap.fromTo('.rsvp-form',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: '.rsvp', start: 'top 78%' },
        }
      );
    }
  }

  /* ---------- 15. FOOTER ---------- */
  function initFooter() {
    if (!hasScrollTrigger || prefersReducedMotion) return;
    const items = document.querySelectorAll('.site-footer__edition, .site-footer__names, .site-footer__date, .site-footer__line, .site-footer__index li');
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: '.site-footer', start: 'top 85%' },
      }
    );
    gsap.fromTo('.site-footer__giant',
      { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
      {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
        duration: 1.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.site-footer__giant', start: 'top 90%' },
      }
    );
  }

  /* ---------- 16. SMOOTH SCROLL ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const headerH = document.getElementById('siteHeader')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ---------- 17. SCROLL SPY — active nav link ---------- */
  function initScrollSpy() {
    const links = document.querySelectorAll('[data-section]');
    if (!links.length) return;

    // Build map: section id -> array of link elements pointing to it
    const linkBySection = {};
    links.forEach((a) => {
      const id = a.dataset.section;
      if (!linkBySection[id]) linkBySection[id] = [];
      linkBySection[id].push(a);
    });

    const sectionIds = Object.keys(linkBySection);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach((a) => a.classList.remove('is-active'));
      if (!id) return;
      (linkBySection[id] || []).forEach((a) => a.classList.add('is-active'));
    };

    // IntersectionObserver tracks which section's top crosses the header line
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      // Pick the topmost visible section in document order
      const active = sections.find((s) => visible.has(s.id));
      setActive(active ? active.id : null);
    }, {
      rootMargin: '-32% 0px -55% 0px',
      threshold: 0,
    });
    sections.forEach((s) => io.observe(s));
  }


  document.addEventListener('DOMContentLoaded', async () => {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initRSVP();
    initCountdown();

    await runCinematicPreloader();

    initHero();
    initReveal();
    initSectionHeads();
    initParallax();
    initTimeline();
    initCards();
    initGallery();
    initLocation();
    initManifesto();
    initFooter();

    if (hasScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  window.addEventListener('load', () => {
    if (hasScrollTrigger) ScrollTrigger.refresh();
  });
})();
