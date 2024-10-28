"use client";

import React, { useState, useEffect } from "react";
import FontMetrics from "fontmetrics";
import { Slider } from "@/components/ui/slider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BROWSER_SMALLER, SCALING_OPTIONS } from "./utils/constants";
import { MetricsLine } from "@/components/ui/metrics-line";

const FONT_FAMILY = "Times New Roman";

const chartConfig = {
  desktop: {
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ScalingDemo = () => {
  const [fontSize, setFontSize] = useState(72);
  const [metrics, setMetrics] = useState(null);
  const [supPosition, setSupPosition] = useState(-0.4);
  const [subPosition, setSubPosition] = useState(0.25);
  const [selectedScaling, setSelectedScaling] = useState("moderate");

  useEffect(() => {
    const fontMetrics = FontMetrics({
      fontFamily: FONT_FAMILY,
      fontWeight: "normal",
      fontSize: 300,
      origin: "top",
    });

    setMetrics(fontMetrics);
  }, []);

  const metricsDummy = {
    ascent: 0.23,
    baseline: 0.93,
    bottom: 1.2766666666666666,
    capHeight: 0.28,
    descent: 1.14,
    fontFamily: "Arial",
    fontSize: 300,
    fontWeight: "normal",
    tittle: 0.06,
    top: 0,
    xHeight: 0.48,
  };

  const calculateSize = (parentSize: number, scaling: string) => {
    switch (scaling) {
      case "subtle":
        return 5 + parentSize * 0.4;
      case "moderate":
        return 4 + parentSize * 0.5;
      case "minimum":
        return 3 + parentSize * 0.6;
      case "linear":
        return parentSize * 0.8;
      default:
        return parentSize * 0.8;
    }
  };

  const calculateTopPosition = (position: number, scaling: string) => {
    const option = SCALING_OPTIONS[scaling];
    if (scaling === "linear") {
      return `${position}em`;
    }

    const scalingFactor = BROWSER_SMALLER * position * option.multiplier;
    const emValue = Math.round(scalingFactor * 100) / 100;
    const pxValue = Math.round(scalingFactor * option.offset * 100) / 100;

    return `calc(${emValue}em - ${pxValue}px)`;
  };

  const sizes = Array.from({ length: 8 }, (_, i) => {
    const parentSize = (i + 1) * 12;
    return {
      parentSize,
      subtle: calculateSize(parentSize, "subtle"),
      moderate: calculateSize(parentSize, "moderate"),
      minimum: calculateSize(parentSize, "minimum"),
      linear: calculateSize(parentSize, "linear"),
    };
  });

  return (
    <main className="relative flex min-h-screen w-full flex-1 overflow-y-auto">
      {/* <CardHeader>
        <CardTitle>Superscript/Subscript Scaling and Position Demo</CardTitle>
      </CardHeader>
      <CardContent> */}
      {/* Preview */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="border rounded">
          <div className="relative flex items-center pr-20">
            {metrics && (
              <div className="absolute inset-0 flex items-start">
                <div className="relative w-full">
                  <MetricsLine
                    y={metricsDummy.ascent}
                    color="#4CAF50"
                    label="Ascent"
                    fontSize={fontSize}
                  />
                  <MetricsLine
                    y={metricsDummy.capHeight}
                    color="#2196F3"
                    label="Cap height"
                    fontSize={fontSize}
                  />
                  <MetricsLine
                    y={metricsDummy.xHeight}
                    color="#9C27B0"
                    label="x-height"
                    fontSize={fontSize}
                  />
                  <MetricsLine
                    y={metricsDummy.baseline}
                    color="#FF9800"
                    label="Baseline"
                    fontSize={fontSize}
                  />
                  <MetricsLine
                    y={metricsDummy.descent}
                    color="#F44336"
                    label="Descent"
                    fontSize={fontSize}
                  />
                </div>
              </div>
            )}
            <div
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: FONT_FAMILY,
                lineHeight: 1.2,
                position: "relative",
                fontWeight: "normal",
              }}
            >
              Hlop
              <sup
                style={{
                  fontSize: SCALING_OPTIONS[selectedScaling].originalFormula,
                  position: "relative",
                  verticalAlign: "baseline",
                  top: calculateTopPosition(supPosition, selectedScaling),
                  fontFamily: FONT_FAMILY,
                }}
              >
                2
              </sup>{" "}
              and
              <sub
                style={{
                  fontSize: SCALING_OPTIONS[selectedScaling].originalFormula,
                  position: "relative",
                  verticalAlign: "baseline",
                  top: calculateTopPosition(subPosition, selectedScaling),
                  fontFamily: FONT_FAMILY,
                }}
              >
                2
              </sub>{" "}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/3 space-y-6">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Font Size: {fontSize}px
            </label>
            <Slider
              value={[fontSize]}
              onValueChange={(value: number[]) => setFontSize(value[0])}
              min={12}
              max={148}
              step={1}
              className="w-64"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Superscript Position: {supPosition.toFixed(3)}em
            </label>
            <Slider
              value={[supPosition]}
              onValueChange={(value: number[]) => setSupPosition(value[0])}
              min={-1}
              max={0}
              step={0.01}
              className="w-64"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Subscript Position: {subPosition.toFixed(3)}em
            </label>
            <Slider
              value={[subPosition]}
              onValueChange={(value: number[]) => setSubPosition(value[0])}
              min={0}
              max={1}
              step={0.01}
              className="w-64"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Scaling Type
            </label>
            <Select value={selectedScaling} onValueChange={setSelectedScaling}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SCALING_OPTIONS).map(([key, { title }]) => (
                  <SelectItem key={key} value={key}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <ChartContainer config={chartConfig}>
          <LineChart width={600} height={300} data={sizes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="parentSize"
              label={{ value: "Parent Font Size (px)", position: "bottom" }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <YAxis
              label={{
                value: "Sup/Sub Font Size (px)",
                angle: -90,
                position: "left",
              }}
            />
            <Tooltip />
            <Legend />
            {Object.entries(SCALING_OPTIONS).map(([key, { title }]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={key === selectedScaling ? "#22c55e" : "#94a3b8"}
                strokeWidth={key === selectedScaling ? 2 : 1}
                name={title}
              />
            ))}
          </LineChart>
        </ChartContainer>

        <div className="text-sm text-gray-600">
          <p>Current CSS:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {`
sup, sub {
  position: relative;
  vertical-align: baseline;
}

sup {
  font-size: ${SCALING_OPTIONS[selectedScaling].originalFormula};
  /* Parent font size = 1 / ${
    SCALING_OPTIONS[selectedScaling].dynamicValue
  } * (1em - ${SCALING_OPTIONS[selectedScaling].offset}px) */
  /* Top offset from base line = Parent font size * Browser "Smaller" font size (${BROWSER_SMALLER}) * Superscript Position (${supPosition}) */
  top: ${calculateTopPosition(supPosition, selectedScaling)};
}

sub {
  font-size: ${SCALING_OPTIONS[selectedScaling].originalFormula};
   /* Top offset from base line = Parent font size * Browser "Smaller" font size (${BROWSER_SMALLER}) * Subscript Position (${subPosition}) */
  top: ${calculateTopPosition(subPosition, selectedScaling)};
}`}
          </pre>
        </div>
      </div>
    </main>
  );
};

export default ScalingDemo;
