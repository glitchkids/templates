import type { Preset } from "unocss";

// PresetGlitchKidsMasterFluid v1.0.0-beta.1

export function presetGlitchKidsMasterFluid({
  minWidth = 320,
  maxWidth = 1920,
  minHeight = 275,
  maxHeight = 720,
}) {
  const properties = {
    rounded: ["border-radius"],
    w: ["width"],
    h: ["height"],
    size: ["width", "height"],
    "min-w": ["min-width"],
    "min-h": ["min-height"],
    "max-w": ["max-width"],
    "max-h": ["max-height"],
    p: ["padding"],
    pt: ["padding-top"],
    pr: ["padding-right"],
    pb: ["padding-bottom"],
    pl: ["padding-left"],
    px: ["padding-left", "padding-right"],
    py: ["padding-top", "padding-bottom"],
    m: ["margin"],
    mt: ["margin-top"],
    mr: ["margin-right"],
    mb: ["margin-bottom"],
    ml: ["margin-left"],
    mx: ["margin-left", "margin-right"],
    my: ["margin-top", "margin-bottom"],
    gap: ["gap"],
    "column-gap": ["column-gap"],
    "row-gap": ["row-gap"],
    top: ["top"],
    right: ["right"],
    bottom: ["bottom"],
    left: ["left"],
    text: ["font-size"],
    leading: ["line-height"],
  };
  function toNormalizedValuePixels(value: number) {
    return value * 4;
  }

  function fluidClamp(
    minValue: number,
    maxValue: number,
    min: number,
    max: number,
  ) {
    const slope = toNormalizedValuePixels(maxValue - minValue) / (max - min);
    const slopeValue = slope * 100;
    const intercept = toNormalizedValuePixels(minValue) - slope * min;
    return `clamp(calc(${minValue} * 0.25rem), calc(${slopeValue}vw + ${intercept}px), calc(${maxValue} * 0.25rem))`;
  }
  function returnResult(property: keyof typeof properties, value: string) {
    if (!(property in properties)) return {};
    return properties[property].map((property) => [property, value]);
  }

  return {
    name: "unocss-preset-glitchkids-fluid",
    autocomplete: {
      templates: ["f-<property>-<num>/<num>"],
      shorthands: {
        property: Object.keys(properties),
      },
    },
    rules: [
      [
        /^f-(.+)-(\d+(\.\d+)?)\/(\d+(\.\d+)?)$/,
        ([_, property, minValue, __, maxValue]) => {
          const value = fluidClamp(
            Number(minValue),
            Number(maxValue),
            minWidth,
            maxWidth,
          );
          return returnResult(property as keyof typeof properties, value);
        },
      ],
      [
        /^fv-(.+)-(\d+)\/(\d+)$/,
        ([_, property, minValue, maxValue]) => {
          const value = fluidClamp(
            Number(minValue),
            Number(maxValue),
            minHeight,
            maxHeight,
          );
          return returnResult(property as keyof typeof properties, value);
        },
      ],
    ],
  } satisfies Preset;
}
