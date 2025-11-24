import { defineConfig } from 'unocss';

import presetIcons from '@unocss/preset-icons';
import presetWind4 from '@unocss/preset-wind4';
import { presetFluidSizing } from 'unocss-preset-fluid-sizing';
import { presetGrid } from 'unocss-preset-grid';

export default defineConfig({
	presets: [presetWind4(), presetIcons(), presetFluidSizing(), presetGrid()]
});
