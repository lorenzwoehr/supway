"use client";

import React, { useState, useEffect } from "react";
// import FontMetrics from "fontmetrics";
// import { FONT_FAMILY } from "../utils/constants";
import { MetricsDisplay } from "../components/MetricsDisplay";
import { TextDisplay } from "../components/TextDisplay";
import { Controls } from "../components/Controls";
import ScalingChart from "../components/ScalingChart";
import { CSSDisplay } from "../components/CSSDisplay";
import { calculateSize } from "../utils/calculations";
import { FontMetricsType, SizeData } from "../types";
// import ScalingChartTest from "@/components/ScalingChartTest";

const ScalingDemo = () => {
  const [fontSize, setFontSize] = useState(84);
  const [metrics, setMetrics] = useState<FontMetricsType | null>(null);
  const [supPosition, setSupPosition] = useState(-0.4);
  const [subPosition, setSubPosition] = useState(0.25);
  const [selectedScaling, setSelectedScaling] = useState("moderate");

  useEffect(() => {
    /* const fontMetrics = FontMetrics({
      fontFamily: FONT_FAMILY,
      fontWeight: "normal",
      fontSize: 300,
      origin: "top",
    }); */

    const metricsDummy: FontMetricsType = {
      ascent: 0.265,
      baseline: 0.955,
      bottom: 1.2766666666666666,
      descent: 1.17,
      fontFamily: "Arial",
      fontSize: 300,
      fontWeight: "normal",
      tittle: 0.06,
      top: 0,
      xHeight: 0.515,
    };

    setMetrics(metricsDummy);
  }, []);

  /* Generate size data points up to 160px in 12px increments
  const sizes: SizeData[] = Array.from(
    { length: Math.ceil(160 / 12) },
    (_, i) => {
      const parentSize = (i + 1) * 12;
      return {
        parentSize,
        subtle: calculateSize(parentSize, "subtle"),
        moderate: calculateSize(parentSize, "moderate"),
        minimum: calculateSize(parentSize, "minimum"),
        linear: calculateSize(parentSize, "linear"),
      };
    }
  ); */

  const sizes: SizeData[] = Array.from(
    { length: 160 - 12 + 1 }, // Include both 12 and 160
    (_, i) => {
      const parentSize = 12 + i; // Start from 12px
      return {
        parentSize,
        subtle: calculateSize(parentSize, "subtle"),
        moderate: calculateSize(parentSize, "moderate"),
        minimum: calculateSize(parentSize, "minimum"),
        linear: calculateSize(parentSize, "linear"),
      };
    }
  );

  return (
    <main className="relative min-h-screen w-full">
      {/* Fixed left section */}
      <div className="fixed bg-zinc-50 left-0 top-0 bottom-0 right-0 h-[50vh] md:h-full md:right-[50%] lg:right-[30%] md:border-r md:border-zinc-200 flex items-center justify-center">
        <div className="w-full">
          <div className="relative flex items-center justify-center">
            {metrics && (
              <MetricsDisplay metrics={metrics} fontSize={fontSize} />
            )}
            <TextDisplay
              fontSize={fontSize}
              selectedScaling={selectedScaling}
              supPosition={supPosition}
              subPosition={subPosition}
            />
          </div>
        </div>
      </div>

      {/* Right section with controls */}
      <div
        className="relative ml-auto w-full md:w-[50%] lg:w-[30%] min-h-screen p-6 bg-white top-[50vh] md:top-0 z-10 shadow-xl
md:shadow-none"
      >
        <div className="space-y-6">
          <Controls
            fontSize={fontSize}
            setFontSize={setFontSize}
            supPosition={supPosition}
            setSupPosition={setSupPosition}
            subPosition={subPosition}
            setSubPosition={setSubPosition}
            selectedScaling={selectedScaling}
            setSelectedScaling={setSelectedScaling}
          />

          <ScalingChart
            sizes={sizes}
            selectedScaling={selectedScaling}
            currentFontSize={fontSize}
          />

          <CSSDisplay
            selectedScaling={selectedScaling}
            supPosition={supPosition}
            subPosition={subPosition}
          />
        </div>
      </div>
    </main>
  );
};

export default ScalingDemo;
