# Blog Style Guide — The Workshop Dispatch

Conventions for every blog post ("dispatch") on this site. **Read this file
before adding or editing a post, and apply it without being re-asked.**

The blog is called *The Workshop Dispatch*. Each post is a numbered "dispatch"
with a verdict stamp, an index card (on `/journal`), and a full article page
(`/journal/:slug`).

---

## 1. How the system is wired

| Concern | Location |
|---|---|
| Post data / registry | [`src/data/posts.js`](src/data/posts.js) |
| Markdown bodies | [`src/content/blog/*.md`](src/content/blog/) |
| Post images | [`src/assets/images/blog/<post>/...`](src/assets/images/blog/) — one folder per post |
| Article page | [`src/pages/JournalArticlePage.jsx`](src/pages/JournalArticlePage.jsx) |
| Listing + cards | [`src/pages/JournalPage.jsx`](src/pages/JournalPage.jsx), [`src/components/journal/JournalDispatchCard.jsx`](src/components/journal/JournalDispatchCard.jsx) |
| Article styling | [`src/styles/article.css`](src/styles/article.css) (`dispatch-article-`) |
| Card styling | [`src/styles/journal.css`](src/styles/journal.css) (`dispatch-card-`, `verdict-stamp`) |
| Design tokens | [`src/styles/tokens.css`](src/styles/tokens.css) |

Markdown is converted to HTML by a small in-house transformer, `markdownToHtml`,
in `posts.js`. It is **not** full CommonMark — it supports only the subset
documented below. Do not assume tables, nested lists, links, or images-with-
titles work unless you extend the transformer.

---

## 2. Adding a new post — checklist

