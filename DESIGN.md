# Wheelplace — UI Design Specification

Use this document to understand and recreate the exact layout and visual design of the Wheelplace marketplace. This is a frontend/styling specification covering the design system, page layouts, component patterns, and responsive behavior.

**Stack**: React + Vite, Tailwind CSS v4 (CSS variable-based theming), React Router for SPA routing. Deployed on Vercel.

**Language**: Swedish. All UI copy is in Swedish.

---

## Design Tokens

### Color Palette

```
brand-blue:         #477bf4    — primary accent, CTAs, links, active states
brand-blue-dark:    #3a66d4    — hover/pressed state for primary
brand-blue-light:   #6b96f7    — lighter accent
brand-blue-50:      #f0f4fe    — very subtle tint (backgrounds)
brand-blue-100:     #dce5fd    — light tint

brand-green:        #22c55e    — success, "buy" actions, verified badges
brand-green-dark:   #16a34a    — hover state for green

brand-dark:         #232933    — primary text color
brand-black:        #000000    — pure black (rare)
brand-white:        #ffffff    — white surfaces
brand-gray:         #d5d5d5    — borders, dividers
brand-gray-light:   #f5f5f7    — page background, subtle surfaces
brand-gray-medium:  #8a8f98    — secondary/muted text

eu-blue:            #003399    — license plate badge background
eu-yellow:          #ffcc07    — EU stars color
```

Additional Tailwind utilities used directly:
- `amber-50`, `amber-200`, `amber-500`, `amber-700`, `amber-800` — compatibility warnings
- `green-50`, `green-200`, `green-500`, `green-800` — compatibility success
- `red-500` — error text
- `indigo-400`, `sky-400`, `violet-400`, `purple-400` — AI loading gradients

### Typography

**Font families** (defined in `index.css` `@theme`):
- `--font-sans`: Inter, "Helvetica Neue", system-ui, sans-serif
- `--font-heading`: Rubik, "Helvetica Neue", system-ui, sans-serif

**Font smoothing**: antialiased (`-webkit-font-smoothing: antialiased`)

| Size | Tailwind | Pixels | Usage |
|------|----------|--------|-------|
| xs | `text-xs` | 12px | Badges, metadata, labels, captions |
| sm | `text-sm` | 14px | Secondary text, descriptions, nav items |
| base | `text-base` | 16px | Body text |
| lg | `text-lg` | 18px | Card headings (h2) |
| xl | `text-xl` | 20px | Subheadings |
| 2xl | `text-2xl` | 24px | Prices, section titles |
| 3xl | `text-3xl` | 30px | Section headings |
| 4xl/5xl | `text-4xl sm:text-5xl` | 36–48px | Hero headings |
| Display | `lg:text-[56px]` | 56px | Hero title (large desktop) |

| Weight | Tailwind | Value | Usage |
|--------|----------|-------|-------|
| normal | `font-normal` | 400 | Body text |
| medium | `font-medium` | 500 | Emphasized text, labels |
| semibold | `font-semibold` | 600 | Subheadings |
| bold | `font-bold` | 700 | Headings, prices, CTAs |

Special: License plate input uses `fontFamily: "'Helvetica Neue', monospace"` with `tracking-[0.15em]`.

### Spacing

4px grid (Tailwind default). Common spacing values:

| Token | Value | Usage |
|-------|-------|-------|
| p-4 | 16px | Card inner padding (compact) |
| p-5 | 20px | Standard card/panel padding |
| p-7 | 28px | Large panel padding |
| p-8 | 32px | Section padding |
| gap-3 | 12px | Tight grid gap |
| gap-4 | 16px | Standard grid gap |
| gap-5 | 20px | Card grid gap |
| gap-6 | 24px | Section content gap |
| py-20 | 80px | Section vertical spacing |
| py-24 | 96px | Large section spacing |
| px-5 sm:px-8 | 20/32px | Container horizontal padding |

**Container**: `max-w-site` = 1400px (`--max-width-site: 1400px` in CSS). Centered with `mx-auto`.

