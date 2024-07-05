import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

const glob = require('glob')
const styles = require('rollup-plugin-styles')

export default defineConfig(({ mode }) => {
    const buildDir = mode === 'production' ? 'dist' : 'dev';
    console.log(styles)
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
        vue()
      ],
      build: {
        outDir: buildDir,
        rollupOptions: {
          input: getInputs(),
          output: {
            dir: `${buildDir}/`,
            entryFileNames: '[name].js',
            assetFileNames: 'assets/[name].[ext]',
          },
        }
      }
    };
  });