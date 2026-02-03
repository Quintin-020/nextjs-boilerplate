import { getHighlighter } from "shiki";

let highlighter: any = null;

export async function highlight(code: string, lang = "python") {
  if (!highlighter) {
    highlighter = await getHighlighter({
      themes: ["vitesse-dark"],
      langs: ["python", "javascript", "bash", "json"],
    });
  }

  return highlighter.codeToHtml(code, {
    lang,
    theme: "vitesse-dark",
  });
}