Standard page wrapper pattern:
```html
<div class="px-5 sm:px-8">
  <div class="max-w-site mx-auto">
    ...
  </div>
</div>
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| rounded-md | 6px | Small badges |
| rounded-lg | 8px | Inputs, thumbnails |
| rounded-xl | 12px | Cards, buttons, panels |
| rounded-2xl | 16px | Large cards, modals, plate search |
| rounded-full | 50% | Avatars, circular buttons |

### Shadows

| Token | Usage |
|-------|-------|
| shadow-sm | Subtle (inputs, small cards) |
| shadow-lg | Card hover state: `hover:shadow-lg` |
| shadow-xl | Chat button hover |
| shadow-2xl | Chat modal panel |
| none | Default card state (border only, no shadow) |

Cards use `border border-brand-gray/40` instead of shadow by default. Shadow appears on hover.

---

## Global Layout

### Navbar (fixed)

```
┌─────────────────────────────────────────────────┐
│ Logo    [Search bar]     Nav links    [Logga in] │  72px tall
└─────────────────────────────────────────────────┘
```

- Fixed: `fixed top-0 left-0 right-0 z-50`
- Background: `bg-white/95 backdrop-blur-md`
- Height: `h-[72px]`
- Border: `border-b border-brand-gray/40`
- Logo: `h-9` (desktop), `h-8` (mobile)
- Search bar: rounded-full, max-w-xl, hidden on mobile
- Nav links: `hidden md:flex`, gap-1
- Mobile: hamburger menu, full-width stacked links

### Page Structure

```
┌─────────────────────────────────────┐
│           Navbar (72px)             │  fixed
├─────────────────────────────────────┤
│         pt-[72px] spacer            │
├─────────────────────────────────────┤
│                                     │
│          Page Content               │
│     max-w-site (1400px) centered    │
│        px-5 sm:px-8 padding         │
│                                     │
├─────────────────────────────────────┤
│             Footer                  │
└─────────────────────────────────────┘

ChatBot widget — fixed bottom-6 right-6 z-50
```

---

## Pages

### Landing Page

**Hero Section**:
- Background: `bg-brand-dark` (dark navy), full-width
- Padding: `pt-32 sm:pt-40 pb-20 sm:pb-28`
- Title: `text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.1]`
- Subtitle: `text-lg sm:text-xl text-white/70`
- Contains: PlateSearch component (large variant) + CategoryGrid below
- Trustpilot badge at bottom: stars image + score text

**Featured Listings ("Senaste annonserna")**:
- Section: `py-20`
- Heading: `text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight`
- Horizontal scroll carousel with left/right arrow buttons
- Cards: `w-[280px] sm:w-[300px]`, fixed width, `flex-shrink-0`
- Card structure: image (aspect-[4/3]) → title → specs → seller + location → price
- Scroll buttons: `w-10 h-10 rounded-full border border-brand-gray/60 bg-white`
- "Visa alla 1 753 annonser" link: `text-brand-blue` with arrow icon
- Uses shared `mockListings` data from `src/data/mockListings.js`

**How It Works ("Tre sätt att hitta rätt hjul")**:
- 3-column grid (desktop), 1-column stack (mobile)
- Cards: image with overlay icon (top-left), title, description
- Overlay icon: `w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm`

**Testimonials**:
- Horizontal scroll, `w-[340px]` fixed-width cards
- Star rating (yellow SVG stars), quote text, author avatar + name

**FAQ Section**:
- Accordion pattern: click to expand/collapse
- Chevron rotates on open
- Answer text with `leading-relaxed`

**Scroll Reveal Animation** (`useScrollReveal` hook):
```css
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```
Uses IntersectionObserver with `threshold: 0.15`.

### Listings Page (Annonser)

**Layout**:
- Desktop: sidebar (filters) + main content, flex row
- Mobile: filters in collapsible panel, full-width grid

```
Desktop:
┌──────────┬────────────────────────────────┐
│ Filters  │  Header + Sort + Grid          │
│ ~260px   │  flex-1                        │
│ sticky   │                                │
│ top-24   │  grid-cols-1/2/3 responsive    │
└──────────┴────────────────────────────────┘
```

**Filter Sidebar**:
- Sections: FilterSection component with title, chevron toggle, optional clear button
- Filter types: CheckboxGroup, SelectFilter, PriceRangeSlider
- Price slider: dual-thumb range (0–50,000 kr, 500 kr steps)
  - Track: `h-1.5 rounded-full bg-brand-gray/40`
  - Active range: `bg-brand-blue`
  - Thumbs: `w-5 h-5 rounded-full bg-white border-2 border-brand-blue shadow-sm`

**Listing Cards**:
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`
- Card: `bg-white rounded-xl border border-brand-gray/40 overflow-hidden`
- Image: `aspect-[4/3]` with hover zoom (`group-hover:scale-105 transition-transform duration-500`)
- Image carousel: dot indicators + left/right arrows (visible on hover)
- Heart/favorite button: top-right overlay
- "Nya" badge: `bg-brand-blue text-white text-[11px] font-bold rounded-md`
- Price: `text-lg font-bold text-brand-blue`
- Seller verified badge: green checkmark SVG for "Företag" type

