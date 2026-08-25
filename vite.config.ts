/**
 * vite.config.ts
 *
 * Minimal Vite configuration for a TypeScript + Phaser game.
 *
 *  - Serves the project root (index.html) during development.
 *  - Pre-bundles Phaser so the dev server doesn't re-convert it on every
 *    request (Phaser ships as UMD/CJS and is otherwise slow to optimise).
 *  - Produces a self-contained production build under dist/ with relative
 *    asset paths, so the game can be deployed to any sub-path or static host.
 */
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  /* ------------------------------------------------------------------ */
  /*  Project root & asset base                                          */
  /* ------------------------------------------------------------------ */

  // Explicitly anchor the project root to this file's directory so the
  // config works regardless of the current working directory.
  root: fileURLToPath(new URL('.', import.meta.url)),

  // Relative base so built asset URLs work when the game is served from
  // a sub-directory (e.g. a GitHub Pages repo path) or opened via file://.
  base: './',

  /* ------------------------------------------------------------------ */
  /*  Module resolution                                                  */
  /* ------------------------------------------------------------------ */

  resolve: {
    alias: {
      // `@` → ./src  (e.g.  import { GameState } from '@/game/GameState')
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Dependency pre-bundling (dev server)                               */
  /* ------------------------------------------------------------------ */

  optimizeDeps: {
    // Phaser is a large UMD bundle; listing it here forces Vite to
    // pre-bundle it once at server start instead of lazily on first import,
    // which noticeably speeds up initial page loads and HMR.
    include: ['phaser'],
  },

  /* ------------------------------------------------------------------ */
  /*  Development server                                                 */
  /* ------------------------------------------------------------------ */

  server: {
    port: 3000,
    // Fall back to the next free port if 3000 is already in use.
    strictPort: false,
    // Open the browser automatically when the server starts.
    open: true,
    // Listen on 0.0.0.0 so the game is reachable from other devices on
    // the local network (handy for testing on a phone or tablet).
    host: true,
  },

  /* ------------------------------------------------------------------ */
  /*  Production build                                                   */
  /* ------------------------------------------------------------------ */

  build: {
    outDir: 'dist',
    // ES2020 covers all evergreen browsers and keeps the output readable.
    target: 'es2020',
    sourcemap: true,
    // Phaser alone is ~1.2 MB minified; raise the threshold so the build
    // log isn't flooded with chunk-size warnings for a single-bundle game.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      // Everything (including Phaser) is bundled – no externals.
      external: [],
      output: {
        // Stable, predictable file layout inside dist/assets/.
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /*  Preview server (vite preview)                                      */
  /* ------------------------------------------------------------------ */

  preview: {
    port: 4173,
    open: true,
  },
});