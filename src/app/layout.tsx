import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The BioDispatch | Dr. Xuan Chien Hoang",
  description: "Evidence-based analysis at the intersection of biotechnology, metabolomics, and next-gen healthcare innovations by Dr. Xuan Chien Hoang (Dr. rer. nat.).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container nav-inner">
            <Link href="/" className="brand-logo">
              <div className="brand-icon">BD</div>
              <div>
                <span className="brand-title">The BioDispatch</span>
                <span className="brand-badge">EVIDENCE-BASED</span>
              </div>
            </Link>
            <nav className="nav-links">
              <Link href="/">Articles</Link>
              <Link href="/about">About</Link>
              <a
                href="https://github.com/XuanChienHoang/the-biodispatch"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} The BioDispatch — Curated by Dr. Xuan Chien Hoang (Dr. rer. nat.).</p>
            <p style={{ marginTop: "0.5rem" }}>
              Independent biomedical research & product lifecycle intelligence. Hamburg, Germany.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
