import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* `base` is '/' for local dev and for hosts that serve the site from a domain
 * root (Netlify, Vercel, Cloudflare Pages). GitHub Pages serves a project repo
 * from /<repo-name>/, so the deploy workflow sets BASE_PATH and every asset URL
 * and router path picks it up from there (see .github/workflows/deploy.yml and
 * `basename={import.meta.env.BASE_URL}` in App.jsx). */
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
});
