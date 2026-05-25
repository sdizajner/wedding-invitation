# CINEMATIC PRELOADER — Detaljni Teknički Referentni Priručnik

## 📁 Struktura Implementacije

---

## 1️⃣ HTML STRUKTURA

### Lokacija
- **Srpska verzija**: [index.html](index.html#L30-L48)
- **Engleska verzija**: [en/index.html](en/index.html#L30-L48)

### Kompletna HTML Struktura

```html
<!-- ============================================================
     1) PREMIUM CINEMATIC PRELOADER
     ============================================================ -->
<div class="cinematic-preloader" id="cinematicPreloader" aria-hidden="true">
  <!--Background layer -->
  <div class="cinematic-preloader__bg" aria-hidden="true"></div>
  
  <!-- Glow effect layer -->
  <div class="cinematic-preloader__glow" aria-hidden="true"></div>
  
  <!-- Main content -->
  <div class="cinematic-preloader__content">
    <!-- Decorative line top -->
    <div class="cinematic-preloader__line" aria-hidden="true"></div>
    
    <!-- Monogram: B & B -->
    <div class="cinematic-preloader__monogram">
      <span class="cinematic-preloader__letter" data-letter="B">B</span>
      <span class="cinematic-preloader__amp">&</span>
      <span class="cinematic-preloader__letter" data-letter="B">B</span>
    </div>
    
    <!-- Names: Branka & Branko -->
    <h1 class="cinematic-preloader__title">
      <span class="cinematic-preloader__name" data-name="branka">Branka</span>
      <span class="cinematic-preloader__name" data-name="and">&amp;</span>
      <span class="cinematic-preloader__name" data-name="branko">Branko</span>
    </h1>
    
    <!-- Subtitle -->
    <p class="cinematic-preloader__subtitle">Wedding Invitation</p>
    
    <!-- Decorative line bottom -->
    <div class="cinematic-preloader__line" aria-hidden="true"></div>
  </div>
</div>
```

### HTML Napomene

- **ID**: `cinematicPreloader` — koristi se u JS za pronalaženje elementa
- **aria-hidden="true"** — preloader se ne čita od screen readera
- **data-attributes** — koriste se za identifikovanje elemenata tokom animacije
- **Semantička hijerarhija**: `h1` za imena (SEO), `p` za subtitle

---

## 2️⃣ CSS STRUKTURA

### Lokacija
- **Fajl**: [css/style.css](css/style.css#L195-L360)

### Kompletne CSS Klase

```css
/* ============================================================
   CINEMATIC PRELOADER — Premium Wedding Intro
   ============================================================ */

/* Main container */
.cinematic-preloader {
  position: fixed;
  inset: 0;                    /* Pokriva ceo viewport */
  z-index: 9999;               /* Iznad svega */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: var(--ink);
}

/* Skriva interakciju nakon završetka */
.cinematic-preloader.is-hidden {
  pointer-events: none;
}

/* ===== BACKGROUND ===== */
.cinematic-preloader__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--paper) 0%,           /* Ivory */
    var(--paper-cream) 50%,    /* Soft cream */
    var(--paper) 100%          /* Back to ivory */
  );
  background-attachment: fixed;  /* Fixed za parallax effect */
  z-index: 1;
}

/* ===== GLOW EFFECT ===== */
.cinematic-preloader__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 800px 600px at center,
    rgba(200, 168, 106, 0.08) 0%,     /* Soft gold center */
    rgba(160, 122, 58, 0.04) 35%,     /* Fade midpoint */
    transparent 80%                     /* Fade edges */
  );
  z-index: 2;
  pointer-events: none;
}

/* ===== CONTENT ===== */
.cinematic-preloader__content {
  position: relative;
  z-index: 3;                  /* Iznad background i glow */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 6vw, 48px); /* Responsive spacing */
  max-width: 100%;
  padding: clamp(24px, 5vw, 60px);
}

/* ===== DECORATIVE LINES ===== */
.cinematic-preloader__line {
  width: clamp(60px, 15vw, 180px);      /* Responsive width */
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--brass-light),    /* Gold accent */
    transparent
  );
  opacity: 0;              /* Inicijalno nevidljiva */
}

/* ===== MONOGRAM (B & B) ===== */
.cinematic-preloader__monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 4vw, 32px);
  font-family: var(--font-serif);    /* Cormorant Garamond */
  font-weight: 300;
  font-size: clamp(72px, 16vw, 180px);
  letter-spacing: 0.08em;
  line-height: 1;
  color: var(--ink);
  opacity: 0;
}

/* Individual letters u monogram-u */
.cinematic-preloader__letter {
  display: inline-block;
  opacity: 0;
  filter: blur(12px);    /* Inicijalno blured */
}

/* Kada je animacija završena */
.cinematic-preloader__letter.is-loaded {
  filter: blur(0);       /* Oštro vidljivo */
}

/* Ampersand u monogram-u */
.cinematic-preloader__amp {
  display: inline-block;
  font-size: 0.6em;      /* Manji od B */
  opacity: 0;
  color: var(--brass-light);
}

/* ===== TITLE (IMENA) ===== */
.cinematic-preloader__title {
  margin: 0;
  padding: 0;
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(32px, 6vw, 84px);
  letter-spacing: 0.015em;
  line-height: 1.15;
  color: var(--ink);
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 1vw, 12px);
  align-items: center;
}

/* Svaki span sa imenom */
.cinematic-preloader__name {
  display: inline-block;
  opacity: 0;
}

/* ===== SUBTITLE ===== */
.cinematic-preloader__subtitle {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);     /* Inter */
  font-size: clamp(11px, 1.2vw, 14px);
  font-weight: 400;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0;
}

/* ===== NO ANIMATION FALLBACK ===== */
html.no-anim .cinematic-preloader__line,
html.no-anim .cinematic-preloader__monogram,
html.no-anim .cinematic-preloader__letter,
html.no-anim .cinematic-preloader__amp,
html.no-anim .cinematic-preloader__name,
html.no-anim .cinematic-preloader__subtitle {
  opacity: 1;
}

html.no-anim .cinematic-preloader__letter {
  filter: blur(0);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .cinematic-preloader {
    padding: clamp(20px, 4vw, 40px);
  }
  .cinematic-preloader__content {
    gap: clamp(16px, 5vw, 32px);
  }
}

@media (max-width: 480px) {
  .cinematic-preloader__monogram {
    gap: clamp(12px, 3vw, 20px);
  }
  .cinematic-preloader__title {
    gap: clamp(4px, 0.8vw, 8px);
  }
}
```

### CSS Napomene

- **Position: fixed** — preloader pokriva ceo viewport
- **Z-index: 9999** — iznad svih elemenata na stranici
- **clamp()** — fluid responsive sizing bez media queries
- **CSS variables** — boje iz postojeće palete (`--paper`, `--brass-light`, itd.)
- **Opacity: 0** — inicijalno skriveno, pokazuje se kroz JS animaciju

---

## 3️⃣ JAVASCRIPT STRUKTURA

### Lokacija
- **Fajl**: [js/main.js](js/main.js#L10-L130)
- **Inicijalizacija**: [js/main.js](js/main.js#L720-L730)

### Kompletna JavaScript Funkcija

```javascript
/* ---------- 1. CINEMATIC PRELOADER ---------- */
function runCinematicPreloader() {
  const preloader = document.getElementById('cinematicPreloader');
  if (!preloader) return Promise.resolve();

  // ===== SESSION STORAGE LOGIKA =====
  const sessionKey = 'wedding_preloader_shown';
  const isPreloaderShown = sessionStorage.getItem(sessionKey);

  // Ako je preloader već prikazan u ovoj sesiji
  if (isPreloaderShown && isPreloaderShown === 'true') {
    if (!prefersReducedMotion && hasGSAP) {
      // Brz 300ms fade-out za repeat visits
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

  // ===== PRVI PUT =====
  // Označi da je preloader prikazan
  sessionStorage.setItem(sessionKey, 'true');

  // ===== SCROLL PREVENTION =====
  document.body.style.overflow = 'hidden';

  // ===== FALLBACK TIMER =====
  // Ako GSAP animacija ne završi, ukloni preloader nakon 5s
  const fallbackTimer = setTimeout(() => {
    hidePreloader();
  }, 5000);

  function hidePreloader() {
    clearTimeout(fallbackTimer);
    preloader.classList.add('is-hidden');
    preloader.style.display = 'none';
    document.body.style.overflow = '';  // Omogući scroll
  }

  // ===== REDUCED MOTION CHECK =====
  if (prefersReducedMotion) {
    hidePreloader();
    return Promise.resolve();
  }

  // ===== GSAP AVAILABILITY CHECK =====
  if (!hasGSAP) {
    hidePreloader();
    return Promise.resolve();
  }

  // ===== GSAP ANIMATION TIMELINE =====
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        hidePreloader();
        resolve();
      },
    });

    tl
      // 0. Inicijalne vrednosti (sve na 0 opacity)
      .set([
        '.cinematic-preloader__line',
        '.cinematic-preloader__monogram',
        '.cinematic-preloader__letter',
        '.cinematic-preloader__amp',
        '.cinematic-preloader__name',
        '.cinematic-preloader__subtitle',
      ], { opacity: 0 }, 0)

      // 1. Background fades in (0-0.4s)
      .fromTo('.cinematic-preloader__bg',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.inOut' },
        0
      )

      // 2. Glow effect fades in (0.2-0.8s)
      .fromTo('.cinematic-preloader__glow',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.2
      )

      // 3. Top decorative line (0.5-1.0s)
      .fromTo('.cinematic-preloader__line:first-of-type',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out' },
        0.5
      )

      // 4. Monogram letters — blur to sharp (0.7-2.3s)
      .fromTo('.cinematic-preloader__letter',
        { opacity: 0, scale: 0.85, filter: 'blur(12px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,  // 0.12s između svakog elementa
        },
        0.7
      )

      // 5. Ampersand (0.9-1.4s)
      .fromTo('.cinematic-preloader__amp',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' },
        0.9
      )

      // 6. Names appear (1.4-2.1s)
      .fromTo('.cinematic-preloader__name',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        1.4
      )

      // 7. Subtitle (1.95-2.45s)
      .fromTo('.cinematic-preloader__subtitle',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        1.95
      )

      // 8. Bottom decorative line (1.7-2.2s)
      .fromTo('.cinematic-preloader__line:last-of-type',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out' },
        1.7
      )

      // 9. Hold at peak (2.3-3.1s)
      .to({}, { duration: 0.8 }, 2.3)

      // 10. Content fades out + goes up (2.85-3.45s)
      .to('.cinematic-preloader__content',
        { opacity: 0, y: -24, duration: 0.6, ease: 'power2.inOut' },
        2.85
      )

      // 11. Glow dissipates (2.85-3.35s)
      .to('.cinematic-preloader__glow',
        { opacity: 0, duration: 0.5, ease: 'power2.in' },
        2.85
      )

      // 12. Entire preloader slides up (3.0-3.7s)
      .to('#cinematicPreloader',
        { opacity: 0, yPercent: -40, duration: 0.7, ease: 'expo.inOut' },
        3.0
      );
  });
}
```

### Inicijalizacija u DOMContentLoaded

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initScrollSpy();
  initRSVP();
  initCountdown();

  await runCinematicPreloader();  // ← Preloader se izvršava PRE ostalih animacija

  initHero();
  initReveal();
  initSectionHeads();
  // ... ostale inicijalizacije
});
```

### JavaScript Napomene

- **SessionStorage**: Sprečava ponavljanje animacije u istoj sesiji
- **Promise**: Čeka da se preloader završi pre nego što se pokrenu ostale animacije
- **Fallback Timer**: Osigurava da se stranica prikazuje čak i ako nešto pođe po zlu
- **Scroll Prevention**: `document.body.style.overflow = 'hidden'` sprečava scrollanje
- **Easing**: `power3.out` za smooth, luxury osećaj
- **GSAP Timeline**: Preciznija kontrola vremenske sekvence od CSS animacija

---

## 4️⃣ GLOBALNE VARIJABLE

### Korišćene iz CSS

```css
--paper: #f4ede1;          /* Warm ivory — background */
--paper-cream: #ece1cc;    /* Softer cream — gradient */
--ink: #1d1814;            /* Near-black warm — text */
--brass-light: #c8a86a;    /* Soft gold — decorative */
--muted: #7a6d5c;          /* Gray — subtitle */
--font-serif: 'Cormorant Garamond', serif;
--font-sans: 'Inter', system-ui, sans-serif;
```

### Globalne JavaScript Varijable

```javascript
const hasGSAP = typeof window.gsap !== 'undefined';
const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

---

## 5️⃣ EASING FUNKCIJE

Korišćene GSAP easing funkcije:

```javascript
ease: 'power3.out'         // Smooth decelerate — glavna easing funkcija
ease: 'power2.inOut'       // Balanced — background i glow
ease: 'expo.out'           // Fast start, smooth end
ease: 'back.out(1.2)'      // Elastic bounce — ampersand
ease: 'power2.in'          // Accelerate — fade out
ease: 'expo.inOut'         // Fast in and out — final slide up
```

---

## 6️⃣ RESPONSIVE BREAKPOINTS

```css
/* Desktop (default) */
/* Svi elementi su na maksimalnoj veličini */

/* Tablet (max-width: 768px) */
.cinematic-preloader__content {
  gap: clamp(16px, 5vw, 32px);  /* Manji gap */
}

/* Mobile (max-width: 480px) */
.cinematic-preloader__monogram {
  gap: clamp(12px, 3vw, 20px);  /* Još manji gap */
}
```

---

## 7️⃣ FALLBACK I ACCESSIBILITY

### Fallback za Bez GSAP-a

```javascript
if (!hasGSAP) {
  hidePreloader();  // Odmah se uklanja bez animacije
  return Promise.resolve();
}
```

### Fallback za Reduced Motion

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  hidePreloader();  // Bez animacije
}
```

### Fallback zaTimeout

```javascript
const fallbackTimer = setTimeout(() => {
  hidePreloader();
}, 5000);  // Max 5 sekundi, nakon toga preloader se uklanja
```

---

## 🔄 KAKO RESETOVATI ZA TESTIRANJE

### Terminal/Console

```javascript
// U browser Developer Tools (F12) Console:
sessionStorage.removeItem('wedding_preloader_shown');
location.reload();
```

### Alternativa — Private/Incognito Mode

Otvori stranicu u privatnom/incognito modu da se resetuje sessionStorage.

---

## 📊 TIMELINE REFERENCE

```
Vreme  | Akcija
-------|-------
0.0s   | Početak
0.0s   | bg fade-in počinje
0.2s   | glow fade-in počinje
0.4s   | bg fade-in završen
0.5s   | line:first-of-type počinje
0.6s   | glow fade-in završen
0.7s   | letters blur-to-sharp počinje
0.8s   | line:first-of-type završen
0.9s   | amp fade-in počinje
1.0s   | letters blur-to-sharp završen
1.4s   | names fade-in počinje
1.4s   | amp fade-in završen
1.7s   | line:last-of-type počinje
1.95s  | subtitle fade-in počinje
2.1s   | names fade-in završen
2.2s   | line:last-of-type završen
2.3s   | Hold počinje (pauza od 0.8s)
2.45s  | subtitle fade-in završen
2.85s  | content fade-out + move up počinje
2.85s  | glow fade-out počinje
3.0s   | preloader slide-up počinje
3.1s   | Hold završen
3.35s  | glow fade-out završen
3.45s  | content fade-out završen
3.7s   | preloader slide-up završen → GOTOVO
```

---

## ✅ IMPLEMENTACIJSKI CHECKLIST

- ✅ HTML: Novi preloader markup
- ✅ CSS: Svi stilovi za animaciju
- ✅ JS: runCinematicPreloader() funkcija
- ✅ JS: SessionStorage logika
- ✅ JS: prefers-reduced-motion podrška
- ✅ JS: Fallback timer (5s)
- ✅ JS: Scroll prevention
- ✅ Responsive: Desktop, tablet, mobilni
- ✅ Accessibility: aria-hidden, semantički HTML
- ✅ Performance: CSS-only glow, opacity/transform animacije
- ✅ Bilingual: Srpska i engleska verzija

---

**Dokument verzija: 1.0 | Datum: Mai 2026**
