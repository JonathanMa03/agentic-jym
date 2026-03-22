import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="site-navbar">
      <Link href="/" className="site-nav-link">
        Home
      </Link>
      <Link href="/ask" className="site-nav-link">
        Ask
      </Link>
      <Link href="#" className="site-nav-link">
        About
      </Link>
      <Link href="#" className="site-nav-link">
        Projects
      </Link>
      <Link href="#" className="site-nav-link">
        Resume
      </Link>
      <Link href="#" className="site-nav-link">
        Contact
      </Link>
    </nav>
  );
}