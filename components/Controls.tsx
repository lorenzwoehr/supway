import React from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SCALING_OPTIONS } from "../utils/constants";

type ControlsProps = {
  fontSize: number;
  setFontSize: (value: number) => void;
  supPosition: number;
  setSupPosition: (value: number) => void;
  subPosition: number;
  setSubPosition: (value: number) => void;
  selectedScaling: string;
  setSelectedScaling: (value: string) => void;
};

export const Controls: React.FC<ControlsProps> = ({
  fontSize,
  setFontSize,
  supPosition,
  setSupPosition,
  subPosition,
  setSubPosition,
  selectedScaling,
  setSelectedScaling,
}) => (
  <div className="grid gap-4">
    <div>
      <p>Preview</p>
      <div>
        <label className="block text-sm font-medium mb-2">
          Font Size: <span className="font-mono">{fontSize}px</span>
        </label>
        <Slider
          value={[fontSize]}
          onValueChange={(value: number[]) => setFontSize(value[0])}
          min={12}
          max={168}
          step={1}
          className="w-full"
        />
      </div>
    </div>

    <div>
      <p>Adjustments</p>
      <div>
        <label className="block text-sm font-medium mb-2">Scaling Type</label>
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

      <div>
        <label className="block text-sm font-medium mb-2">
          Superscript Position:{" "}
          <span className="font-mono">{supPosition.toFixed(3)}em</span>
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

      <div>
        <label className="block text-sm font-medium mb-2">
          Subscript Position:{" "}
          <span className="font-mono">{subPosition.toFixed(3)}em</span>
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
  </div>
);
