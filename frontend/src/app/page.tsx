import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Chat with my AI Assistant!</h1>

      <h2 style={{ marginTop: "1rem" }}>
        A research and portfolio assistant for exploring Jonathan Y. Ma's work
      </h2>

      <p style={{ marginTop: "2rem" }}>
        This is the beta version of an AI Assistant that has access to my Resume,
        Course Notes and Research. You can use it to ask questions about my
        experience, research, academic background etc. It is powered by OpenAI
        and hosted using Vercel and Railway.
      </p>

      <p style={{ marginTop: "1.5rem", fontStyle: "italic", opacity: 0.85 }}>
        Disclaimer: This chatbot has only access to professional information
        about me [Jonathan Ma]. Other views/opinions that might be expressed by
        the chatbot are not mine. Also, LLMs are known to hallucinate and
        responses might not always be accurate.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <p>You can ask questions such as:</p>
        <ul style={{ textAlign: "left", display: "inline-block", marginTop: "1rem" }}>
          <li>What are Jonathan's research interests?</li>
          <li>What projects has Jonathan worked on?</li>
          <li>How does his background connect statistics and machine learning?</li>
        </ul>
      </div>

      <div style={{ marginTop: "2.5rem" }}>
        <Link href="/ask">
          <button
            style={{
              padding: "0.7rem 1.2rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              cursor: "pointer",
            }}
          >
            Open Chat
          </button>
        </Link>
      </div>
    </div>
  );
}