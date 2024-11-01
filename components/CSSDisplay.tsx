// components/CSSDisplay.tsx
import React from "react";
import { Check, Copy } from "lucide-react";
import { SCALING_OPTIONS, BROWSER_SMALLER } from "../utils/constants";
import { calculateTopPosition } from "../utils/calculations";
import { cn } from "@/lib/utils";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

type CSSDisplayProps = {
  selectedScaling: string;
  supPosition: number;
  subPosition: number;
  className?: string;
};

export const CSSDisplay: React.FC<CSSDisplayProps> = ({
  selectedScaling,
  supPosition,
  subPosition,
  className,
}) => {
  const [hasCopied, setHasCopied] = React.useState(false);
  const [highlightedCode, setHighlightedCode] = React.useState("");
  const supStyle = calculateTopPosition(supPosition, selectedScaling);
  const subStyle = calculateTopPosition(subPosition, selectedScaling);

  const cssCode = `sup, sub {
  position: relative;
  vertical-align: baseline;
}

sup {
  font-size: ${SCALING_OPTIONS[selectedScaling].originalFormula};
  /* Formula: Parent font size × ${BROWSER_SMALLER} × Superscript Position (${supPosition}) */
  top: ${supStyle};
}

sub {
  font-size: ${SCALING_OPTIONS[selectedScaling].originalFormula};
  /* Formula: Parent font size × ${BROWSER_SMALLER} × Subscript Position (${subPosition}) */
  top: ${subStyle};
}`;

  React.useEffect(() => {
    const highlightCode = async () => {
      const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
          theme: "min-dark",
          keepBackground: false,
        })
        .use(rehypeStringify)
        .process("```css\n" + cssCode + "\n```");

      setHighlightedCode(String(result));
    };

    highlightCode();
  }, [cssCode]);

  const copyToClipboard = React.useCallback(async () => {
    await navigator.clipboard.writeText(cssCode);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  }, [cssCode]);

  return (
    <div className={cn("text-sm", className)}>
      <p className="mb-2">Current CSS</p>
      <div className="relative group">
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 opacity-0 transition group-hover:opacity-100 focus:opacity-100 z-10"
          aria-label="Copy code"
        >
          {hasCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-500 hover:text-zinc-300" />
          )}
        </button>
        <div
          className="syntax-highlight mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg dark:border bg-zinc-950 py-4 dark:bg-zinc-900"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
};
