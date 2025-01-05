import React, { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SCALING_OPTIONS } from "../utils/constants";
import { SizeData } from "../types";

function useResizeObserver(ref: React.RefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observeTarget = ref.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
}

interface ScalingChartProps {
  sizes: SizeData[];
  selectedScaling: string;
  currentFontSize?: number;
}

interface DotProps {
  key: string;
  cx: number;
  cy: number;
  value: number;
  index: number;
  payload: {
    parentSize: number;
  };
}

export default function ScalingChart({
  sizes,
  selectedScaling,
  currentFontSize,
}: ScalingChartProps) {
  const containerRef = useRef(null);
  const { width, height } = useResizeObserver(containerRef);
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const CustomDot = React.forwardRef<SVGCircleElement, DotProps>(
    (props, ref) => {
      const { cx, cy, payload } = props;

      return (
        <circle
          ref={ref}
          cx={cx}
          cy={cy}
          r={payload.parentSize === currentFontSize ? 4 : 0}
          strokeWidth={2}
          fill={`hsl(var(--background))`}
          stroke={`hsl(var(--foreground))`}
        />
      );
    }
  );

  CustomDot.displayName = "CustomDot";

  const renderDot = ({ key, ...otherProps }: DotProps) => {
    return <CustomDot key={key} {...otherProps} />;
  };

  const getLineColor = (key: string) => {
    const isStatic = key === "staticDefault";
    const isSelected = key === selectedScaling;
    const selectedType =
      selectedScaling === "staticDefault" ? "static" : "fluid";

    if (isSelected) {
      return "hsl(var(--foreground))"; // Selected line is fully opaque
    } else if (
      (isStatic && selectedType === "fluid") ||
      (!isStatic && selectedType === "static")
    ) {
      return "hsl(var(--super-muted-foreground))"; // Opposite type is very transparent
    } else {
      return "hsl(var(--foreground))";
    }
  };

  return (
    <div>
      <p className="font-mono uppercase tracking-widest text-xs font-medium mb-6 border-t border-t-primary/10 pt-3">
        Scaling chart
      </p>

      <div ref={containerRef} className="h-[300px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <LineChart
            width={width || 400}
            height={height || 300}
            data={sizes}
            margin={{
              top: 12,
              right: 6,
              left: 0,
              bottom: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="parentSize"
              stroke="var(--border)"
              tickLine={false}
              tickMargin={8}
              domain={[12, 168]}
              label={{
                value: "Parent Font Size (px)",
                position: "bottom",
                offset: 12,
                style: {
                  fontSize: "12px",
                  fill: "hsl(var(--muted-foreground))",
                  fontWeight: 500,
                },
              }}
            />
            <YAxis tickLine={false} stroke="var(--border)" width={32} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  selectedScaling={selectedScaling}
                  labelFormatter={() => `Sub/Sup Font Size`}
                />
              }
            />
            {Object.entries(SCALING_OPTIONS).map(([key, { title }]) => {
              const isSelected = key === selectedScaling;
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={getLineColor(key)}
                  strokeWidth={isSelected ? 2 : 1}
                  name={title}
                  dot={isSelected ? renderDot : false}
                  isAnimationActive={false}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
