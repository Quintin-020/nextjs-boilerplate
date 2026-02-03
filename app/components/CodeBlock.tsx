// CodeBlock.tsx

"use client";

import { useState } from "react";

export default function CodeBlock({ html, raw }: { html: string; raw: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative">
      <button
        onClick={copy}
        className="absolute right-3 top-3 z-10 bg-white/10 text-white px-3 py-1 rounded border border-white/20 backdrop-blur-sm hover:bg-white/20 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <div
        className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10"
        style={{ background: "transparent" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
