const section: React.CSSProperties = { maxWidth: 720, margin: "0 auto", padding: "40px 24px" };

export default function Home() {
  return (
    <main>
      <header style={{ ...section, textAlign: "center", paddingTop: 72 }}>
        <h1 data-edit-id="hero-title" style={{ fontSize: 44, margin: 0 }}>
          Salon Demo
        </h1>
        <p data-edit-id="hero-subtitle" style={{ fontSize: 19, color: "#555", marginTop: 12 }}>
          Ihr Friseur im Herzen von Wien — Termine ohne Wartezeit.
        </p>
        <button
          data-edit-id="hero-cta"
          style={{ background: "#1a1a1a", color: "#fff", padding: "14px 32px", border: 0, fontSize: 16, marginTop: 24, cursor: "pointer" }}
        >
          Termin buchen
        </button>
      </header>

      <section style={section}>
        <h2 data-edit-id="about-title">Unser Salon</h2>
        <p data-edit-id="about-text" style={{ lineHeight: 1.7, color: "#333" }}>
          Seit 2015 verwöhnen wir unsere Kundinnen und Kunden mit Handwerk, Ruhe und einer
          guten Tasse Kaffee. Klein, persönlich, ehrlich — so mögen wir es.
        </p>
      </section>

      <section style={{ ...section, background: "#faf7f2" }}>
        <h2 data-edit-id="hours-title">Öffnungszeiten</h2>
        <p data-edit-id="hours" style={{ fontSize: 18 }}>
          Mo–Fr 9–18 Uhr, Sa 9–13 Uhr
        </p>
      </section>

      <section style={section}>
        <h2 data-edit-id="prices-title">Leistungen &amp; Preise</h2>
        <ul style={{ lineHeight: 2, listStyle: "none", padding: 0 }}>
          <li data-edit-id="price-1">Schnitt &amp; Föhnen — ab 49 €</li>
          <li data-edit-id="price-2">Farbe &amp; Strähnen — ab 80 €</li>
          <li data-edit-id="price-3">Bart &amp; Pflege — ab 25 €</li>
        </ul>
      </section>

      <footer style={{ ...section, borderTop: "1px solid #ddd", textAlign: "center" }}>
        <p data-edit-id="contact" style={{ color: "#555" }}>
          Demogasse 1, 1220 Wien · 01 234 56 78 · hallo@salon-demo.at
        </p>
      </footer>
    </main>
  );
}
