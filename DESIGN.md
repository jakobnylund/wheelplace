# Wheelplace — UI Design Specification

Use this document to recreate the exact visual design of the Wheelplace marketplace. This covers design tokens, component patterns, page layouts, animations, and responsive behavior. It is design-only — it does not prescribe data models, routing, file structure, or backend implementation.

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

brand-green:        #22c55e    — success, "buy" actions, verified seller badges
brand-green-dark:   #16a34a    — hover state for green

brand-dark:         #232933    — primary text color, dark backgrounds (hero, footer)
brand-white:        #ffffff    — white surfaces
brand-gray:         #d5d5d5    — borders, dividers
brand-gray-light:   #f5f5f7    — page background, subtle surfaces
brand-gray-medium:  #8a8f98    — secondary/muted text

eu-blue:            #003399    — license plate badge background
eu-yellow:          #ffcc07    — EU stars color
```

Semantic colors (used sparingly):
- **Amber** tones (`amber-50` through `amber-800`) — compatibility warnings
- **Green** tones (`green-50` through `green-800`) — compatibility success confirmations
- **Red** (`red-500`) — error text
- **Indigo/sky/violet/purple** (`indigo-400`, `sky-400`, `violet-400`, `purple-400`) — AI loading animation gradients

### Typography

**Font families**:
- **Body**: Inter, "Helvetica Neue", system-ui, sans-serif
- **Headings**: Rubik, "Helvetica Neue", system-ui, sans-serif

**Font smoothing**: antialiased

| Size | Pixels | Usage |
|------|--------|-------|
| xs | 12px | Badges, metadata, labels, captions |
| sm | 14px | Secondary text, descriptions, nav items |
| base | 16px | Body text |
| lg | 18px | Card headings (h2) |
| xl | 20px | Subheadings |
| 2xl | 24px | Prices, section titles |
| 3xl | 30px | Section headings |
| 4xl–5xl | 36–48px | Hero headings (responsive) |
| 56px | 56px | Hero title on large desktop |

| Weight | Value | Usage |
|--------|-------|-------|
| normal | 400 | Body text |
| medium | 500 | Emphasized text, labels |
| semibold | 600 | Subheadings |
| bold | 700 | Headings, prices, CTAs |

Special: License plate input uses `'Helvetica Neue', monospace` with wide letter-spacing (0.15em), uppercase.

### Spacing

4px base grid. Common values:

| Value | Usage |
|-------|-------|
| 16px | Compact card padding |
| 20px | Standard card/panel padding |
| 28px | Large panel padding |
| 32px | Section padding, container horizontal (desktop) |
| 12px | Tight grid gap |
| 16px | Standard grid gap |
| 20px | Card grid gap |
| 24px | Section content gap |
| 80px | Section vertical spacing |
| 96px | Large section vertical spacing |
| 20px / 32px | Container horizontal padding (mobile / desktop) |

**Max container width**: 1400px, centered.

Standard page wrapper:
```
Container → horizontal padding (20px mobile, 32px desktop)
  └─ Inner → max-width 1400px, centered
```

### Border Radius

| Value | Usage |
|-------|-------|
| 6px | Small badges |
| 8px | Inputs, thumbnails |
| 12px | Cards, buttons, panels (primary radius) |
| 16px | Large cards, modals, license plate search |
| 50% | Avatars, circular buttons |

### Shadows

| Level | Usage |
|-------|-------|
| Small | Subtle (inputs, small cards) |
| Large | Card hover state |
| Extra large | Chat button hover, chat modal |
| None | Default card state — uses border instead |

**Key rule**: Cards use a thin border (`brand-gray` at 40% opacity) by default with no shadow. Shadow appears only on hover as an elevation effect.

---

## Global Layout

### Navbar

```
┌─────────────────────────────────────────────────┐
│ Logo    [Search bar]     Nav links    [Logga in] │  72px tall
└─────────────────────────────────────────────────┘
```

- Fixed to top, full width, z-index 50
- Background: white at 95% opacity with backdrop blur
- Height: 72px
- Bottom border: `brand-gray` at 40% opacity
- Logo: height ~36px (desktop), ~32px (mobile)
- Search bar: rounded pill, max-width ~576px, hidden on mobile
- Nav links: hidden below 768px, horizontal with small gap
- Mobile: hamburger menu toggles full-width stacked links

### Page Structure

```
┌─────────────────────────────────────┐
│           Navbar (72px)             │  fixed
├─────────────────────────────────────┤
│         72px top spacer             │
├─────────────────────────────────────┤
│                                     │
│          Page Content               │
│     1400px max, centered            │
│     20/32px horizontal padding      │
│                                     │
├─────────────────────────────────────┤
│             Footer                  │
└─────────────────────────────────────┘

