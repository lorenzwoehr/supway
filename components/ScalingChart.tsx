"use client";

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
}

export default function ScalingChart({
  sizes,
  selectedScaling,
}: ScalingChartProps) {
  const containerRef = useRef(null);
  const { width, height } = useResizeObserver(containerRef);
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <p>Superscript & Subscript Font Size (px)</p>

      <div ref={containerRef} className="h-[300px]">
        {" "}
        {/* Added fixed height */}
        <ChartContainer config={chartConfig} className="w-full h-full">
          <LineChart
            width={width || 400}
            height={height || 300}
            data={sizes}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="parentSize"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis width={32} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {Object.entries(SCALING_OPTIONS).map(([key, { title }]) => {
              console.log("Creating line for key:", key); // Debug log
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={key === selectedScaling ? "#22c55e" : "#94a3b8"}
                  strokeWidth={key === selectedScaling ? 2 : 1}
                  name={title}
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      </div>
    </>
  );
}
