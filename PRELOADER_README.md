# Premium Cinematic Preloader — Branka & Branko

## ✨ Implementacija Gotova

Novi luxury wedding cinematic intro je u potpunosti implementiran i zamenjuje stari preloader.

---

## 📋 Tehnički Rezime

### 1. FAJLOVI KOJI SU IZMENJENI

#### HTML
- **[index.html](index.html)** — Zamenjeni preloader markup (linije 30-48)
- **[en/index.html](en/index.html)** — Zamenjeni preloader markup za englesku verziju

**Šta je uklonjeno:**
- Stari preloader sa SVG okvirima i fleuronima (~90 linija)
- Stara kompleksna animacija sa "Dobro došli na venčanje" tekstom

**Što je dodano:**
- Minimalistički preloader sa monogramom B&B
- Elegantni layout sa imenima "Branka & Branko"
- "Wedding Invitation" tekst
- Diskretan dekorativni elementi

#### CSS
- **[css/style.css](css/style.css)** — Zamenjeni svi preloader stilovi (linije 195-360)

**Šta je uklonjeno:**
- 165+ linija starih preloader CSS klasa (`.preloader`, `.preloader__*`, `.prl-*`)
- Kompleksne SVG animacije i stroke-dasharray stilove

**Što je dodano:**
- Novi `.cinematic-preloader*` stilovi (165 linija)
- Elegantna pozadina sa gradijentima
- Soft-gold glow efekt
- Responsive monogram i tekst
- Media queries za mobilne uređaje

#### JavaScript
- **[js/main.js](js/main.js)** — Zamenjeni preloader i inicijalizacija

**Šta je uklonjeno:**
- Stara `runPreloader()` funkcija (~75 linija sa kompleksnom GSAP animacijom)

**Što je dodano:**
- Nova `runCinematicPreloader()` funkcija sa svim zahtevima:
  - **SessionStorage logika**: Preloader se prikazuje samo prvi put po sesiji
  - **Repeat visit**: Drugi put u istoj sesiji, preloader traje max 300ms ili se preskače
  - **prefers-reduced-motion**: Poštuje korisnikove preference za smanjene animacije
  - **Fallback timer**: Ako animacija iz bilo kojeg razloga ne završi, preloader se automatski uklanja nakon 5s
  - **Scroll prevention**: Sprečava scrollanje tokom preloadera
  - **GSAP timeline**: 3.7-sekundna elegantna animacijska sekvenca

---

## 🎬 ANIMACIJSKA SEKVENCA

Ukupno trajanje: **~3.7 sekundi** (prvi put)

```
0.0s  | Početak
      | ├─ Pozadina fade-in (0.4s)
      | ├─ Glow efekt pojavljuje se (0.6s)
      |
0.5s  | Top dekorativna linija se pojavljuje (0.5s)
      |
0.7s  | Monogram B & B:
      | ├─ B — blur-to-sharp + scale (0.8s)
      | ├─ & — pojavljuje se sa skip (0.12s)
      | └─ B — blur-to-sharp + scale (0.8s)
      |
1.4s  | Imena (Branka & Branko):
      | ├─ "Branka" — fade-in + y movement (0.7s)
      | ├─ "&" — fade-in + y movement (0.7s)
      | └─ "Branko" — fade-in + y movement (0.7s)
      |
1.95s | "Wedding Invitation" tekst fade-in (0.5s)
      |
1.7s  | Bottom dekorativna linija se pojavljuje (0.5s)
      |
2.3s  | Pauza — svi elementi na vrhuncu (0.8s)
      |
2.85s | Početak fade-out:
      | ├─ Sadržaj ide gore sa fade (0.6s)
      | ├─ Glow se gubi (0.5s)
      |
3.0s  | Preloader slide-up i fade (0.7s)
      |
3.7s  | Završeno — strannica se prikazuje
```

---

## 🎨 DIZAJN DETALJI

### Boje (iz postojeće palete)
- **Pozadina**: `var(--paper)` + `var(--paper-cream)` gradijent
- **Tekst**: `var(--ink)` (topao crn)
- **Akcentni elementi**: `var(--brass-light)` (soft gold)
- **Muted tekst**: `var(--muted)` (blago siva)

### Tipografija
- **Monogram**: Serif (Cormorant Garamond), font-size: clamp(72px, 16vw, 180px)
- **Imena**: Serif, font-size: clamp(32px, 6vw, 84px)
- **Subtitle**: Sans-serif (Inter), font-size: clamp(11px, 1.2vw, 14px)

### Responsive
- **Desktop**: Puno prikaziv monogram, bogatija animacija
- **Tablet**: Prilagođeni spacing, normalna animacija
- **Mobilni**: Kompaktan layout, bez teških efekata

---

## ⚙️ KAKO FUNKCIONIRA

### 1. SessionStorage Logika

```javascript
// Ključ: 'wedding_preloader_shown'
sessionStorage.getItem('wedding_preloader_shown')
// Vrednost: 'true' kada je preloader prikazan
```

**Prvi put korisnik poseti stranicu:**
- Preloader se prikazuje sa punom 3.7s animacijom
- SessionStorage se postavi na `'true'`

**Drugi/kasnije u istoj sesiji:**
- Preloader se preskače ili brzo (300ms) gasi
- SessionStorage sprečava ponovno pokretanje

**Novo otvoren browser tab ili nova sesija:**
- SessionStorage se resetuje
- Preloader se ponovo prikazuje sa punom animacijom

### 2. Scroll Prevencija

```javascript
document.body.style.overflow = 'hidden';  // Tijekom preloadera
document.body.style.overflow = '';        // Nakon preloadera
```

Korisnik **ne može scrollati** dok se preloader prikazuje.

### 3. Fallback Timer

