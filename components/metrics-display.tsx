import React from "react";
import { MetricsLine } from "@/components/metrics-line";
import { FontMetricsType } from "@/types/";

type MetricsDisplayProps = {
  metrics: FontMetricsType;
  fontSize: number;
};

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
  metrics,
  fontSize,
}) => (
  <div className="absolute inset-0 flex items-start">
    <div className="relative w-full">
      <MetricsLine y={metrics.ascent} label="Ascent" fontSize={fontSize} />
      <MetricsLine y={metrics.xHeight} label="x-Height" fontSize={fontSize} />
      <MetricsLine y={metrics.baseline} label="Baseline" fontSize={fontSize} />
      <MetricsLine y={metrics.descent} label="Descent" fontSize={fontSize} />
    </div>
  </div>
);
