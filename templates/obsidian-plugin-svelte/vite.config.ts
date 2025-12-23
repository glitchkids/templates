import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnoCSS from 'unocss/vite';
import path from 'node:path';

export default defineConfig({
	plugins: [svelte(), UnoCSS()],
	build: {
		lib: {
			entry: 'src/main.ts',
			formats: ['cjs'],
			fileName: 'main.js'
		},

		outDir: 'dist',
		rollupOptions: {
			input: {
				main: path.resolve(process.cwd(), 'src/main.ts')
			},
			output: {
				entryFileNames: 'main.js',
				assetFileNames: 'styles.css'
			},
			external: ['obsidian']
		}
	}
});
