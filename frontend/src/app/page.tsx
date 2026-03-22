import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-container">
      <section className="hero-block">
        <h1 className="hero-title">Personal Knowledge OS</h1>
        <h2 className="hero-subtitle">
          A research and portfolio assistant for exploring Jonathan Y. Ma&apos;s
          background, projects, research interests, and technical direction.
        </h2>
        <p className="hero-text">
          This companion site is designed to answer questions about my academic
          background, quantitative interests, machine learning projects, and
          research directions in a more interactive format.
        </p>
        <p className="hero-text">
          It extends the same formal, academic style as my portfolio while
          adding a retrieval-augmented chat interface grounded in curated source
          material.
        </p>
        <Link href="/ask" className="hero-button">
          Open chat
        </Link>
      </section>
    </main>
  );
}