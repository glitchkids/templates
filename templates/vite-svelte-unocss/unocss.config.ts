import {
	defineConfig,
	presetTypography,
	transformerDirectives,
	presetWind4,
	presetIcons
} from 'unocss';

import { presetFluidSizing } from 'unocss-preset-fluid-sizing';
import { presetGrid } from 'unocss-preset-grid';

export default defineConfig({
	presets: [presetTypography(), presetWind4(), presetIcons(), presetFluidSizing(), presetGrid()],
	transformers: [transformerDirectives()]
});
