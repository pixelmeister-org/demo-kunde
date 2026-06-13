const maxW: React.CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "0 24px" };

const accentBar: React.CSSProperties = {
  display: "block",
  width: 40,
  height: 3,
  background: "#b89c6e",
  marginBottom: 20,
};

export default function Home() {
  return (
    <main style={{ background: "#fff", color: "#1a1a1a" }}>

      {/* ── HERO ── */}
      <header
        style={{
          background: "linear-gradient(160deg, #1a1a1a 0%, #2e2e2e 100%)",
          color: "#fff",
          padding: "96px 24px 80px",
          textAlign: "center",
        }}
      >
        <div style={maxW}>
          <p
            style={{
              letterSpacing: "0.18em",
              fontSize: 11,
              textTransform: "uppercase",
              color: "#b89c6e",
              marginBottom: 18,
              marginTop: 0,
            }}
          >
            Friseursalon · Wien
          </p>
          <h1
            data-edit-id="hero-title"
            style={{
              fontSize: "clamp(38px, 7vw, 58px)",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              margin: "0 0 20px",
              lineHeight: 1.1,
            }}
          >
            Salon Demo
          </h1>
          <p
            data-edit-id="hero-subtitle"
            style={{
              fontSize: 19,
              color: "#c9c9c9",
              marginTop: 0,
              marginBottom: 36,
              lineHeight: 1.6,
            }}
          >
            Ihr Friseur im Herzen von Wien — Termine ohne Wartezeit.
          </p>
          <button
            data-edit-id="hero-cta"
            style={{
              background: "#b89c6e",
              color: "#fff",
              padding: "15px 38px",
              border: 0,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.06em",
              cursor: "pointer",
              borderRadius: 4,
              textTransform: "uppercase",
            }}
          >
            Termin buchen
          </button>
        </div>
      </header>

      {/* ── ÜBER UNS ── */}
      <section style={{ padding: "72px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="about-title"
            style={{ fontSize: 30, margin: "0 0 16px", fontWeight: 700 }}
          >
            Über uns
          </h2>
          <p
            data-edit-id="about-text"
            style={{ lineHeight: 1.8, color: "#444", fontSize: 17, margin: 0 }}
          >
            Seit 2015 verwöhnen wir unsere Kundinnen und Kunden mit Handwerk, Ruhe und einer
            guten Tasse Kaffee. Klein, persönlich, ehrlich — so mögen wir es.
          </p>
        </div>
      </section>

      {/* ── ÖFFNUNGSZEITEN ── */}
      <section style={{ background: "#faf7f2", padding: "64px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="hours-title"
            style={{ fontSize: 30, margin: "0 0 24px", fontWeight: 700 }}
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
              borderRadius: 8,
              padding: "18px 28px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: 24 }}>🕘</span>
            <p data-edit-id="hours" style={{ fontSize: 17, margin: 0, color: "#333" }}>
              Mo–Fr 9–18 Uhr, Sa 9–13 Uhr
            </p>
          </div>
        </div>
      </section>

      {/* ── LEISTUNGEN & PREISE ── */}
      <section style={{ padding: "72px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="prices-title"
            style={{ fontSize: 30, margin: "0 0 32px", fontWeight: 700 }}
          >
            Leistungen &amp; Preise
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
            <li
              data-edit-id="price-1"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#faf7f2",
                border: "1px solid #ede8df",
                borderRadius: 8,
                padding: "18px 24px",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600 }}>Schnitt &amp; Föhnen</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#b89c6e" }}>ab 57 €</span>
            </li>
            <li
              data-edit-id="price-2"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#faf7f2",
                border: "1px solid #ede8df",
                borderRadius: 8,
                padding: "18px 24px",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600 }}>Farbe &amp; Strähnen</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#b89c6e" }}>ab 80 €</span>
            </li>
            <li
              data-edit-id="price-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#faf7f2",
                border: "1px solid #ede8df",
                borderRadius: 8,
                padding: "18px 24px",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600 }}>Bart &amp; Pflege</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#b89c6e" }}>ab 25 €</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#1a1a1a",
          color: "#aaa",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <p
          data-edit-id="contact"
          style={{ margin: 0, fontSize: 15, lineHeight: 1.7 }}
        >
          Demogasse 1, 1220 Wien · 01 234 56 78 · hallo@salon-demo.at
        </p>
      </footer>
    </main>
  );
}