### Detail Page (Annons)

**Layout**:
- Desktop: 2-column (content left, sticky info panel right)
- Mobile: single column, info panel between gallery and details

```
Desktop:
┌─────────────────────────┬──────────┐
│ Breadcrumb (full width)            │
├─────────────────────────┬──────────┤
│ Image Gallery           │ InfoPanel│
│ Details Grid            │ w-[340px]│
│ Description             │ sticky   │
│ Try On Car (AI)         │ top-88px │
│ Compare Section         │          │
│ Location                │          │
│ Seller Card             │          │
│ Reviews                 │          │
└─────────────────────────┴──────────┘
```

**Image Gallery**:
- Main image: `aspect-[4/3] rounded-xl`
- Thumbnails: `w-16 h-16 rounded-lg`, active has `border-2 border-brand-blue`
- Navigation arrows: `w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm`
- Lightbox overlay on click

**Info Panel** (sticky sidebar):
- Price: `text-2xl font-bold text-brand-blue`
- Contact buttons: `bg-brand-blue` (primary), `border border-brand-gray` (secondary)
- Specs summary: rows with label + value, `text-sm`

**Details Grid**:
- `grid-cols-2 sm:grid-cols-3`, gap-3
- Each cell: `bg-white rounded-xl border border-brand-gray/40 p-4`
- Label: `text-[11px] font-semibold text-brand-dark/40 uppercase tracking-wider`
- Value: `text-sm font-semibold text-brand-dark`

---

## Feature: AI Try-On ("Prova på din bil")

**Container**: `bg-white rounded-xl border border-brand-gray/40 p-5`

**Header**: Sparkle icon in blue circle + title "Prova på din bil" + subtitle

**Upload State**:
- Dashed border dropzone: `border-2 border-dashed border-brand-gray hover:border-brand-blue rounded-xl p-8`
- Camera icon, "Ta en bild eller ladda upp" text
- Accepts file input with `capture="environment"` for mobile camera

**Image Display** (single view):
- `rounded-xl overflow-hidden bg-brand-gray-light border border-brand-gray/30 aspect-[4/3]`
- Shows: uploaded photo → AI loading animation → generated result

**AI Loading Animation**:
- Background: `linear-gradient(135deg, #f0f4ff 0%, #f5f0ff 50%, #eef6ff 100%)`
- 5 floating color blobs (blue, violet, sky, purple, indigo) with `blur-2xl`
- Each blob uses different `aiFloat` keyframe animation (5–9s cycle, various offsets)
- White shimmer sweep: `linear-gradient(105deg, ...)` moving left-to-right, 3s cycle
- Center: gradient sparkle SVG icon (pulsing) + "AI genererar..." gradient text
- Colors: `from-indigo-400 via-sky-400 to-purple-400`

