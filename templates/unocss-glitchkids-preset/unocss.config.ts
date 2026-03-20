import {
  defineConfig,
  presetIcons,
  presetWind4,
  presetWebFonts,
  transformerDirectives,
} from "unocss";

import { UnoGlitchKidsPreset } from "./.unocss";

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
    UnoGlitchKidsPreset(),
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
  ],
  transformers: [transformerDirectives()],
});
