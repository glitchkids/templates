import {
  defineConfig,
  presetIcons,
  presetWind4,
  presetWebFonts,
  transformerDirectives,
} from "unocss";

import { presetGlitchKidsMasterFluid } from "./.unocss/master-fluid-preset";
import { presetGlitchKidsMasterGrid } from "./.unocss/master-grid-presets";

export default defineConfig({
  theme: {
    colors: {
      primary: {
        black: "hsl(0, 0%, 11%)",
        white: "hsl(0, 0%, 89%)",
      },
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
    presetGlitchKidsMasterFluid({}),
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
