import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="site-navbar">
      <Link href="/" className="site-nav-link">
        Home
      </Link>
      <Link href="/ask" className="site-nav-link">
        Chat
      </Link>
    </nav>
  );
}