ChatBot widget — fixed bottom-right corner, z-index 50
```

---

## Pages

### Landing Page

**Hero Section**:
- Full-width `brand-dark` background
- Generous top padding (~128–160px) to clear navbar and create breathing room
- Title: largest font size (36–56px responsive), bold, white, tight tracking and line-height (1.1)
- Subtitle: large body text (18–20px), white at 70% opacity
- Contains: license plate search (large variant) and category grid below
- Trustpilot badge at bottom: star rating image + score text in muted white

**Featured Listings ("Senaste annonserna")**:
- Section spacing: 80px vertical
- Heading: large (30–36px responsive), bold, dark, tight tracking
- Horizontal scroll carousel
- Cards: fixed width (~280–300px), non-shrinking, spaced with 20px gap
- Card structure: image (4:3 ratio) → title → specs line → seller + location → price
- Left/right scroll arrows: 40px circular buttons with border, white background
- "Visa alla X annonser" link below in brand-blue with right arrow

**How It Works ("Tre sätt att hitta rätt hjul")**:
- 3-column grid (desktop), single column (mobile)
- Cards with image, overlay icon in top-left (48px white circle with backdrop blur)
- Title + description text below each image

**Testimonials**:
- Horizontal scroll carousel, fixed-width cards (~340px)
- Yellow star rating SVGs, italic quote text, author avatar circle + name

**FAQ Section**:
- Accordion: clickable rows that expand/collapse
- Chevron icon rotates on open state
- Relaxed line-height on answer text

**Scroll Reveal**: All sections fade in from below (24px offset) with 0.7s ease-out transition, triggered at 15% viewport intersection.

### Listings Page (Annonser)

**Layout**:
```
Desktop:
┌──────────┬────────────────────────────────┐
│ Filters  │  Header + Sort + Grid          │
│ ~260px   │  flex-1                        │
│ sticky   │                                │
│ top-96px │  1/2/3-column responsive grid  │
└──────────┴────────────────────────────────┘

Mobile: Filters collapse into toggleable panel above single-column grid
```

**Filter Sidebar**:
- Collapsible sections: title + chevron toggle + optional "Rensa" (clear) link
- Filter types: checkbox groups, select dropdowns, price range slider
- **Price range slider**: dual-thumb, 0–50,000 kr range in 500 kr steps
  - Track: thin (6px) rounded bar, gray background
  - Active range: `brand-blue` fill between thumbs
  - Thumbs: 20px white circles with 2px blue border and subtle shadow
  - Labels above: formatted price values

**Listing Cards**:
- Grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop), 20px gap
- Card: white, 12px radius, thin border, no shadow (shadow on hover)
- Image: 4:3 aspect ratio, zoom on hover (scale 1.05, 500ms transition)
- Image carousel: dot indicators at bottom, left/right arrow buttons on hover
- Heart/favorite icon: top-right overlay on image
- "Nya" badge: blue with white text, 11px bold, top-left on image
- Content: title (15px bold, 2-line clamp) → specs string → seller name + verified badge → location with pin icon → price in brand-blue (18px bold)
- Verified seller: green checkmark circle icon next to "Företag" seller names

### Detail Page (Annons)

**Layout**:
```
Desktop:
┌─────────────────────────┬──────────┐
│ Breadcrumb (full width)            │
├─────────────────────────┬──────────┤
│ Image Gallery           │ InfoPanel│
│ Details Grid            │ 340px    │
│ Description             │ sticky   │
│ AI Try-On               │ top-88px │
│ Compare Section         │          │
│ Location Map            │          │
│ Seller Card             │          │
│ Reviews                 │          │
└─────────────────────────┴──────────┘