**Compatibility Banners**:
- Warning (doesn't fit): `bg-amber-50 border border-amber-200`, amber icon + text
- Success (fits): `bg-green-50 border border-green-200`, green checkmark + text

**Action Buttons**:
- "Generera": `bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl`
- "Ny bild": `border border-brand-gray bg-white text-brand-dark rounded-xl`

---

## Feature: ChatBot Widget

**Toggle Button**:
- `w-16 h-16 rounded-full shadow-lg border-2 border-white`
- Closed: avatar image, `background-color: #8b95a8` (muted grey-blue)
- Open: X icon, `background-color: #477bf4` (brand blue)
- Hover: `shadow-xl hover:scale-105`

**Speech Bubble** (greeting):
- Appears after 3 seconds, auto-dismisses after 12 seconds
- `w-[280px] bg-white rounded-2xl shadow-lg border border-brand-gray/30 p-4`
- Triangle pointer: rotated square at bottom-right
- Entrance animation: `aiBubbleIn 0.4s ease-out` (fade + slide up + scale)
- Dismiss: X button top-right, or auto after 12s, or when chat opens
- Does not reappear once dismissed during session

**Chat Panel**:
- `w-[380px]`, height 520px, `bg-[#f0f4fe] rounded-2xl shadow-2xl`
- Header: white, centered logo
- Message area: avatar + "Wheelbot" name, white bubble with rounded corners
- Input: rounded-full border, send arrow button

---

## Feature: License Plate Search

**Structure**: Form with EU badge + text input + search button

**EU Badge**:
- Large: `w-14 h-16`, Small: `w-12 h-14`
- Background: `#003399` (EU blue)
- Stars: `/eu-stars.svg` (real EU flag stars in `#ffcc07`)
- Letter "S" below stars: `text-white text-[9px] font-bold`

**Input**:
- Large: `h-16 rounded-2xl text-2xl`
- Small: `h-14 rounded-xl text-xl`
- Font: `'Helvetica Neue', monospace`, `tracking-[0.15em] uppercase`
- Auto-formats: "ABC 123" pattern (space after 3 chars)
- Focus: `border-brand-blue`

**Search Button**:
- Large: `w-12 h-12 mr-2`, Small: `w-10 h-10 mr-2`
- `bg-brand-blue hover:bg-brand-blue-dark rounded-xl`
- Magnifying glass icon

---

## Reusable Components

### Card
```
bg-white rounded-xl border border-brand-gray/40
```
Padding varies: `p-4` (compact), `p-5` (standard), `p-7` (spacious).

### Badge
```
text-[11px] font-bold px-2 py-0.5 rounded-md
```
Variants:
- **Blue** (new): `bg-brand-blue text-white`
- **Green** (verified): green checkmark SVG icon
- **Condition**: inline text in specs line

### Button — Primary
```
bg-brand-blue hover:bg-brand-blue-dark text-white font-medium
rounded-xl px-5 py-2.5 transition-colors cursor-pointer border-none
```

### Button — Secondary
```
border border-brand-gray bg-white text-brand-dark font-medium
rounded-xl px-4 py-2.5 hover:bg-brand-gray-light transition-colors cursor-pointer
```

### Button — Circular
```
w-10 h-10 rounded-full border border-brand-gray/60 bg-white
flex items-center justify-center hover:border-brand-gray hover:shadow-sm
```

### FilterSection
Collapsible section with:
- Header: flex row, title (semibold) + chevron (rotates)
- Border bottom separator: `border-b border-brand-gray/40 pb-4 mb-4`
- Optional "Rensa" (clear) button

### Input
```
border border-brand-gray/60 rounded-lg px-2.5 py-2 text-[13px]
text-brand-dark bg-white outline-none
```

### Select
Same as input with `appearance-none` and custom chevron background-image SVG.

---

## Footer

- Background: `bg-brand-dark` (same as hero)
- 3-column grid (desktop), stacked (mobile)
- Logo + description in first column
- Link columns: `text-sm text-white/60 hover:text-white`
- Bottom row: copyright + social icons, `border-t border-white/10`

---

## Responsive Summary

| Aspect | Desktop | Mobile (<640px) |
|--------|---------|-----------------|
| Navbar | Full nav links visible | Hamburger menu, stacked links |
| Hero title | `text-5xl` / `text-[56px]` | `text-4xl` |
| Container padding | `px-8` (32px) | `px-5` (20px) |
| Listing grid | 3 columns | 1 column |
| Detail page | 2-col with sticky sidebar | Single column, inline info panel |
| Featured carousel | Scroll arrows visible | Touch scroll only |
| Filter sidebar | Always visible | Collapsible panel |
| Category grid | 6 columns | 3 columns |
| Brand grid | 6 columns | 3 columns |
| How It Works | 3 columns | 1 column |
| Testimonials | Scroll carousel | Touch scroll |
| Footer | 3 columns | 1 column |

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

---

## Animations

### Scroll Reveal (all sections)
```css
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```
Triggered via IntersectionObserver at `threshold: 0.15`.

### Card Hover
- Image zoom: `group-hover:scale-105 transition-transform duration-500`
- Card elevation: `hover:shadow-lg hover:border-brand-gray transition-all duration-200`
- Button scale: `active:scale-95`

### AI Loading (TryOnCar)
- 5 floating blobs: `aiFloat1` (6s), `aiFloat2` (7s), `aiFloat3` (5s) — translate + scale
- Shimmer sweep: `aiShimmer` (3s) — background-position slide
- Icon pulse: `aiPulse` (2.5s) — scale 1→1.1 + opacity

### Chat Bubble Entrance
```css
@keyframes aiBubbleIn {
  0% { opacity: 0; transform: translateY(8px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

### Image Gallery
- Cross-fade: `transition-opacity duration-700`
- Thumbnail highlight: `border-2 border-brand-blue` (active) vs `border-transparent`

---

## Data Model (Mock Listings)

Each listing in `src/data/mockListings.js`:

```js
{
  id: Number,
  title: String,
  price: Number,
  image: String,           // primary thumbnail path
  images: [String],        // all gallery images
  location: String,        // region
  condition: String,       // "Nya" | "Begagnade - Bra skick"
  seller: { name, type },  // type: "Privat" | "Företag"
  date: String,            // relative date string
  product: String,         // "Kompletta hjul"
  tireType: String,        // "Sommardäck" | "Vinterdäck friktion" | "Vinterdäck dubb"
  brand: String,           // car brand
  specs: { width, profile, diameter, depth },
  quantity: Number,
  description: String,
  carModel: String,
  tireBrand: String,
  dot: String,
  deliveryOptions: [String],
  sellerDetails: { avatar, description, memberSince, responseTime, phone, email },
  locationDetails: { city, region },
  reference: String,
}
```

---

## File Structure

```
client/
├── public/
│   ├── listings/          — listing images (.avif)
│   ├── brands/            — brand logos
│   ├── logo.svg           — Wheelplace logo
│   ├── avatar.png         — chatbot avatar
│   ├── eu-stars.svg       — EU flag stars
│   └── trustpilot-stars.svg
├── src/
│   ├── index.css          — Tailwind v4 theme, CSS variables, animations
│   ├── App.jsx            — Routes: /, /annonser, /annons/:id, /logga-in, /kontakt, /forfragningar
│   ├── data/
│   │   └── mockListings.js
│   ├── hooks/
│   │   └── useScrollReveal.js
│   └── components/
│       ├── LandingPage.jsx
│       ├── AnnonserPage.jsx
│       ├── AnnonsPage.jsx
│       ├── ui/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── PlateSearch.jsx
│       │   ├── ChatBot.jsx
│       │   ├── CategoryGrid.jsx
│       │   ├── BrandGrid.jsx
│       │   ├── TestimonialCard.jsx
│       │   └── FAQAccordion.jsx
│       └── annons/
│           ├── ImageGallery.jsx
│           ├── InfoPanel.jsx
│           ├── DetailsGrid.jsx
│           ├── SellerCard.jsx
│           ├── LocationSection.jsx
│           ├── CompareSection.jsx
│           ├── ReviewsSection.jsx
│           └── TryOnCar.jsx
├── api/                   — (also at repo root for Vercel)
│   └── visualize.js       — OpenAI serverless function
└── vercel.json
```
