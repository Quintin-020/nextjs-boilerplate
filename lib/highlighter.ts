import { codeToHtml } from "shiki";

export async function highlight(code: string, lang = "python") {
  return await codeToHtml(code, {
    lang,
    theme: "vitesse-dark",
  });
}
