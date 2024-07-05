import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const glob = require('glob')


export default defineConfig(({ mode }) => {
    const buildDir = mode === 'production' ? 'dist' : 'dev';

    // Функция для получения точек входа
    const getInputs = () => {
      const files = glob.sync('./src/**/*.js');
      const entries = {};

      files.forEach((file) => {
        const fileName = file.replace('.js', '');
        entries[fileName] = resolve(__dirname, file);
      });

      return entries;
    };
  
    return {
      plugins: [
        vue(),
        cssInjectedByJsPlugin()
      ],
      build: {
        outDir: buildDir,
        rollupOptions: {
          input: getInputs(),
          output: {
            dir: `${buildDir}/`,
            entryFileNames: '[name].js',
            assetFileNames: 'assets/[name].[ext]',
            manualChunks: undefined,
          },
          
        }
      }
    };
  });