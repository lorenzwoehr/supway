import React from "react";

interface MetricsLineProps {
  y: number;
  label?: string; // Made optional if not used
  fontSize: number;
}

export const MetricsLine: React.FC<MetricsLineProps> = ({
  y,
  label,
  fontSize,
}) => (
  <div
    className="absolute h-px left-2 right-2 md:left-4 md:right-4 flex items-center gap-2"
    style={{
      top: `${y * fontSize}px`,
    }}
  >
    <span className="text-xs md:text-sm px-1 text-muted-foreground whitespace-nowrap">
      {label}
    </span>
    <div className="flex-grow border-t border-primary opacity-10 pointer-events-none" />
  </div>
);
