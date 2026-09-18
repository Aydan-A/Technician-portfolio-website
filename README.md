# Technician-portfolio-website
# Coffee Bench Tech — Portfolio Website

A professional portfolio website for a coffee machine technician with an engineering background.

This website is designed to present diagnostic work, repair process, machine knowledge, case studies, and educational writing in a portfolio-style format. It is not meant to feel like a generic repair service website. The goal is to show technical thinking, hands-on experience, and trust through real work examples.

---

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve dist/ locally, exactly as a host would
```

Always check `npm run preview` before deploying: it is the only local mode that
serves the built bundle instead of the dev server.

---

## Deploying

This is a static single-page app: `npm run build` produces `dist/`, which any
static host can serve. The one requirement is a **SPA fallback** — routes like
`/journal/pressurestat` exist only in the browser, so the host must answer
unknown paths with `index.html` (otherwise clicking around works but a refresh
or a shared link 404s). That rule is already committed:

- `public/_redirects` — read by **Netlify** and **Cloudflare Pages**
- `vercel.json` — the same rule plus asset caching for **Vercel**
- `netlify.toml` — pins the Netlify build command, publish dir and Node version

### Option A — Netlify (recommended, simplest)

1. Push this repo to GitHub.
2. netlify.com → *Add new site* → *Import an existing project* → pick the repo.
3. Build command `npm run build`, publish directory `dist` (both are already in
   `netlify.toml`, so the form should prefill).
4. Deploy. Every push to `main` redeploys; pull requests get preview URLs.
5. *Domain management* → add a custom domain and point your DNS at Netlify.
   HTTPS is issued automatically.

### Option B — Vercel

1. Push to GitHub.
2. vercel.com → *Add New…* → *Project* → import the repo. The framework preset
   detects Vite; `vercel.json` supplies the rewrite and cache headers.
3. Deploy, then *Settings → Domains* for a custom domain.

### Option C — Cloudflare Pages

1. Push to GitHub.
2. Cloudflare dashboard → *Workers & Pages* → *Create* → *Pages* → connect the repo.
3. Framework preset **Vite**, build command `npm run build`, output directory `dist`.
4. Deploy. `public/_redirects` handles the SPA fallback.

### Option D — any other static host (S3, nginx, Hostinger, cPanel…)

Run `npm run build` and upload the **contents of `dist/`** to the web root, then
add the fallback yourself:

- **nginx**: `location / { try_files $uri $uri/ /index.html; }`
- **Apache / cPanel** — `.htaccess` in the web root:
  ```apache
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

### Option E — GitHub Pages (configured in this repo)

`.github/workflows/deploy.yml` builds and publishes to Pages on every push to
`main`. Two details make a router-driven SPA work on Pages, and both are
handled by the workflow:

- **Base path.** A project repo is served from `https://<user>.github.io/<repo>/`,
  so the build runs with `BASE_PATH=/<repo>/`. `vite.config.js` reads it for
  asset URLs and `App.jsx` passes `import.meta.env.BASE_URL` to the router as
  its `basename`, so the same source also builds for a domain root.
- **Deep links.** Pages has no rewrite rules, so the workflow copies
  `index.html` to `404.html`. A direct hit on `/journal/<slug>` then loads the
  app with the URL intact and React Router renders the right page. The HTTP
  status is still 404, which is invisible to visitors but not ideal for search
  crawlers — Netlify or Vercel (options A/B) return a proper 200.

One-time setup: repo **Settings → Pages → Build and deployment → Source:
GitHub Actions**. After that every push to `main` redeploys.

### Before the first deploy

- **Optimise the images.** `dist/` is currently ~94 MB: individual blog PNGs run
  4–8 MB and `assets/images/home/hero.mp4` is 10.4 MB. Nothing will break, but
  first paint on mobile will be slow and you will burn host bandwidth. Target
  ≤250 KB per cover (WebP or quality-80 JPEG, ~1600px max edge) as
  `BLOG_STYLE_GUIDE.md` §6 already specifies, and re-encode the hero clip to
  roughly 2 MB.
- **Check the contact email.** The form and footer use
  `vaqif.aliyev.96@gmail.com`; the form opens the visitor's mail client rather
  than sending server-side, so there is no backend to configure.
- `dist/`, `node_modules/` and `attic/` are gitignored — deploy from source, and
  let the host run the build.

---

## Project Purpose

The purpose of this website is to build a strong personal brand for a coffee machine technician who repairs, rebuilds, tests, and fine-tunes espresso machines and grinders.

The website highlights:

- Technical repair experience
- Diagnostic thinking
- Espresso machine and grinder knowledge
- Case studies from real work
- Educational journal-style writing
- Engineering-based problem solving

---

## Website Style

The visual direction combines:

- Old paper texture
- Dark stone tones
- Mechanical details
- Espresso machine parts
- Technical portfolio layout
- Modern typography
- Subtle scroll animations

The website should feel premium, calm, practical, and trustworthy.

It should avoid looking like:

- A generic repair company website
- A basic service landing page
- A flashy startup website
- An overly playful coffee brand

---

## Main Sections

### 1. Home

The homepage introduces the portfolio and gives visitors a clear idea of the technician’s work.

Possible focus areas:

- Espresso machine diagnostics
- Grinder tuning and calibration
- Repair case studies
- Field notes and technical writing

The hero section should feel like a portfolio introduction, not a sales page.

---

### 2. About

The About section explains the background of the technician in a simple and genuine way.

It should include:

- Engineering background
- Coffee equipment repair experience
- Hands-on technical work
- Interest in understanding how machines work
- Practical approach to solving problems

---

### 3. Projects / Case Studies

This section shows selected repair and diagnostic work.

Each project can include:

- Machine or grinder type
- Reported issue
- Diagnostic steps
- What was found
- Repair or adjustment process
- Final result
- Lessons learned

Example case study structure:

```md
## Case Study Title

### Machine
Machine name or model

### Problem
Short explanation of the issue.

### Diagnosis
What was checked and tested.

### Repair Process
What was cleaned, repaired, replaced, or adjusted.

### Result
Final outcome after testing.

### Notes
Extra technical observations or learning points.
