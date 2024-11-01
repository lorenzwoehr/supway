export const FONT_FAMILY = "Times New Roman";

export const BROWSER_SMALLER = 0.83;

export interface ScalingOption {
  title: string;
  fontSizeFormula: string;
  originalFormula: string;
  dynamicValue: number;
  multiplier: number;
  offset: number;
}

export type ScalingOptions = {
  [key: string]: ScalingOption;
};

export const SCALING_OPTIONS: ScalingOptions = {
  linear: {
    title: "Static",
    fontSizeFormula: "smaller",
    originalFormula: "smaller",
    dynamicValue: 1,
    multiplier: 1,
    offset: 0,
  },
  minimum: {
    title: "Larger",
    fontSizeFormula: "calc(1.66667 * (1em - 3px))",
    originalFormula: "calc(0.6em + 3px)",
    dynamicValue: 0.6,
    multiplier: 1.66667,
    offset: 3,
  },
  moderate: {
    title: "Default",
    fontSizeFormula: "calc(2 * (1em - 4px))",
    originalFormula: "calc(0.5em + 4px)",
    dynamicValue: 0.5,
    multiplier: 2,
    offset: 4,
  },
  subtle: {
    title: "Smaller",
    fontSizeFormula: "calc(2.5 * (1em - 5px))",
    originalFormula: "calc(0.4em + 5px)",
    dynamicValue: 0.4,
    multiplier: 2.5,
    offset: 5,
  },
};
