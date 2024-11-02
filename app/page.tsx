"use client";

import React, { useState, useEffect } from "react";
import { MetricsDisplay } from "../components/MetricsDisplay";
import { TextDisplay } from "../components/TextDisplay";
import { Controls } from "../components/Controls";
import ScalingChart from "../components/ScalingChart";
import { PreviewControls } from "@/components/PreviewControls";
import { CSSDisplay } from "../components/CSSDisplay";
import { calculateSize } from "../utils/calculations";
import { FontMetricsType, SizeData } from "../types";
import { FONT_FAMILY } from "@/utils/constants";

const ScalingDemo = () => {
  const [fontSize, setFontSize] = useState(84);
  const [metrics, setMetrics] = useState<FontMetricsType | null>(null);
  const [supPosition, setSupPosition] = useState(-0.5);
  const [subPosition, setSubPosition] = useState(0.25);
  const [selectedScaling, setSelectedScaling] = useState("fluidDefault");

  useEffect(() => {
    const metrics: FontMetricsType = {
      ascent: 0.27,
      baseline: 0.955,
      bottom: 1.2766666666666666,
      descent: 1.17,
      fontFamily: FONT_FAMILY,
      fontSize: 300,
      fontWeight: "normal",
      tittle: 0.06,
      top: 0,
      xHeight: 0.515,
    };

    setMetrics(metrics);
  }, []);

  const sizes: SizeData[] = Array.from(
    { length: 168 - 12 + 1 }, // Include both 12 and 160
    (_, i) => {
      const parentSize = 12 + i; // Start from 12px
      return {
        parentSize,
        fluidSmaller: calculateSize(parentSize, "fluidSmaller"),
        fluidDefault: calculateSize(parentSize, "fluidDefault"),
        fluidLarger: calculateSize(parentSize, "fluidLarger"),
        staticDefault: calculateSize(parentSize, "staticDefault"),
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
        <p className="absolute bottom-8 text-balance text-center text-xs md:text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <a
            href="https://lorenzwoehr.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Lorenz Wöhr
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/lorenzwoehr/supway"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      {/* Right section with controls */}
      <div
        className="relative ml-auto w-full md:w-[50%] lg:w-[30%] min-h-screen p-6 bg-white top-[50vh] md:top-0 -mt-6 md:mt-0 z-10 border-t border-zinc-200 shadow-[0_-4px_12px_-3px_rgba(0,0,0,0.05)] rounded-t-xl md:border-none md:shadow-none md:rounded-none
md:shadow-none"
      >
        <div className="flex flex-col gap-12">
          <PreviewControls
            fontSize={fontSize}
            setFontSize={setFontSize}
          ></PreviewControls>
          <ScalingChart
            sizes={sizes}
            selectedScaling={selectedScaling}
            currentFontSize={fontSize}
          />

          <Controls
            supPosition={supPosition}
            setSupPosition={setSupPosition}
            subPosition={subPosition}
            setSubPosition={setSubPosition}
            selectedScaling={selectedScaling}
            setSelectedScaling={setSelectedScaling}
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
