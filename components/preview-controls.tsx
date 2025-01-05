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
        <p className="font-mono uppercase tracking-widest text-xs font-medium mb-6 border-t border-t-primary/10 pt-3">
          Preview
        </p>
        <div>
          <label className="font-mono block text-xs font-medium mb-4">
            <span className="inline-block">Font Size</span>
            <span className="text-muted-foreground"> {fontSize}px</span>
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
