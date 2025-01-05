import React from "react";
import { Slider } from "@/components/ui/slider";

type ControlsProps = {
  fontSize: number;
  setFontSize: (value: number) => void;
};

export const PreviewControls: React.FC<ControlsProps> = ({
  fontSize,
  setFontSize,
}) => {
  return (
    <>
      <div>
        <p className="text-lg font-medium mb-3">Preview</p>
        <div>
          <label className="block text-sm font-medium mb-3">
            <span className="inline-block">Font Size:</span>
            <span className="font-mono font-medium"> {fontSize}px</span>
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
    </>
  );
};
