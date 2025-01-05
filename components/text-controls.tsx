import React from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SCALING_OPTIONS } from "../utils/constants";

type ScalingType = "fluid" | "static";

type ControlsProps = {
  supPosition: number;
  setSupPosition: (value: number) => void;
  subPosition: number;
  setSubPosition: (value: number) => void;
  selectedScaling: string;
  setSelectedScaling: (value: string) => void;
};

export const Controls: React.FC<ControlsProps> = ({
  supPosition,
  setSupPosition,
  subPosition,
  setSubPosition,
  selectedScaling,
  setSelectedScaling,
}) => {
  // Determine the current scaling type based on the selected scaling option
  const getCurrentScalingType = (): ScalingType => {
    return selectedScaling === "staticDefault" ? "static" : "fluid";
  };

  // Get filtered scaling options based on the current type
  const getFilteredScalingOptions = (type: ScalingType) => {
    return Object.entries(SCALING_OPTIONS).filter(([key]) => {
      if (type === "static") {
        return false; // Don't show any options for static mode
      }
      return key.startsWith("fluid");
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === "static") {
      setSelectedScaling("staticDefault");
    } else if (getCurrentScalingType() === "static") {
      setSelectedScaling("fluidDefault");
    }
  };

  return (
    <>
      <div>
        <p className="font-mono uppercase tracking-widest text-xs font-medium mb-6 border-t border-t-primary/10 pt-3">
          Adjustments
        </p>
        <div>
          <Tabs
            value={getCurrentScalingType()}
            onValueChange={handleTabChange}
            className="w-full mb-3"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fluid">Fluid</TabsTrigger>
              <TabsTrigger value="static">Static</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select
            value={selectedScaling}
            onValueChange={setSelectedScaling}
            disabled={getCurrentScalingType() === "static"}
          >
            <SelectTrigger className="w-full">
              {getCurrentScalingType() === "static" ? (
                "Default"
              ) : (
                <SelectValue />
              )}
            </SelectTrigger>
            <SelectContent>
              {getFilteredScalingOptions(getCurrentScalingType()).map(
                ([key, { title }]) => (
                  <SelectItem key={key} value={key}>
                    {title}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="font-mono mt-8">
          <label className="block text-xs font-medium mb-4">
            <span className="inline-block w-[160px]">
              Superscript Position{" "}
            </span>
            <span className="text-muted-foreground">
              {supPosition.toFixed(3)}em
            </span>
          </label>
          <Slider
            value={[supPosition]}
            onValueChange={(value: number[]) => setSupPosition(value[0])}
            min={-1}
            max={0}
            step={0.01}
            className="w-full"
          />
        </div>

        <div className="font-mono mt-8">
          <label className="block text-xs font-medium mb-4">
            <span className="inline-block w-[160px]">Subscript Position</span>
            <span className="text-muted-foreground">
              {" "}
              {subPosition.toFixed(3)}em
            </span>
          </label>
          <Slider
            value={[subPosition]}
            onValueChange={(value: number[]) => setSubPosition(value[0])}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};
