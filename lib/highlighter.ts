// lib/highlighter.ts
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function highlight(code: string, langName = "python") {
  try {
    // dynamische import van shiki (werkt met shiki 1.x)
    const { codeToHtml } = await import("shiki");

    // importeer de taalmodule zodat Shiki die registreert
    // (we gebruiken het importeren alleen om de taal te registreren)
    await import(`shiki/langs/${langName}.mjs`);

    // genereer HTML met de taalnaam als string
    return codeToHtml(code, {
      lang: langName,
      theme: "vitesse-dark",
    });
  } catch (err) {
    // Log de fout zodat je in dev/CI ziet wat er misgaat
    // (Next build logs / terminal)
    // eslint-disable-next-line no-console
    console.error("[highlight] Shiki error:", err);

    // Fallback: veilige, onopgemaakte codeblock HTML zodat build niet faalt
    return `<pre class="shiki" style="background:var(--code-bg);color:#f9fafb;padding:20px;margin:0;border-radius:0;"><code>${escapeHtml(
      code
    )}</code></pre>`;
  }
}
