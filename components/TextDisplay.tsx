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
    style={{
      fontSize: `${fontSize}px`,
      fontFamily: FONT_FAMILY,
      lineHeight: 1.2,
      position: "relative",
      fontWeight: "normal",
    }}
  >
    Hlop
    <sup
      style={{
        fontSize: SCALING_OPTIONS[selectedScaling].originalFormula,
        position: "relative",
        verticalAlign: "baseline",
        top: calculateTopPosition(supPosition, selectedScaling),
        fontFamily: FONT_FAMILY,
      }}
    >
      2
    </sup>{" "}
    and
    <sub
      style={{
        fontSize: SCALING_OPTIONS[selectedScaling].originalFormula,
        position: "relative",
        verticalAlign: "baseline",
        top: calculateTopPosition(subPosition, selectedScaling),
        fontFamily: FONT_FAMILY,
      }}
    >
      2
    </sub>{" "}
  </div>
);
