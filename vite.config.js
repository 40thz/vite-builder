import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const glob = require('glob')


export default defineConfig(({ mode }) => {
    const entryPoints = './services/resources/assets/js/**/*.js'
    const buildDir = 'services/public/js';

    // Функция для получения точек входа
    const getInputs = () => {
      const files = glob.sync(entryPoints);
      const entries = {};

      files.forEach((file) => {
        const filePath = file.replace('.js', '');
        const filePathParts = filePath.split('\\')
        const fileName = filePathParts[filePathParts.length - 1] 
   
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
            dir: buildDir,
            entryFileNames: '[name].js',
            assetFileNames: undefined,
            manualChunks: undefined,
          },
          
        }
      }
    };
  });