Mobile: Single column. Info panel appears between gallery and details grid.
```

**Breadcrumb**: White bar with bottom border. Hem → Annonser → [listing title]. Chevron separators.

**Image Gallery**:
- Main image: 4:3 aspect ratio, 12px radius
- Thumbnail strip: 64×64px thumbnails, 8px radius, active highlighted with 2px blue border
- Navigation arrows: 36px circles, white at 80% opacity with backdrop blur
- Click main image to open lightbox overlay

**Info Panel** (sticky sidebar on desktop):
- Price: 24px bold in brand-blue
- Contact buttons: primary (blue) and secondary (bordered)
- Specs summary rows: label + value, 14px text
- Standard card styling (white, bordered, 20px padding)

**Details Grid**:
- 2 columns (mobile) → 3 columns (desktop), 12px gap
- Each cell: white card with 16px padding
- Label: 11px semibold, dark at 40% opacity, uppercase, wide letter-spacing
- Value: 14px semibold, dark

**Description**: White card, heading + body text with `whitespace-pre-line` and relaxed line-height.

---

## Feature: AI Try-On ("Prova på din bil")

Allows users to upload a car photo and see the listing's wheels visualized on their car.

**Container**: Standard white card (bordered, 20px padding)

**Header**: Blue circle with sparkle icon + "Prova på din bil" title + subtitle "Ladda upp en bild och se hur hjulen ser ut med AI"

**States**:

1. **Upload**: Dashed border dropzone (2px dashed, gray → blue on hover, 12px radius, 32px padding). Camera icon, "Ta en bild eller ladda upp" text. Supports drag-and-drop and file picker with mobile camera capture.

2. **Preview**: Shows the uploaded photo in a single 4:3 image area. "Generera" (blue) and "Ny bild" (bordered) buttons below.

3. **Loading**: Full 4:3 area replaced with AI animation:
   - Soft tinted gradient background (blue-white to lavender-white)
   - 5 large blurred color blobs (blue, violet, sky, purple, indigo) floating with different animation speeds (5–9 second cycles)
   - White shimmer sweep passing left-to-right (3s cycle)
   - Centered: gradient sparkle icon (indigo→sky→purple) gently pulsing + "AI genererar..." text in matching gradient

4. **Result**: Generated image fills the 4:3 area.

5. **Compatibility banners** (shown after result):
   - Warning (wheels don't fit): amber background, amber border, warning triangle icon, "Passar troligtvis inte" heading + explanation
   - Success (wheels fit): green background, green border, checkmark icon, "Bra matchning!" text

---

## Feature: ChatBot Widget

**Position**: Fixed, bottom-right corner (24px inset), z-index 50.

**Toggle Button**:
- 64×64px circle with shadow and 2px white border
- Closed state: shows avatar image, muted grey-blue background (#8b95a8)
- Open state: shows X icon, brand-blue background (#477bf4)
- Hover: larger shadow, slight scale-up (1.05)

**Speech Bubble** (auto-greeting):
- Appears 3 seconds after page load
- White rounded card (280px wide, 16px radius, shadow, thin border, 16px padding)
- Message: greeting from the CEO inviting questions
- Small triangle pointer at bottom-right pointing toward avatar
- Entrance: fade in + slide up + slight scale (0.4s ease-out)
- Auto-dismisses after 12 seconds
- Dismissible via X button, or by opening chat, or navigating away
- Does not reappear once dismissed during session

**Chat Panel** (when open):
- 380px wide, 520px tall, soft blue background (#f0f4fe), 16px radius, heavy shadow
- Header: white bar with centered logo
- Messages: avatar + bot name, white speech bubbles with rounded corners
- Input bar: rounded pill input with send arrow button, white background, bottom of panel

---

## Feature: License Plate Search

Swedish-style registration number input with EU badge.

**Structure**: Horizontal form — EU badge | text input | search button

**EU Badge** (left side):
- EU blue background (#003399)
- EU flag stars from SVG asset (yellow #ffcc07, circle of 12 stars)
- Letter "S" below in white, 9px bold
- Large variant: 56×64px, Small variant: 48×56px

**Text Input**:
- Large: 64px tall, 16px radius, 24px monospace font
- Small: 56px tall, 12px radius, 20px monospace font
- Monospace font with wide letter-spacing (0.15em), uppercase
- Auto-formats as "ABC 123" (space inserted after 3rd character)
- Focus state: border turns brand-blue

**Search Button** (right side, inside input):
- Large: 48×48px, Small: 40×40px
- Brand-blue background, 12px radius
- White magnifying glass icon
- 8px right margin (inset into the input)

---

## Reusable Components

### Card
White background, 12px radius, thin border (`brand-gray` at 40% opacity), no shadow.
Padding varies by context: 16px (compact), 20px (standard), 28px (spacious).

### Badge
Inline pill label: 11px bold, horizontal padding 8px, vertical padding 2px, 6px radius.
- **New/Blue**: brand-blue background, white text
- **Verified seller**: green checkmark circle SVG icon (not a text badge)

### Button — Primary
Brand-blue background, darker on hover, white text, medium weight, 12px radius, 20×10px padding. No border. Transitions color on hover. Pointer cursor.

### Button — Secondary
White background, thin gray border, dark text, medium weight, 12px radius, 16×10px padding. Light gray background on hover. Pointer cursor.

### Button — Circular
40×40px, full circle, thin gray border, white background. Centers an icon. Subtle border darkening and shadow on hover.

### FilterSection
Collapsible panel section:
- Header row: title (semibold) + rotating chevron icon
- Bottom border separator
- Optional "Rensa" clear button (muted text, appears on hover/when active)
- Content area with smooth expand/collapse

### Input
Thin gray border, 8px radius, ~10×10px padding, 13px text, white background, no outline. Focus highlights border.

### Select
Same styling as input, but with `appearance: none` and a custom chevron SVG as background-image on the right side.

---

## Footer

- Full-width `brand-dark` background (same color as hero)
- 3-column grid (desktop), stacked (mobile)
- First column: logo + brief description text
- Middle/right columns: link lists grouped by category
- Links: 14px, white at 60% opacity, full white on hover
- Bottom row: copyright text + social media icons, separated by thin white border (10% opacity)

---

## Responsive Behavior

| Aspect | Desktop (≥1024px) | Tablet (640–1023px) | Mobile (<640px) |
|--------|-------------------|---------------------|-----------------|
| Navbar | All nav links visible | Some links hidden | Hamburger menu |
| Hero title | 48–56px | 48px | 36px |
| Container padding | 32px horizontal | 32px | 20px |
| Listing grid | 3 columns | 2 columns | 1 column |
| Detail page | 2-col + sticky sidebar | Single column | Single column |
| Featured carousel | Scroll arrows visible | Scroll arrows | Touch scroll only |
| Filter sidebar | Always visible (sticky) | Collapsible | Collapsible |
| Category grid | 6 columns | 6 columns | 3 columns |
| Brand grid | 6 columns | 4 columns | 3 columns |
| How It Works | 3 columns | 3 columns | 1 column |
| Footer | 3 columns | 3 columns | 1 column |

**Breakpoints**:
- Small: 640px
- Medium: 768px
- Large: 1024px

---

## Animations & Transitions

### Scroll Reveal
All major page sections use a fade-in-from-below entrance:
- Initial: invisible, shifted 24px down
- Visible: full opacity, original position
- Duration: 0.7s ease-out
- Trigger: IntersectionObserver at 15% threshold

### Card Hover
- Image: zoom to 1.05x scale over 500ms
- Card: shadow appears + border darkens over 200ms
- Buttons: scale down to 0.95x on active/press

### AI Loading Animation
- 5 large, heavily blurred color blobs floating with different speeds (5–9s cycles), translating and scaling
- White shimmer sweep moving across the surface (3s cycle, left-to-right)
- Center sparkle icon gently pulsing (2.5s, scale 1→1.1, opacity 0.7→1)

### Chat Speech Bubble
- Entrance: fade in + slide up 8px + scale from 0.95 → 1, over 0.4s ease-out
- Exit: removed from DOM (no exit animation)

### Image Gallery
- Main image: cross-fade transition (700ms opacity)
- Active thumbnail: 2px blue border highlight (instant)

### General Interactions
- Color transitions: 200ms ease (links, buttons)
- Layout transitions: 300ms ease (accordion expand/collapse)
- Hover scale: 200ms ease (chat button, brand logos)
