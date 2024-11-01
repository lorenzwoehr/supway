import React from "react";
import { FONT_FAMILY, SCALING_OPTIONS } from "../utils/constants";
import { calculateTopPosition } from "../utils/calculations";

type TextDisplayProps = {
  fontSize: number;
  selectedScaling: string;
  supPosition: number;
  subPosition: number;
};

export const TextDisplay: React.FC<TextDisplayProps> = ({
  fontSize,
  selectedScaling,
  supPosition,
  subPosition,
}) => (
  <div
    className="relative font-normal leading-tight px-20 text-zinc-900"
    style={{
      fontSize: `${fontSize}px`,
      fontFamily: FONT_FAMILY,
    }}
  >
    Hlop
    <sup
      className="relative align-baseline"
      style={{
        fontSize: SCALING_OPTIONS[selectedScaling].originalFormula,
        top: calculateTopPosition(supPosition, selectedScaling),
        fontFamily: FONT_FAMILY,
      }}
    >
      2
    </sup>{" "}
    x
    <sub
      className="relative align-baseline"
      style={{
        fontSize: SCALING_OPTIONS[selectedScaling].originalFormula,
        top: calculateTopPosition(subPosition, selectedScaling),
        fontFamily: FONT_FAMILY,
      }}
    >
      2
    </sub>
  </div>
);
