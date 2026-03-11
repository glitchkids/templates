import path from "node:path";

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import UnoCSS from "unocss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), svelte(), viteSingleFile()],
  resolve: {
    alias: {
      "@features": path.resolve(__dirname, "src/lib/features"),
      "@app": path.resolve(__dirname, "src/lib/app"),
      "@shared": path.resolve(__dirname, "src/lib/shared"),
    },
  },
});
