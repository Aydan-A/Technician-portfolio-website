# Project notes for Claude

Coffee-machine technician portfolio — React 19 + Vite + Tailwind, single-page app
with a blog ("The Workshop Dispatch") under `/journal`.

## Blog posts — read the style guide first

**Before adding or editing any blog post/dispatch, read
[`BLOG_STYLE_GUIDE.md`](BLOG_STYLE_GUIDE.md) and apply every convention in it
automatically** (heading numbering via CSS counters, `#`→`<h2>` mapping, 68ch body
measure, image/cover treatment, post schema in `src/data/posts.js`, etc.).
Do not re-derive these conventions or ask the user to restate them.

**"Integrate this blog post" from a Word (`.docx`) file** is a fixed procedure —
follow the **Blog Post Conversion Pipeline (§10)** in `BLOG_STYLE_GUIDE.md`
automatically: pandoc converts (never hand-retype), verify no content was lost
with an actual `wc -w` + `diff` comparison and report it, apply the guide's
formatting, add **no images** unless explicitly instructed per-image, and show
the rendered result before considering it integrated.

## Project layout

```
src/
  App.jsx                routes (every route but Home is lazy-loaded)
  main.jsx               entry
  index.css              nothing but @imports — keep the order
  styles/                tailwind.css, tokens.css, base.css, then one file per
                         area (nav, buttons, hero, journal, article, contact…)
  components/
    layout/   Layout, Navbar, Footer
    ui/       Button, SectionLabel, VerdictStamp, SkeletonBadge, BrandMarquee
    home/ journal/ contact/ projects/   feature components
  pages/                 one file per route
  data/                  posts, projects, brands, servicePlans, timeline
  content/blog|projects|skeleton/   markdown only
  assets/images/blog|home|logos|projects|skeleton|icons/
attic/                   quarantined dead files, safe to delete (gitignored)
```

## Design system — use the tokens

The whole site is the homepage hero's palette: graphite field (`--color-page`),
charcoal dock (`--color-surface`), amber accent. **Never hard-code a hex or a
Tailwind palette colour (`slate-*`, `zinc-*`, `amber-*`) in a component** — add
or use a token in [`src/styles/tokens.css`](src/styles/tokens.css) and the
matching Tailwind alias in `tailwind.config.js`.

**Amber is rationed.** It is allowed on: the primary button, the selected
option in a control group, the hero stat strip, transient focus/hover states,
and the article's numbered headings + quote rules. Everything else — the logo
mark, nav, theme toggle, eyebrows, micro-labels, bullets, card numbers, icon
tiles — is `ink` / `graphite` / `muted`. The full rule lives at the top of
`tokens.css`; if you are reaching for amber for a sixth reason, reach for
`muted` instead.

- Buttons always go through `components/ui/Button.jsx`
  (`primary` · `secondary` · `quiet` · `onAmber`). Don't hand-roll one.
- Type is **two families, no more**: `font-sans` (DM Sans) for everything you
  read — headlines via the `.headline` / `.headline-sm` utilities (800, tight,
  sentence case), titles, body — and `font-mono` (DM Mono) for everything you
  scan: labels, specs, figures (`.figure-value`), buttons, nav. Bebas is gone;
  `.wordmark` is the only place caps survive. **No mono above `font-medium`** —
  DM Mono has no bolder cut and `font-synthesis: none` is set, so `font-bold`
  silently does nothing.
- Geometry is pill-first, on a four-step scale in `tokens.css`:
  `--radius-pill` (buttons, chips, inputs, toggles) · `--radius-card` (cards,
  form shell, modals) · `--radius-md` (covers, plates, media tiles) ·
  `--radius-sm` (the smallest chips). They match Tailwind's `rounded-full` /
  `2xl` / `xl` / `lg`, so use those in markup.

## Running / previewing

- Dev server: `npm run dev` (Vite; may use port 5173/5174).
- Screenshot a page headless with Chrome:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,3200 --screenshot=out.png --virtual-time-budget=6000 http://localhost:<port>/journal/<slug>`
