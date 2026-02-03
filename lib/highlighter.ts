import { codeToHtml } from "shiki";
import python from "shiki/langs/python.mjs";

export async function highlight(code: string) {
  return await codeToHtml(code, {
    lang: python,
    theme: "vitesse-dark",
  });
}
