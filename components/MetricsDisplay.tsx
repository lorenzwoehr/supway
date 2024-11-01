import React from "react";
import { MetricsLine } from "@/components/MetricsLine";
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
      <MetricsLine
        y={metrics.ascent}
        color="#4CAF50"
        label="Ascent"
        fontSize={fontSize}
      />
      <MetricsLine
        y={metrics.xHeight}
        color="#9C27B0"
        label="x-height"
        fontSize={fontSize}
      />
      <MetricsLine
        y={metrics.baseline}
        color="#FF9800"
        label="Baseline"
        fontSize={fontSize}
      />
      <MetricsLine
        y={metrics.descent}
        color="#F44336"
        label="Descent"
        fontSize={fontSize}
      />
    </div>
  </div>
);
