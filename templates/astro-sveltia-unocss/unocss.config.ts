import {
  defineConfig,
  presetIcons,
  presetWind4,
  presetWebFonts,
  transformerDirectives,
  type Preset,
} from "unocss";

function presetGlitchKidsMasterGrid({
  paddingX = 1.5,
  maxContainerWidth = 80,
}) {
  return {
    name: "unocss-preset-glitchkids-master-grid",
    rules: [
      [
        /master-grid-(\d+)/,
        ([_, colNumber], { variantHandlers, variantMatch, variants }) => {
          console.log(colNumber);
          return {
            display: "grid",
            "grid-template-columns": `
              minmax(${paddingX}rem, 1fr) 
              repeat(${colNumber}, minmax(0, calc(${maxContainerWidth}rem / ${colNumber}))) 
              minmax(${paddingX}rem, 1fr)`,
          };
        },
      ],
      [
        "master-grid-container",
        {
          display: "grid",
          "grid-template-columns": "subgrid",
          "grid-column": "1 / -1",
        },
      ],
      [
        "master-grid-subgrid-container",
        {
          display: "grid",
          "grid-template-columns": "subgrid",
          "grid-column": "1 / -1",
        },
      ],
      [
        "master-grid-subgrid",
        {
          display: "grid",
          "grid-template-columns": "subgrid",
          "grid-column": "2 / -2",
          "column-gap": "24px",
        },
      ],
      [
        "master-grid-container-full",
        {
          "grid-column": "2 / -2",
        },
      ],
    ],
  } satisfies Preset;
}

export default defineConfig({
  theme: {
    colors: {
      "primary-black": "hsl(0, 0%, 11%)",
      "primary-white": "hsl(0, 0%, 89%)",
    },
  },
  presets: [
    presetWebFonts({
      provider: "bunny",
      fonts: {
        Poppins: {
          name: "Poppins",
        },
      },
    }),
    presetWind4(),
    presetIcons(),
    presetGlitchKidsFluid({}),
    presetGlitchKidsMasterGrid({}),
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
      },
    },
  ],
});
