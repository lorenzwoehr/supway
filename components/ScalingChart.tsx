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

      // Show the dot on each point to create a continuous line
      return (
        <circle
          ref={ref}
          cx={cx}
          cy={cy}
          r={payload.parentSize === currentFontSize ? 4 : 0}
          fill="white"
          stroke="rgb(24 24 27)"
          strokeWidth={2}
        />
      );
    }
  );

  CustomDot.displayName = "CustomDot";

  const renderDot = ({ key, ...otherProps }: DotProps) => {
    return <CustomDot key={key} {...otherProps} />;
  };

  return (
    <>
      <p>Superscript & Subscript Font Size (px)</p>

      <div ref={containerRef} className="h-[300px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <LineChart
            width={width || 400}
            height={height || 300}
            data={sizes}
            margin={{
              top: 12,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="parentSize"
              stroke="var(--border)"
              tickLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} stroke="var(--border)" width={32} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {Object.entries(SCALING_OPTIONS).map(([key, { title }]) => {
              const isSelected = key === selectedScaling;
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={isSelected ? "rgb(24 24 27)" : "rgb(161 161 170)"}
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
    </>
  );
}
