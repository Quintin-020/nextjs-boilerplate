"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const blocks = [
    { title: "Script 1", hint: "Paste your script here…" },
    { title: "Script 2", hint: "Paste your script here…" },
    { title: "Script 3", hint: "Paste your script here…" },
    { title: "Script 4", hint: "Paste your script here…" },
    { title: "Script 5", hint: "Paste your script here…" },
    { title: "Script 6", hint: "Paste your script here…" },
  ];
  
  const codeBlocks = Array.from({ length: 6 }, () => "");

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1200);
    } catch {
      // Fallback for older browsers / restricted contexts
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
        {/* Header */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={90}
              height={18}
              priority
            />
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              PyScriptVault
            </span>
          </div>

          <a
            href="https://pyscriptvault.tech"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            pyscriptvault.tech
          </a>
        </div>

        {/* Intro */}
        <div className="mt-10 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Python Scripts Vault
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A curated collection of <strong>practical Python scripts</strong> you can copy,
            study, and reuse in real projects.
          </p>
        </div>

        {/* Codeblocks */}
        <div className="mt-12 flex flex-col gap-8">
          {blocks.map((b, i) => (
            <section key={i} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  {b.title}
                </h2>

                <button
                  type="button"
                  onClick={() => copyToClipboard(codeBlocks[i], i)}
                  disabled={!codeBlocks[i]}
                  className={[
                    "inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition",
                    "border border-solid border-black/[.08] dark:border-white/[.145]",
                    "text-zinc-900 dark:text-zinc-100",
                    "hover:bg-black/[.04] dark:hover:bg-[#1a1a1a]",
                    !codeBlocks[i]
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer",
                  ].join(" ")}
                  aria-label={`Copy ${b.title}`}
                  title={codeBlocks[i] ? "Copy to clipboard" : "Paste a script first"}
                >
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </button>
              </div>

              <pre className="overflow-x-auto rounded-xl border border-black/[.08] bg-zinc-50 p-4 text-sm leading-6 text-zinc-900 dark:border-white/[.145] dark:bg-[#0b0b0b] dark:text-zinc-100">
                <code>{codeBlocks[i] || ""}</code>
              </pre>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">{b.hint}</p>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-black/[.08] pt-8 dark:border-white/[.145]">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Tip: Keep scripts small, focused, and copy-paste friendly.
          </p>
        </div>
      </main>
    </div>
  );
}
