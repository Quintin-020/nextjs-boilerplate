
"use client";
import { useState } from "react";

export default function Home() {
  const blocks = [
    { title: "Script 1", code: `print("hello script1")` },
    { title: "Script 2", code: `print("hello script2")` },
    { title: "Script 3", code: `print("hello script3")` },
    { title: "Script 4", code: `print("hello script4")` },
    { title: "Script 5", code: `print("hello script5")` },
    { title: "Script 6", code: `print("hello script6")` },
  ];

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1200);
    } catch {
      // Fallback
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

        setCopiedIndex(index);
        window.setTimeout(() => setCopiedIndex(null), 1200);
      } catch {
        alert("Copy failed. Please copy manually.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl bg-white px-6 py-20 dark:bg-black sm:px-12 sm:py-28">
        {/* Clean header */}
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Python Scripts Vault
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A curated collection of <strong>practical Python scripts</strong> you can copy,
            study, and reuse in real projects.
          </p>
        </header>

        {/* Scripts */}
        <div className="mt-12 flex flex-col gap-10">
          {blocks.map((b, i) => (
            <section key={i} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {b.title}
              </h2>

              {/* Code block wrapper (for overlay button) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => copyToClipboard(b.code, i)}
                  className={[
                    "absolute right-3 top-3 z-10",
                    "inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold",
                    "bg-white/10 text-zinc-100 backdrop-blur",
                    "border border-white/15",
                    "hover:bg-white/15 active:scale-[0.98]",
                    "transition",
                  ].join(" ")}
                  aria-label={`Copy ${b.title}`}
                  title="Copy to clipboard"
                >
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </button>

                <pre className="overflow-x-auto rounded-xl border border-black/10 bg-black p-5 pr-20 text-sm leading-6 text-zinc-100 dark:border-white/10 font-mono">
                  <code>{b.code}</code>
                </pre>
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-black/[.08] pt-8 dark:border-white/[.145]">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Keep scripts short, focused, and copy-paste friendly.
          </p>
        </div>
      </main>
    </div>
  );
}
