import {
	defineConfig,
	presetIcons,
	presetWind4,
	presetWebFonts,
	transformerDirectives,
	type Preset
} from 'unocss';

export default defineConfig({
	theme: {
		colors: {
			'primary-black': 'hsl(0, 0%, 11%)',
			'primary-white': 'hsl(0, 0%, 89%)'
		}
	},
	presets: [
		presetWebFonts({
			provider: 'bunny',
			fonts: {
				Poppins: {
					name: 'Poppins'
				}
			}
		}),
		presetWind4(),
		presetIcons(),
		presetGlitchKidsFluid({})
	],
	transformers: [transformerDirectives()],
	preflights: [
		{
			getCSS: () => {
				return `		
			* {
				font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			}

			body {
				@apply bg-black text-primary-white;
			}

			.no-scrollbar::-webkit-scrollbar {
				display: none;
			}

			.no-scrollbar {
				-ms-overflow-style: none;  
				scrollbar-width: none;  
			}
		`;
			}
		}
	]
});

function presetGlitchKidsFluid({
	minWidth = 320,
	maxWidth = 1920,
	minHeight = 275,
	maxHeight = 720
}) {
	const properties = {
		rounded: 'border-radius',
		w: 'width',
		h: 'height',
		'min-w': 'min-width',
		'min-h': 'min-height',
		'max-w': 'max-width',
		'max-h': 'max-height',
		p: 'padding',
		pt: 'padding-top',
		pr: 'padding-right',
		pb: 'padding-bottom',
		pl: 'padding-left',
		px: ['padding-left', 'padding-right'],
		py: ['padding-top', 'padding-bottom'],
		m: 'margin',
		mt: 'margin-top',
		mr: 'margin-right',
		mb: 'margin-bottom',
		ml: 'margin-left',
		mx: ['margin-left', 'margin-right'],
		my: ['margin-top', 'margin-bottom'],
		gap: 'gap',
		'column-gap': 'column-gap',
		'row-gap': 'row-gap',
		size: ['width', 'height'],
		top: 'top',
		right: 'right',
		bottom: 'bottom',
		left: 'left'
	};

	function fluidClampVW(minValue: number, maxValue: number) {
		const slope = (maxValue - minValue) / (maxWidth - minWidth);
		const slopeVW = slope * 100;
		const intercept = minValue - slope * minWidth;

		return `clamp(calc(${minValue} * 0.25rem), calc(${slopeVW}vw + ${intercept}px), calc(${maxValue} * 0.25rem))`;
	}

	function fluidClampHW(minValue: number, maxValue: number) {
		const slope = (maxValue - minValue) / (maxHeight - minHeight);
		const slopeVH = slope * 100;
		const intercept = minValue - slope * minHeight;

		return `clamp(calc(${minValue} * 0.25rem), calc(${slopeVH}vh + ${intercept}px), calc(${maxValue} * 0.25rem))`;
	}

	return {
		name: 'unocss-preset-glitchkids-fluid',
		rules: [
			[
				/^f-(.+)-(\d+)\/(\d+)$/,
				([_, property, minValue, maxValue]) => ({
					[properties[property]]: fluidClampVW(Number(minValue), Number(maxValue))
				})
			],
			[
				/^fv-(.+)-(\d+)\/(\d+)$/,
				([_, property, minValue, maxValue]) => ({
					[properties[property]]: fluidClampHW(Number(minValue), Number(maxValue))
				})
			]
		]
	} satisfies Preset;
}