> **Source is a Word file?** Do **not** start here. Run the
> [Blog Post Conversion Pipeline](#10-blog-post-conversion-pipeline-word--post)
> (§10) first to produce a verified markdown draft, then return to this checklist.

1. **Write the markdown** in `src/content/blog/<slug>.md` using only the
   supported syntax (§3).
2. **Import it** at the top of `posts.js`: `import fooMd from '../content/blog/foo.md?raw';`
3. **Import each image** used in the body (Vite needs a static import), then
   build a filename→import map and pass it to `markdownToHtml`:
   ```js
   import fooCover from '../assets/images/blog/<post>/Cover.png';
   const fooImages = { 'Cover.png': fooCover };
   // ...
   body: markdownToHtml(fooMd, fooImages),
   ```
   Markdown image syntax references the **bare filename** (`![alt](Cover.png)`),
   which is looked up in that map. An image with no map entry is dropped silently.
4. **Add the post object** to the `posts` array (newest gets the highest
   `number`). Required fields:

   | Field | Notes |
   |---|---|
   | `id` | `'dispatch-00N'` |
   | `slug` | URL slug, kebab-case |
   | `number` | integer; sort key, drives the `№` and card ordering |
   | `date` | `'YYYY-MM-DD'` |
   | `subject` | short noun phrase (used in meta strip + nav) |
   | `title` | headline shown as the page `<h1>` |
   | `displayTitle` | optional; overrides `title` in the `<h1>` only |
   | `hook` | one sentence; the "Supporting headline" |
   | `verdict` | one of `WORTH_IT · OVERRATED · DEPENDS · SKIP · SLEEPER` |
   | `type` | one of `HOT_TAKE · DEEP_DIVE · TEARDOWN` |
   | `category` | free text (e.g. `Engineering`); feeds the filter chips |
   | `readMinutes` | integer |
   | `claim` | the italic subhead / blockquote under the title |
   | `receipt` | array of short strings (the "Receipts" grid) |
   | `bottomLine` | the inverted "Bottom line" takeaway box |
   | `cover` | **imported image** for the card (see §6); omit → textured placeholder |
   | `body` | `markdownToHtml(<md>, <imagesMap>)` |
   | `featured` | `true` on exactly one post → the hero "Latest dispatch" card |

5. **Supply a `cover` image** if you have one. Missing covers fall back to a
   textured placeholder automatically — that is acceptable but note it to the user.

---

## 3. Supported markdown → HTML

Blocks are separated by blank lines. The transformer handles:

| Markdown | Renders as | Use for |
|---|---|---|
| `# Heading` | `<h2>` | **Numbered top-level section** (see §4) |
| `## Heading` | `<h3>` | Subsection (no number, no rule) |
| `### Heading` | `<h4>` | Minor heading |
| `![alt](Filename.png)` | `<figure>` + `<img loading="lazy">` | Body image (§6) |
| `- item` lines | `<ul><li>` | Bullet list (every line in the block must start with `- `) |
| `**bold**`, `*italic*` | `<strong>`, `<em>` | Inline emphasis |
| anything else | `<p>` | Paragraph |

There is **no `#`-for-title**: the page `<h1>` comes from the `title` field.
Never open a body with `# <the post title>` — it duplicates the headline
(this was a real bug). The first `#` in the body is section **1**.

---

## 4. Heading style (the canonical rule)

This is the settled convention, implemented on `.dispatch-article-body h2/h3/h4`.

**Numbered sections (`#` → `<h2>`):**
- Font: `system-ui, 'DM Sans', sans-serif`, weight **800**,
  size `clamp(1.8rem, 1.3rem + 1.4vw, 2.7rem)`, line-height 1.08,
  letter-spacing −0.035em.
- **Full-width rule above** each section: `border-top: 2px solid var(--color-ink)`
  with `padding-top: 1.4rem` and `margin: 2.75rem 0 1rem`. The first `<h2>`
  has its top margin zeroed.
- **Numbering is automatic via CSS counters — never type numbers in markdown.**
  `.dispatch-article-body` sets `counter-reset: dispatch-section`; each `<h2>`
  does `counter-increment: dispatch-section` and prints
  `::before { content: counter(dispatch-section) ". " }` in **bronze**,
  `tabular-nums`. Reordering or inserting a section renumbers everything for free.
- Section headings are **not** capped to the reading measure — the rule spans
  the full column.

**Subsections (`##` → `<h3>`):** 1.35rem, weight 800, line-height 1.15,
letter-spacing −0.025em, margin `2rem 0 0.85rem`. No number, no rule.

**Minor headings (`###` → `<h4>`):** 1.1rem, weight 800, line-height 1.2,
margin `1.6rem 0 0.55rem`.

*Reference implementation: the solenoid-valves and rotary-vs-vibratory posts.*

---

## 5. Body typography & measure

- Body: `system-ui, 'DM Sans', sans-serif`, 18px, weight 430, line-height 1.7,
  color `var(--color-ink) / 0.92`.
- **Lede:** the first paragraph is auto-styled larger (19px, weight 600,
  line-height 1.65, full-strength ink). Write the opening paragraph knowing it
  is the lede.
- **Reading measure:** `p, ul, ol, blockquote, h3, h4` are capped at
  `max-width: 68ch` (~660–700px) so lines stay in the 50–75-character comfort
  zone. `<h2>` section headings and `<figure>` images intentionally break out
  to full column width.
- Blockquotes: bronze left border, italic. Lists: 0.65rem between items.

---

## 6. Image treatment

**Body images** (`.dispatch-article-image`): full column width, `object-fit:
contain` on a `var(--color-panel)` background, **2px ink border**, 0.75rem
radius, `loading="lazy"`. The alternating left/right classes are legacy/inert —
all body images render full-width. Keep the hard-rule look; don't add drop
shadows or rounded photo styling that breaks the technical-sketch aesthetic.

**Card covers** (`.dispatch-card-cover`): flush to the card edge (the card
clips them with `--radius-card`), with a hairline under them and a subtle
duotone so photos read as part of the system rather than stock imagery:
- `filter: grayscale(0.42) contrast(1.03) sepia(0.06)` (eases to grayscale 0.15
  + slight zoom on hover),
- a `rgb(var(--color-bronze) / 0.1)` `mix-blend-mode: multiply` wash on top.
- Aspect ratio: **16:10** in the grid; the featured variant puts the cover
  beside the text at full card height.
- Missing cover → a themed 45° hatch placeholder showing `№ 00N` + category
  (it follows the page tones, unlike a real cover, which sits on the light
  `--color-panel` plate).
- The verdict is chipped onto the cover's bottom-left corner, which is what
  keeps the card's text block to title + hook + one meta row.

**Optimization (do this for new covers):** source images are dense
sketches/photos — export them compressed (WebP or quality-80 JPEG) and sized to
~1400–1600px max edge; target <250KB. Give the featured/LCP cover `eager` /
`fetchpriority=high` and keep the rest lazy. *Status: done — every image over
300KB is WebP at quality 80 with the long edge capped at 1600px. Match that for
new covers; do not add multi-MB PNGs.*

---

## 7. Color & type tokens

Defined in `:root` / `[data-theme]` in [`src/styles/tokens.css`](src/styles/tokens.css).
Use the CSS variables, never raw hex, so both light and dark themes work:
`--color-page` (the hero's graphite field), `--color-surface` (the dock band),
`--color-shell` (cards), `--color-ink` (text), `--color-bronze` (the accent for
*type*; darkens on the light theme so it clears AA), `--color-amber` (solid
amber fills — constant in both themes), `--color-graphite` (secondary),
`--color-line` (hairline), `--color-panel` (image plate, constant light) with
`--on-panel` / `--on-amber` for type drawn on those constant surfaces.

**Amber is rationed site-wide** (see the rule at the top of `tokens.css`). On a
dispatch page it survives in exactly three places: the CSS-counter **section
numbers** on `<h2>`, the **left rule** on blockquotes and the subhead, and the
`OVERRATED` **verdict tone**. The meta-strip labels, sidebar labels, category
tag, prev/next direction and card index numbers are `--color-muted` /
`--color-graphite` — they used to be bronze, and eight amber labels per article
was too many. Card covers carry no amber wash any more either.

**Type is two families, one job each** — `var(--font-sans)` DM Sans for
everything you read (article title, headings at 800, body copy) and
`var(--font-mono)` DM Mono for everything you scan (the meta strip, tags,
receipts labels, nav). Fraunces and Bebas Neue are both gone. DM Mono ships no
weight above 500 and `font-synthesis: none` is set on `body`, so **never ask for
bold mono** — it silently does not render.

Geometry: pill-first. Use the radius tokens — `--radius-pill` for chips and
controls, `--radius-card` for cards, `--radius-md` for images and covers,
`--radius-sm` for the smallest chips.

---

## 8. Layout conventions (apply site-wide, not per-post)

- **Article layout:** two columns on ≥1024px — main body (with a 2px ink right
  rule) + a sticky sidebar holding the verdict stamp, supporting headline,
  receipts, and bottom line. Meta strip is a 4-up mono grid under the title.
- **Mobile (<1024px):** the sidebar stacks. *Current behavior:* it renders
  **after** the full body, which pushes the verdict + supporting headline to the
  bottom. **Preferred (decision pending):** reorder so the verdict stamp and
  supporting headline sit above the body on small screens. Don't regress this;
  finish it when touching mobile.

## 9. Known-pending items (not yet finalized in code)

Flag these to the user rather than silently assuming them:
- ~~**Font stack decision**~~ — **settled (2026-09)**: the article now uses
  `var(--font-sans)` = `'DM Sans', system-ui`, and `index.html` loads DM Sans at
  `400..800` plus an italic axis, so the 800-weight headings actually render.
- **Mobile source order** (§8) and **image optimization** (§6) are decided in
  principle but not fully implemented. On image weight specifically: the blog
  PNGs still run 4–8 MB each (`src/assets/images/blog/` is ~53 MB) — the single
  biggest performance item left on the site.

---

## 10. Blog Post Conversion Pipeline (Word → post)

**Standing procedure for every "integrate this blog post" request where the
source is a `.docx` (Word) file. Follow these steps in order, automatically,
without being reminded.** The governing principle: **pandoc extracts the
content, not you.** Never retype, summarize, paraphrase, or "clean up" the prose
by hand — doing so risks silently altering the author's words.

### Step 0 — Prerequisite: pandoc
The pipeline requires pandoc. Verify it first: `command -v pandoc`. If missing,
install it (`brew install pandoc`) — do not fall back to hand-conversion.

### Step 1 — Convert with pandoc
```sh
pandoc "input.docx" -o draft.md
```
Do not pass `--extract-media` / do not carry image references into the post
(see Step 4). This produces the raw markdown draft directly from the source.

### Step 2 — Verify nothing was lost (show the actual comparison)
Extract plain text from **both** the original docx and the converted draft, then
diff them. Use `--wrap=none` on both so line-wrapping differences don't create
false diffs:
```sh
pandoc "input.docx" -t plain --wrap=none -o original.txt   # source, syntax-free
pandoc draft.md      -t plain --wrap=none -o draft.txt      # draft, markdown stripped
wc -w original.txt draft.txt                                # word-count check
diff original.txt draft.txt                                 # word-for-word check
```
**Report the real result** — paste the `wc -w` counts and the `diff` output (or
"identical / 0 differences"). **Never just claim you "reviewed it."** If the
word counts differ or `diff` shows any content discrepancy (not mere whitespace/
punctuation-encoding noise like smart quotes), **stop and report it explicitly**
to the user before doing anything else. Do not proceed past a real discrepancy
without the user's go-ahead.

### Step 3 — Apply this guide's formatting conventions
Only after verification passes, format the verified draft per this guide:
- Map Word heading levels to the markdown hierarchy — Heading 1 → `#` (numbered
  top-level section, §4), Heading 2 → `##`, Heading 3 → `###`.
- **Strip any manual section numbers** Word carried in ("1.", "2.")—numbering is
  automatic via CSS counters (§4).
- Do **not** repeat the post title as a leading `#` (§3); the `title` field is
  the `<h1>`.
- Body measure, lede, lists, emphasis: as documented (§5, §3).
- This step reformats structure only. It must **not** change the words verified
  in Step 2.

### Step 4 — No automatic images
Do **not** add, extract, or place any images on your own — even if the source
docx contained them (drop pandoc's image references). Insert an image **only**
when the user gives an explicit instruction naming that specific image and its
location in that same request, and then follow §6.

### Step 5 — Show the rendered result before integrating
Wire the post in per §2, run the dev server, and show the user the rendered
article (headless-Chrome screenshot, or the running dev URL).
**The post is not "integrated" until the user has reviewed the rendered result.**
