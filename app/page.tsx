"use client";

import React, { useState, useEffect } from "react";
import FontMetrics from "fontmetrics";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FONT_FAMILY = "Suisse Intl";
const RELATIVE_SIZE = 0.83333;

const SCALING_OPTIONS = {
  subtle: { title: "Strong scaling", formula: "calc(5px + 0.4em)" },
  moderate: { title: "Moderate scaling", formula: "calc(4px + 0.5em)" },
  minimum: {
    title: "Subtle scaling",
    formula: "calc(3px + 0.6em)",
  },
  linear: { title: "Linear (browser default)", formula: "smaller" },
};

const MetricsLine = ({ y, color, label, fontSize }) => (
  <div
    className="absolute h-px left-0 right-0 flex items-center gap-2"
    style={{
      top: `${y * fontSize}px`,
    }}
  >
    <div
      className="flex-grow border-dashed pointer-events-none"
      style={{
        borderTopWidth: "1px",
        borderColor: color,
      }}
    />
  </div>
);

const ScalingDemo = () => {
  const [fontSize, setFontSize] = useState(60);
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

  const calculateSize = (parentSize, scaling) => {
    switch (scaling) {
      case "subtle":
        return 5 + parentSize * 0.4;
      case "moderate":
        return 4 + parentSize * 0.5;
      case "minimum":
        return 3 + parentSize * 0.6;
      case "linear":
        return parentSize * RELATIVE_SIZE;
      default:
        return parentSize * RELATIVE_SIZE;
    }
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
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Superscript/Subscript Scaling and Position Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8">
          <div className="w-1/2 flex items-center justify-center">
            <div className="border rounded">
              <div
                className="relative"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
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
                  style={
                    {
                      "--font-size": `${fontSize}px`,
                      fontSize: `var(--font-size)`,
                      fontFamily: FONT_FAMILY,
                      lineHeight: 1.2,
                      position: "relative",
                      fontWeight: "normal",
                    } as React.CSSProperties
                  }
                >
                  Hxlop&#178;
                  <sup
                    style={{
                      fontSize: SCALING_OPTIONS[selectedScaling].formula,
                      position: "relative",
                      verticalAlign: "baseline",
                      top:
                        selectedScaling === "linear"
                          ? `${supPosition}em`
                          : `calc(${RELATIVE_SIZE} * ${supPosition} * var(--font-size))`,
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    2
                  </sup>{" "}
                  and
                  <sub
                    style={{
                      fontSize: SCALING_OPTIONS[selectedScaling].formula,
                      position: "relative",
                      verticalAlign: "baseline",
                      top:
                        selectedScaling === "linear"
                          ? `${subPosition}em`
                          : `calc(${RELATIVE_SIZE} * ${subPosition} * var(--font-size))`,
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    2
                  </sub>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/3 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Font Size: {fontSize}px
                </label>
                <Slider
                  value={[fontSize]}
                  onValueChange={([value]) => setFontSize(value)}
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
                  onValueChange={([value]) => setSupPosition(value)}
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
                  onValueChange={([value]) => setSubPosition(value)}
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
                <Select
                  value={selectedScaling}
                  onValueChange={setSelectedScaling}
                >
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

            <LineChart width={600} height={300} data={sizes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="parentSize"
                label={{ value: "Parent Font Size (px)", position: "bottom" }}
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

            <div className="text-sm text-gray-600">
              <p>Current CSS:</p>
              <pre className="bg-gray-100 p-2 rounded mt-2">
                {`p {
  font-family: ${FONT_FAMILY};
  font-size: ${SCALING_OPTIONS[selectedScaling].formula};
  position: relative;
  vertical-align: baseline;
}

sup, sub {
  position: relative;
  vertical-align: baseline;
}

sup {
  ${
    selectedScaling === "linear"
      ? `top: ${supPosition}em;`
      : `top: calc(${RELATIVE_SIZE} * ${supPosition} * var(--font-size));`
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScalingDemo;
