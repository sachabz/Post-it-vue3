import svgLoader from 'vite-svg-loader';
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from "path";
import { fileURLToPath, URL } from "url";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports: ["vue", "pinia", "vue-router", "@vueuse/core"],
    resolvers: [ElementPlusResolver()],
    dts: path.resolve(pathSrc, "auto-imports.d.ts"),
  }),
  Components({
    dts: path.resolve(pathSrc, "components.d.ts"),
    resolvers: [ElementPlusResolver({
      importStyle: "sass",
    })],
  }), svgLoader({
    svgo: false
  })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
