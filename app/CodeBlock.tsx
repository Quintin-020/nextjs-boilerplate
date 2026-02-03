"use client";

import { useState } from "react";

export default function CodeBlock({
  html,
  raw,
  index,
}: {
  html: string;
  raw: string;
  index: number;
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, i: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(i);
      window.setTimeout(() => setCopiedIndex(null), 1200);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);

        setCopiedIndex(i);
        window.setTimeout(() => setCopiedIndex(null), 1200);
      } catch {
        alert("Copy failed. Please copy manually.");
      }
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => copyToClipboard(raw, index)}
        className={[
          "absolute right-3 top-3 z-10",
          "inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold",
          "bg-white/10 text-zinc-100 backdrop-blur",
          "border border-white/15",
          "hover:bg-white/15 active:scale-[0.98]",
          "transition",
        ].join(" ")}
        aria-label="Copy to clipboard"
        title="Copy to clipboard"
      >
        {copiedIndex === index ? "Copied!" : "Copy"}
      </button>

      {/* Shiki provides <pre><code>... */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
