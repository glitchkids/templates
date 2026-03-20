import type { Preset } from "unocss";

import { presetGlitchKidsMasterFluid } from "./master-fluid-preset";
import { presetGlitchKidsMasterGrid } from "./master-grid-presets";

export function UnoGlitchKidsPreset(): Preset {
  return {
    name: "uno-glitchkids-preset",
    presets: [presetGlitchKidsMasterFluid({}), presetGlitchKidsMasterGrid({})],
    preflights: [
      {
        getCSS: () => `
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
            `,
      },
    ],
  };
}
