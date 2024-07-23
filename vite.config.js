import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: [{ find: '@/', replacement: `${__dirname}/resources/ts/` }],
  },
  plugins: [
    laravel({
      refresh: true,

      input: ['resources/css/app.css', 'resources/ts/Index.tsx'],
    }),
    react(),
  ],
});
