# VodafoneThree Brand & Style Guidelines

> Reference document for maintaining visual and content consistency across all web code and assets.

---

## 1. Brand Identity

**Brand name:** VodafoneThree (one word, no space, no hyphen)

**Tagline territory:** "Building the UK's Best Network"

**Brand voice:** Bold, optimistic, grounded. Plain English. No corporate waffle. Confident without being arrogant. Human and accessible.

**Mission statement:** Investing £11 billion to build the UK's best network, transforming connectivity for every home and business across the nation.

---

## 2. Tone of Voice

| Principle | In practice |
|---|---|
| Clear | Short sentences. No jargon. |
| Bold | Make claims with conviction, back them with numbers. |
| Inclusive | Every community, every customer. Not just cities. |
| Forward-looking | "Tomorrow starts today" energy. Present tense where possible. |
| Human | Real stats, real impact, real people. |

**Do:** Use strong verbs. Lead with the benefit. Use "we" and "you".

**Don't:** Use passive voice unnecessarily. Avoid buzzwords like "synergies", "leverage", "ecosystem".

---

## 3. Colour Palette

Based on the Vodafone and Three heritage brands:

### Primary Colours

| Name | Hex | Usage |
|---|---|---|
| Vodafone Red | `#E60000` | Primary CTA buttons, key highlights, brand anchoring |
| Three Purple | `#6B2D8B` | Secondary brand colour, accents |
| White | `#FFFFFF` | Backgrounds, text on dark |
| Near Black | `#111111` | Body text, headings on light |

### Supporting Colours

| Name | Hex | Usage |
|---|---|---|
| Light Grey | `#F4F4F4` | Section backgrounds, cards |
| Mid Grey | `#767676` | Secondary text, captions |
| Dark Grey | `#333333` | Subheadings, meta text |
| Signal Green | `#00B140` | Success states, positive metrics |

> Note: Exact hex values should be verified against the live site's CSS. These are derived from Vodafone and Three brand heritage pending full design token access.

---

## 4. Typography

### Font Stack

```css
/* Primary - Headlines */
font-family: 'Vodafone', 'Arial', sans-serif;

/* Body fallback */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
```

### Type Scale

| Level | Element | Size (desktop) | Weight | Notes |
|---|---|---|---|---|
| Display | Hero H1 | 56–72px | 700 | Short, punchy, 1–2 lines max |
| H1 | Page title | 40–48px | 700 | |
| H2 | Section title | 28–36px | 700 | |
| H3 | Subsection | 20–24px | 600 | |
| Body Large | Lead text | 18–20px | 400 | |
| Body | Default | 16px | 400 | Min size for body copy |
| Caption | Small print | 14px | 400 | Legalese, footnotes |

### Rules

- Headlines: sentence case (not Title Case, not ALL CAPS unless for a specific design treatment)
- Line height: 1.4–1.6 for body, 1.1–1.2 for headlines
- Max line length: 70–80 characters for readability

---

## 5. Spacing & Layout

### Grid

- Container max-width: `1280px`
- Gutters: `24px` (mobile), `32px` (tablet), `40px` (desktop)
- Columns: 4 (mobile), 8 (tablet), 12 (desktop)

### Spacing Scale (base unit: 8px)

```
4px   — xs
8px   — sm
16px  — md
24px  — lg
32px  — xl
48px  — 2xl
64px  — 3xl
96px  — 4xl
```

Use multiples of 8 for all margin, padding, and gap values.

---

## 6. Components

### Buttons

```css
/* Primary */
background: #E60000;
color: #FFFFFF;
border-radius: 4px; /* or pill shape — verify against live */
padding: 12px 24px;
font-weight: 700;
font-size: 16px;

/* Secondary / Ghost */
background: transparent;
border: 2px solid #E60000;
color: #E60000;
```

- Minimum touch target: 44x44px
- Button text: sentence case
- Hover state: darken by ~10%
- Focus state: visible outline for accessibility (never `outline: none` without a replacement)

