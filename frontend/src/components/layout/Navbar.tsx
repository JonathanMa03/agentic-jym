import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-link">Home</Link>
      <Link href="/ask" className="nav-link">Chatbot</Link>
    </nav>
  );
}