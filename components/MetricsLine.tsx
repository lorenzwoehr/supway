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
    <span className="text-xs md:text-sm px-1 text-zinc-400 whitespace-nowrap">
      {label}
    </span>
    <div
      className="flex-grow border-0.5 border-zinc-300 pointer-events-none"
      style={{
        borderTopWidth: "1px",
      }}
    />
  </div>
);
