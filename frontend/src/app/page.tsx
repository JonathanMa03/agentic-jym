import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-container">
      <section className="hero-block">
        <h1 className="hero-title">Chat with my AI Assistant!</h1>

        <h2 className="hero-subtitle">
          A research and portfolio assistant for exploring Jonathan Y. Ma&apos;s work
        </h2>

        <p className="hero-text">
          This is the beta version of an AI Assistant that has access to my Resume,
          Coursework, and Research. You can use it to ask questions about my
          experience, academic background, and technical work. It is powered by OpenAI
          and hosted using Vercel and Railway.
        </p>

        <p className="hero-text">
          You can also explore my full portfolio here:{" "}
          <a
            href="https://jonathanma03.github.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", fontFamily: "monospace" }}
          >
            jonathanma03.github.io →
          </a>
        </p>

        <p className="hero-text" style={{ fontStyle: "italic", opacity: 0.88 }}>
          Disclaimer: This chatbot has only access to professional information
          about me [Jonathan Ma]. Other views/opinions that might be expressed by
          the chatbot are not mine. Also, LLMs are known to hallucinate and
          responses might not always be accurate.
        </p>

        <div className="chat-panel" style={{ marginTop: "2rem", textAlign: "left" }}>
          <p style={{ marginTop: 0 }}>You can ask questions such as:</p>

          <ul className="prompt-list">
            <li>What are Jonathan&apos;s research interests?</li>
            <li>What projects has Jonathan worked on?</li>
            <li>What courses has Jonathan taken related to Bayesian methods?</li>
            <li>How does his background connect statistics and machine learning?</li>
          </ul>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Link href="/ask" className="hero-button">
            Open Chat →
          </Link>
        </div>
      </section>
    </main>
  );
}