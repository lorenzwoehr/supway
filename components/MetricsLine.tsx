import React from "react";

interface MetricsLineProps {
  y: number;
  color: string;
  label?: string; // Made optional if not used
  fontSize: number;
}

export const MetricsLine: React.FC<MetricsLineProps> = ({
  y,
  color,
  label,
  fontSize,
}) => (
  <div
    className="absolute h-px left-0 right-0 flex items-center gap-2"
    style={{
      top: `${y * fontSize}px`,
    }}
  >
    <span
      className="text-xs px-1 rounded whitespace-nowrap"
      style={{
        backgroundColor: color,
        color: "white",
      }}
    >
      {label}
    </span>
    <div
      className="flex-grow border-dashed pointer-events-none"
      style={{
        borderTopWidth: "1px",
        borderColor: color,
      }}
    />
  </div>
);
