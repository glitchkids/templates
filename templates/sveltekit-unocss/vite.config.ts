import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import UnoCSS from 'unocss/vite';

export default defineConfig({
	plugins: [UnoCSS(), sveltekit(), devtoolsJson()]
});
