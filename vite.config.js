import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* `base` is '/' for local dev and for the hosts that serve the site from a
 * domain root (Netlify — what we deploy to — plus Vercel and Cloudflare Pages).
 * BASE_PATH stays as an override for a host that serves from a subdirectory
 * instead; App.jsx picks it up via `basename={import.meta.env.BASE_URL}`. */
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
});
