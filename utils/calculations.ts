import { BROWSER_SMALLER, SCALING_OPTIONS } from "./constants";

export const calculateSize = (parentSize: number, scaling: string): number => {
  switch (scaling) {
    case "fluidSmaller":
      return 5 + parentSize * 0.4;
    case "fluidDefault":
      return 4 + parentSize * 0.5;
    case "fluidLarger":
      return 3 + parentSize * 0.6;
    case "statucDefault":
      return parentSize * BROWSER_SMALLER;
    default:
      return parentSize * BROWSER_SMALLER;
  }
};

export const calculateTopPosition = (
  position: number,
  scaling: string
): string => {
  const option = SCALING_OPTIONS[scaling];
  if (scaling === "staticDefault") {
    console.log("static position");
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
