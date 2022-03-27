import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import svgr from '@honkhonk/vite-plugin-svgr';
const react = require('@vitejs/plugin-react')
const dotenv = require('dotenv');
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePluginHtmlEnv(),
    svgr({
      svgrOptions: {
        icon: true,
        dimensions: false,
        // etc...
      },
    }),
  ],
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