```javascript
const fallbackTimer = setTimeout(() => {
  hidePreloader();
}, 5000);  // Max 5 sekundi
```

Ako GSAP animacija iz bilo kojeg razloga ne završi, preloader se automatski uklanja nakon 5s.

### 4. prefers-reduced-motion

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  hidePreloader();  // Preloader se odmah uklanja
  return Promise.resolve();
}
```

Poštuje korisnikove preference za smanjene animacije (accessibility).

---

## 🧪 TESTIRANJE PRELOADERA

### Test 1: Prva Poseta (Puna Animacija)

1. **Otvori stranicu u novoj privatnoj sesiji** (incognito mode)
2. Vikaće se preloader sa animacijom (~3.7s)
3. Animacija će biti:
   - Pozadina fade-in
   - Monogram B&B blur-to-sharp
   - Imena se pojavljuju
   - "Wedding Invitation" tekst
   - Sve ide gore sa fade-out
   - Stranica se prikazuje

### Test 2: Repeat Visit (Brz Preloader)

1. **Refreshuj stranicu** (F5 ili Cmd+R) u istoj sesiji
2. Preloader će biti **sasvim brz** (~300ms) ili se može preskočiti
3. Stranica se odmah prikazuje
4. **Ovo je namerno** — preloader se prikazuje samo prvi put po sesiji

### Test 3: Reset SessionStorage (Za Testiranje)

Ako želiš da vidim ponovo punu animaciju:

1. **Otvori DevTools** (F12)
2. Idi u **Console** tab
3. Unesi:
   ```javascript
   sessionStorage.removeItem('wedding_preloader_shown');
   location.reload();
   ```
4. Stranica će se refreshovati sa punom preloader animacijom

### Test 4: Mobilni Uređaj

1. Otvori stranicu na mobilnom (ili koristi DevTools responsive mode)
2. Monogram i tekst su manji i prilagođeni za mali ekran
3. Animacija se izvršava bez problema
4. Nema horizontalnog scrollanja

### Test 5: Reduced Motion

1. Otvori **System Settings** > Accessibility > Display
2. Uključi **Reduce motion**
3. Otvori stranicu
4. Preloader će se **sasvim brzo** završiti bez animacija
5. Stranica se odmah prikazuje

---

## 📊 PERFORMANSE

- ✅ **Bez video fajlova** — samo CSS i JS
- ✅ **Bez velikih slika** — samo gradijenti i CSS efekti
- ✅ **Opacity i transform animacije** — best performance
- ✅ **Nema skupih filtera** — soft-gold glow je samo radijalni gradijent
- ✅ **Bez CLS (Cumulative Layout Shift)** — preloader je fixed positioning
- ✅ **Bez LCP problema** — preloader ne utiče na LCP mjerenja

---

## 🔧 KONFIGURACIJA

### Ako želiš da promeniš animacijsku brzinu:

Otvori **[js/main.js](js/main.js)** i pronađi `runCinematicPreloader()` funkciju. Promeni `duration` vrednosti u GSAP timeline:

```javascript
// Primer: brža animacija (smanj sve duration vrednosti)
.fromTo('.cinematic-preloader__letter',
  { opacity: 0, scale: 0.85, filter: 'blur(12px)' },
  {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    duration: 0.6,  // ← Promeni sa 0.8 na 0.6 za brže
    ease: 'power3.out',
    stagger: 0.08,   // ← Ili smanji stagger
  },
  0.7
)
```

### Ako želiš da promeniš boje:

Otvori **[css/style.css](css/style.css)** i pronađi `.cinematic-preloader__bg`:

```css
.cinematic-preloader__bg {
  background: linear-gradient(
    135deg, 
    #f4ede1 0%,      /* ← Promeni boju */
    #ece1cc 50%,     /* ← Promeni boju */
    #f4ede1 100%     /* ← Promeni boju */
  );
}
```

---

## 📝 BILŠKE ZA BUDUĆNOST

- Preloader se prikazuje samo prvi put — **to je namerno**. Ako korisnik ponovo poseti stranicu u istoj sesiji, želi da ide direktno na sadržaj.
- Fallback timer (5s) osigurava da se stranica prikazuje čak i ako GSAP ne radi.
- CSS-only animacija bi bila moguća, ali GSAP daje više kontrole i fleksibilnosti.
- Monogram "B&B" je čist tekst — ako želiš da ga zameniš sa SVG-om ili logoom, lako se može promeniti u HTML-u.

---

## ✅ ČEKLIST ZAHTEVA

- ✅ Premium, editorial, romantičan, sofisticiran dizajn
- ✅ Ivory/champagne pozadina sa soft-gold glow
- ✅ Centralni monogram B&B sa blur-to-sharp efektom
- ✅ Imena "Branka & Branko"
- ✅ "Wedding Invitation" tekst
- ✅ Diskretan dekorativni elementi (linije)
- ✅ ~3.7-sekundna animacijska sekvenca
- ✅ Responsive dizajn (desktop, tablet, mobilni)
- ✅ SessionStorage logika (prikazuje se samo prvi put)
- ✅ prefers-reduced-motion podrška
- ✅ 5-sekundni fallback timer
- ✅ Sprečavanje scrollanja tokom preloadera
- ✅ Bez kiča, bez srca, bez jeftinih animacija
- ✅ GSAP animacije za smooth efekat
- ✅ Bez teških biblioteka ili external fajlova

---

## 🎯 ZAKLJUČAK

Novi preloader je implementiran sa svim zahtevima. Elegantna je sekvenca koja traje ~3.7 sekundi i prikazuje se samo prvi put po sesiji. Sve je responsive, accessible, i performant.

**Za pitanja ili izmene, kontaktiraj developers.**
