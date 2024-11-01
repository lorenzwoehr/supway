import { BROWSER_SMALLER, SCALING_OPTIONS } from "./constants";

export const calculateSize = (parentSize: number, scaling: string): number => {
  switch (scaling) {
    case "subtle":
      return 5 + parentSize * 0.4;
    case "moderate":
      return 4 + parentSize * 0.5;
    case "minimum":
      return 3 + parentSize * 0.6;
    case "linear":
      return parentSize * 0.8;
    default:
      return parentSize * 0.8;
  }
};

export const calculateTopPosition = (
  position: number,
  scaling: string
): string => {
  const option = SCALING_OPTIONS[scaling];
  if (scaling === "linear") {
    return `${position}em`;
  }

  const scalingFactor = BROWSER_SMALLER * position * option.multiplier;
  const emValue = Math.round(scalingFactor * 100) / 100;
  const pxValue = Math.round(scalingFactor * option.offset * 100) / 100;

  // Determine if we need to add or subtract the px value
  const operator = pxValue >= 0 ? "-" : "+";
  const absolutePxValue = Math.abs(pxValue);

  return `calc(${emValue}em ${operator} ${absolutePxValue}px)`;
};
