import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PyScriptVault – Python Script Examples</title>
        <meta
          name="description"
          content="PyScriptVault contains clean, practical Python script examples and snippets you can copy, study, and reuse."
        />
        <meta
          name="keywords"
          content="python scripts, python examples, python snippets, python automation, pyscriptvault"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <main
        style={{
          maxWidth: '900px',
          margin: '40px auto',
          padding: '0 20px',
          fontFamily: 'sans-serif',
          lineHeight: 1.6,
        }}
      >
        <h1>PyScriptVault</h1>

        <p>
         A curated collection of <strong>practical Python scripts</strong> you can copy,
         study, and reuse in real projects.
        </p>

        <hr style={{ margin: '30px 0' }} />

        <h2>Script 1</h2>
        <pre>
          <code>
{``}
          </code>
        </pre>

        <h2>Script 2</h2>
        <pre>
          <code>
{``}
          </code>
        </pre>

        <h2>Script 3</h2>
        <pre>
          <code>
{``}
          </code>
        </pre>

        <h2>Script 4</h2>
        <pre>
          <code>
{``}
          </code>
        </pre>

        <h2>Script 5</h2>
        <pre>
          <code>
{``}
          </code>
        </pre>

        <h2>Script 6</h2>
        <pre>
          <code>
{``}
          </code>
        </pre>

        <hr style={{ margin: '40px 0' }} />

        <p style={{ color: '#555' }}>
          More scripts will be added over time. Keep it simple. Keep it useful.
        </p>
      </main>
    </>
  );
}
