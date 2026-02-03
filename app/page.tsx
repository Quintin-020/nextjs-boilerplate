import { createHighlighter } from "shiki";
import CodeBlock from "./CodeBlock";

export default async function Home() {
  const blocks = [
    {
      title: "Script 1",
      code: `# hello script1 - basic demo
def greet(name: str) -> None:
    msg = f"Hello, {name}!"
    print(msg)

greet("world")`,
    },
    {
      title: "Script 2",
      code: `# hello script2 - loop + condition
items = ["apple", "banana", "cherry"]

for i, item in enumerate(items, start=1):
    if len(item) > 5:
        print(i, item, "(long)")
    else:
        print(i, item)`,
    },
    {
      title: "Script 3",
      code: `# hello script3 - dict + formatting
user = {"name": "Drerrie", "role": "student", "lang": "Python"}

print("User:", user["name"])
print(f"Role: {user['role']} | Language: {user['lang']}")`,
    },
    {
      title: "Script 4",
      code: `# hello script4 - function + return
def add(a: int, b: int) -> int:
    return a + b

result = add(7, 35)
print("Result:", result)`,
    },
    {
      title: "Script 5",
      code: `# hello script5 - try/except
try:
    x = int("42")
    y = 0
    print(x / y)
except ZeroDivisionError as e:
    print("Error:", e)`,
    },
    {
      title: "Script 6",
      code: `# hello script6 - pathlib demo
from pathlib import Path

p = Path("example.txt")
print("Exists:", p.exists())
print("Absolute:", p.resolve())`,
    },
  ];

  const highlighter = await createHighlighter({
    themes: ["vscode-dark-plus"],
    langs: ["python"],
  });

  const highlighted = blocks.map((b) => {
    const html = highlighter.codeToHtml(b.code, {
      lang: "python",
      theme: "vscode-dark-plus",
    });

    // Add our own class to Shiki’s <pre> so we can style it (padding for Copy button, rounded, etc.)
    const htmlWithClass = html.replace('<pre class="shiki', '<pre class="shiki codeblock');

    return { title: b.title, code: b.code, html: htmlWithClass };
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl bg-white px-6 py-20 dark:bg-black sm:px-12 sm:py-28">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Python Scripts Vault
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
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

              <CodeBlock html={b.html} raw={b.code} index={i} />
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-black/[.08] pt-8 dark:border-white/[.145]">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Keep scripts short, focused, and copy-paste friendly.
          </p>
        </div>

        {/* Shiki styling: keep the VS Code Dark+ vibe, plus room for the overlay Copy button */}
        <style jsx global>{`
          pre.shiki {
            overflow-x: auto;
            border-radius: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.10);
          }

          /* Our added class */
          pre.codeblock {
            padding: 1.25rem;
            padding-right: 5rem; /* space for Copy button */
          }

          /* Make sure the background stays proper even if theme changes */
          pre.shiki {
            background: #000 !important;
          }

          pre.shiki code {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
              "Liberation Mono", "Courier New", monospace;
            font-size: 0.875rem;
            line-height: 1.5rem;
          }

          pre.shiki ::selection {
            background: rgba(38, 79, 120, 0.5);
          }
        `}</style>
      </main>
    </div>
  );
}
