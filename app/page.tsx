//page.tsx

import { highlight } from "../lib/highlighter";
import CodeBlock from "./components/CodeBlock";

export default async function Home() {
  const blocks = [
    { title: "Script 1", code: `print("hello script1")` },
    { title: "Script 2", code: `print("hello script2")` },
    { title: "Script 3", code: `print("hello script3")` },
    { title: "Script 4", code: `print("hello script4")` },
    { title: "Script 5", code: `print("hello script5")` },
    { title: "Script 6", code: `print("hello script6")` },
  ];

  const highlighted = await Promise.all(
    blocks.map(async (b) => ({
      ...b,
      html: await highlight(b.code, "python"),
    }))
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <main className="min-h-screen w-full max-w-3xl bg-[var(--background)] px-6 py-20 sm:px-12 sm:py-28">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            Python Scripts Vault
          </h1>

          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            A curated collection of <strong>practical Python scripts</strong> you can copy,
            study, and reuse in real projects.
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-10">
          {highlighted.map((b, i) => (
            <section key={i} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {b.title}
              </h2>

              <CodeBlock html={b.html} raw={b.code} />
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 dark:border-white/10 pt-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Keep scripts short, focused, and copy-paste friendly.
          </p>
        </div>
      </main>
    </div>
  );
}
