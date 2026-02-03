// lib/highlighter.ts
export async function highlight(code: string, langName = "python") {
  // dynamische import voorkomt ESM/build problemen
  const { codeToHtml } = await import("shiki");
  // laad de taalmodule expliciet (werkt met shiki 1.x)
  const langModule = await import(`shiki/langs/${langName}.mjs`);
  const lang = langModule.default ?? langModule;

  // kies een bekende theme-naam of laat hier je eigen theme.json importeren
  const theme = "vitesse-dark";

  return codeToHtml(code, {
    lang,
    theme,
  });
}
