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
      ascent: 0.24,
      baseline: 0.93,
      bottom: 1.2766666666666666,
      descent: 1.14,
      fontFamily: "Arial",
      fontSize: 300,
      fontWeight: "normal",
      tittle: 0.06,
      top: 0,
      xHeight: 0.48,
    };

    setMetrics(metricsDummy);
  }, []);

  // Generate size data points up to 160px in 12px increments
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
  );

  return (
    <main className="relative min-h-screen w-full">
      {/* Fixed left section */}
      <div className="fixed left-0 top-0 bottom-0 right-[480px] flex items-center justify-center">
        <div className="border rounded w-full">
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
      <div className="ml-auto w-[480px] min-h-screen p-6 border-l border-zinc-800 overflow-hidden">
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

          <ScalingChart sizes={sizes} selectedScaling={selectedScaling} />

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