### Navigation

- Top nav: horizontal, sticky on scroll
- Mobile: hamburger menu
- Active state: underline or colour highlight
- Nav items: About, News & Media, Our Impact, Our Network, Careers

### Cards

- Background: `#FFFFFF` or `#F4F4F4`
- Border radius: `8px`
- Box shadow: subtle (`0 2px 8px rgba(0,0,0,0.08)`)
- Hover: slight lift (`translateY(-2px)`) or shadow increase
- Always include: heading, short description, CTA link

### Stats / Metrics Callouts

The site leans heavily on big numbers for impact. Use these patterns:

```
Large number: 64–80px, bold, brand colour
Label below: 16–18px, normal weight, dark grey
```

Examples from the site:
- "28.6 million" customers
- "£11 billion" investment
- "99%" 5G coverage by 2030
- "16,500 sq km" of not-spots removed

---

## 7. Imagery & Icons

### Photography style

- Real people, real places. Diverse, UK-specific.
- Urban and rural balance (reflects "every community" mission)
- Avoid generic stock photo aesthetic
- Warm, optimistic lighting

### Icons

- Use outline-style icons consistently
- Minimum size: 24x24px
- Colour: match surrounding text or brand red for emphasis

### Illustrations / Graphics

- Network visualisations: clean, geometric, tech-forward
- Maps: UK-shaped coverage maps work well for the network story

---

## 8. Accessibility

- Colour contrast: minimum **4.5:1** for normal text, **3:1** for large text (WCAG AA)
- All images: descriptive `alt` text
- Interactive elements: keyboard navigable, visible focus states
- Skip to main content link: present (already implemented on the live site)
- Semantic HTML: use correct heading hierarchy (H1 > H2 > H3)

---

## 9. Content Structure Patterns

### Hero Section
```
H1: Bold mission statement (short)
Subheading: Elaboration (1–2 sentences)
Optional CTA button
```

### Stat / Milestone Section
```
Big number or timeframe
Short punchy description (1–2 sentences)
Repeat in a 2–4 column grid
```

### Executive Quote
```
Blockquote: Long-form quote, white text on dark bg
Attribution: Name + Title, smaller text
```

### News Cards
```
Headline (H3)
Short excerpt (2–3 sentences)
"Read more" link
```

---

## 10. Writing Guidelines

### Numbers & Stats

- Always use numerals for stats: "28.6 million", not "twenty-eight point six million"
- Currency: "£11 billion" (use bn for repeat mentions in the same section: "£11bn")
- Percentages: "99%" not "ninety-nine percent"
- Dates: "9 February 2026" (day month year, no ordinals in body copy)

### Links

- Link text should be descriptive: "Read about our network goals" not "click here"
- External links: open in new tab with `rel="noopener noreferrer"`

### Page titles (SEO)

Pattern: `[Page topic] | VodafoneThree`

Example: `Building the UK's Best Network | VodafoneThree`

---

## 11. Legal & Footer

Always include at the bottom of pages:

- Vodafone Limited registration details (England & Wales, No. 01471587)
- Hutchison 3G UK Limited registration details (England & Wales, No. 3885486)
- FCA authorisation references for both entities
- Copyright line: `© [Year] Vodafone Ltd | © [Year] Hutchison 3G UK Ltd`

---

## 12. Key Brand Messages (for copy reference)

| Theme | Core message |
|---|---|
| Investment | £11 billion commitment to UK connectivity |
| Coverage | 5G SA to 99% of population by 2030, 100% by 2034 |
| Speed | Up to 20% improvement in 4G speeds for Three/SMARTY customers |
| Customer benefit | Automatic roaming between Vodafone and Three networks, no extra cost |
| Inclusion | Rural and urban, vulnerable communities, everyone |
| Jobs | Best place to work, DEI commitment, apprenticeships |

---

*Last updated: February 2026. Verify specific hex values and font names against live CSS before finalising implementation.*
