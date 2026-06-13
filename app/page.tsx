"use client";
import { useState } from "react";

const ACCENT = "#b89c6e";
const DARK = "#1a1a1a";
const LIGHT_BG = "#faf9f7";

const maxW: React.CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "0 24px" };

const accentBar: React.CSSProperties = {
  display: "block",
  width: 32,
  height: 2,
  background: ACCENT,
  marginBottom: 24,
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Über uns",       href: "#ueber-uns" },
    { label: "Leistungen",     href: "#leistungen" },
    { label: "Öffnungszeiten", href: "#oeffnungszeiten" },
    { label: "Kontakt",        href: "#kontakt" },
  ];

  return (
    <main style={{ background: "#fff", color: DARK, fontFamily: "Georgia, serif" }}>

      {/* NAV BAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid #ece8e1",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
          }}
        >
          <span
            data-edit-id="nav-logo"
            style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.04em", color: DARK }}
          >
            Salon<span style={{ color: ACCENT }}>.</span>Demo
          </span>

          <ul
            className="nav-desktop"
            style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}
          >
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    textDecoration: "none",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#666",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#666")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#kontakt"
            className="nav-cta-desktop"
            style={{
              background: DARK,
              color: "#fff",
              padding: "9px 22px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: 3,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = DARK)}
          >
            Termin buchen
          </a>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              flexDirection: "column",
              gap: 5,
            }}
            aria-label="Menü"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: "block", width: 22, height: 2, background: DARK }} />
            ))}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid #ece8e1",
              padding: "16px 0 20px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#444",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <header
        style={{
          background: DARK,
          color: "#fff",
          padding: "110px 24px 90px",
          textAlign: "center",
        }}
      >
        <div style={maxW}>
          <p
            style={{
              letterSpacing: "0.22em",
              fontSize: 10,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 20,
              marginTop: 0,
            }}
          >
            Friseursalon · Wien
          </p>
          <h1
            data-edit-id="hero-title"
            style={{
              fontSize: "clamp(36px, 7vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              margin: "0 0 22px",
              lineHeight: 1.1,
            }}
          >
            Salon Demo
          </h1>
          <p
            data-edit-id="hero-subtitle"
            style={{
              fontSize: 18,
              color: "#aaa",
              margin: "0 auto 40px",
              lineHeight: 1.75,
              maxWidth: 460,
            }}
          >
            Ihr Friseur im Herzen von Wien — Termine ohne Wartezeit.
          </p>
          <button
            data-edit-id="hero-cta"
            style={{
              background: "transparent",
              color: "#fff",
              padding: "14px 40px",
              border: `1px solid ${ACCENT}`,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              cursor: "pointer",
              borderRadius: 3,
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = ACCENT)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
          >
            Termin buchen
          </button>
        </div>
      </header>

      {/* ÜBER UNS */}
      <section id="ueber-uns" style={{ padding: "80px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="about-title"
            style={{ fontSize: 26, margin: "0 0 16px", fontWeight: 700 }}
          >
            Über uns
          </h2>
          <p
            data-edit-id="about-text"
            style={{ lineHeight: 1.9, color: "#555", fontSize: 16, margin: 0, maxWidth: 560 }}
          >
            Seit 2015 verwöhnen wir unsere Kundinnen und Kunden mit Handwerk, Ruhe und einer
            guten Tasse Kaffee. Klein, persönlich, ehrlich — so mögen wir es.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <hr style={{ border: "none", borderTop: "1px solid #ece8e1", margin: 0 }} />
      </div>

      {/* ÖFFNUNGSZEITEN */}
      <section id="oeffnungszeiten" style={{ background: LIGHT_BG, padding: "72px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="hours-title"
            style={{ fontSize: 26, margin: "0 0 28px", fontWeight: 700 }}
          >
            Öffnungszeiten
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              background: "#fff",
              border: "1px solid #e8e0d4",
              borderRadius: 6,
              padding: "18px 28px",
            }}
          >
            <span style={{ fontSize: 20 }}>🕘</span>
            <p data-edit-id="hours" style={{ fontSize: 16, margin: 0, color: "#444" }}>
              Mo–Fr 9–18 Uhr &nbsp;·&nbsp; Sa 9–13 Uhr
            </p>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN & PREISE */}
      <section id="leistungen" style={{ padding: "80px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="prices-title"
            style={{ fontSize: 26, margin: "0 0 32px", fontWeight: 700 }}
          >
            Leistungen &amp; Preise
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              border: "1px solid #ece8e1",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {[
              { id: "price-1", label: "Schnitt & Föhnen", price: "ab 49 €" },
              { id: "price-2", label: "Farbe & Strähnen", price: "ab 80 €" },
              { id: "price-3", label: "Bart & Pflege",    price: "ab 25 €" },
            ].map(({ id, label, price }) => (
              <li
                key={id}
                data-edit-id={id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff",
                  padding: "20px 24px",
                  borderBottom: "1px solid #ece8e1",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: DARK }}>{label}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: ACCENT }}>{price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOOTER / KONTAKT */}
      <footer
        id="kontakt"
        style={{
          background: DARK,
          color: "#888",
          padding: "52px 24px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 14,
            letterSpacing: "0.04em",
          }}
        >
          Salon<span style={{ color: ACCENT }}>.</span>Demo
        </span>
        <p
          data-edit-id="contact"
          style={{ margin: 0, fontSize: 14, lineHeight: 2, color: "#666" }}
        >
          Demogasse 1, 1220 Wien &nbsp;·&nbsp; 01 234 56 78 &nbsp;·&nbsp; hallo@salon-demo.at
        </p>
        <p style={{ margin: "18px 0 0", fontSize: 11, color: "#3a3a3a", letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} Salon Demo
        </p>
      </footer>

      {/* Responsive Nav */}
      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 641px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </main>
  );
}
