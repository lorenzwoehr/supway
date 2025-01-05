"use client";

import React, { useState, useEffect } from "react";
import { MetricsDisplay } from "../components/metrics-display";
import { TextDisplay } from "../components/text-display";
import ScalingChart from "../components/scaling-chart";
import { PreviewControls } from "../components/preview-controls";
import { CSSDisplay } from "../components/css-display";
import { calculateSize } from "../utils/calculations";
import { FontMetricsType, SizeData } from "../types";
import { FONT_FAMILY } from "@/utils/constants";
import { Controls } from "../components/text-controls";
import { ModeToggle } from "@/components/ui/mode-toggle";

const ScalingDemo = () => {
  const [fontSize, setFontSize] = useState(84);
  const [metrics, setMetrics] = useState<FontMetricsType | null>(null);
  const [supPosition, setSupPosition] = useState(-0.5);
  const [subPosition, setSubPosition] = useState(0.25);
  const [selectedScaling, setSelectedScaling] = useState("fluidDefault");

  useEffect(() => {
    const metrics: FontMetricsType = {
      ascent: 0.265,
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
      <div className="fixed bg-muted left-0 top-0 bottom-0 right-0 h-[50vh] md:h-full md:right-[50%] lg:right-[30%] md:border-r flex items-center justify-center">
        <div className="absolute top-4 left-4">
          <ModeToggle />
        </div>
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
        <p className="font-sans absolute bottom-8 text-balance text-center text-xs md:text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <a
            href="https://lorenzwoehr.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Lorenz Woehr
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
        className="relative ml-auto w-full md:w-[50%] lg:w-[30%] min-h-screen p-6 bg-background top-[50vh] md:top-0 -mt-6 md:mt-0 z-10 border-t shadow-[0_-4px_12px_-3px_rgba(0,0,0,0.05)] rounded-t-xl md:border-none md:shadow-none md:rounded-none
md:shadow-none"
      >
        <div className="flex flex-col gap-16">
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
