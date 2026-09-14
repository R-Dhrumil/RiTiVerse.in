import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures static relative paths for GitHub Pages deployment
  define: {
    // Compatibility shim for process.env in client-side code if referenced
    'process.env': {}
  }
});
