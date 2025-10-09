import path from "node:path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@view": path.resolve(__dirname, "src/lib/view"),
      "@core": path.resolve(__dirname, "src/lib/core"),
    },
  },
});
