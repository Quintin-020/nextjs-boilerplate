import { codeToHtml } from "shiki";
import python from "shiki/langs/python.mjs";
import theme from "./shiki-theme.json";

export async function highlight(code: string) {
  return await codeToHtml(code, {
    lang: python,
    theme,
  });
}

