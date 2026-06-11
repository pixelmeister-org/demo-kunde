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
          style={{ background: "#16a34a", color: "#fff", padding: "14px 32px", border: 0, fontSize: 16, marginTop: 24, cursor: "pointer" }}
        >
          Termin buchen
        </button>
      </header>

      <section style={{ ...section, background: "#fff9f4", borderRadius: 16, padding: "48px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        <h2 data-edit-id="about-title" style={{ fontSize: 32, marginBottom: 8, color: "#1a1a1a" }}>Über uns ✂️</h2>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#16a34a", marginBottom: 24 }}>
          Ihr Wohlfühl-Salon im 22. Bezirk · Wien-Donaustadt
        </p>
        <p data-edit-id="about-text" style={{ lineHeight: 1.85, color: "#333", fontSize: 16, marginBottom: 20 }}>
          Seit 2015 sind wir im Herzen der Donaustadt zuhause — und genau das spürt man bei uns.
          Kein Stress, keine Anonymität, dafür echte Handwerkskunst, ein herzliches Team und
          natürlich eine gute Tasse Wiener Kaffee, während wir uns um euch kümmern.
        </p>
        <p style={{ lineHeight: 1.85, color: "#333", fontSize: 16, marginBottom: 28 }}>
          Ob klassischer Herrenschnitt, moderner Damencut oder aufwendige Colorationen —
          wir nehmen uns die Zeit, die ihr verdient. Klein, persönlich, ehrlich.
          So wie man sich einen Salon in Wien wünscht.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" as const, marginTop: 8 }}>
          {[
            { icon: "📍", label: "22. Bezirk", sub: "Wien-Donaustadt" },
            { icon: "🏆", label: "Seit 2015", sub: "Erfahrung & Leidenschaft" },
            { icon: "💚", label: "Persönlich", sub: "Jeder Gast ist einzigartig" },
            { icon: "☕", label: "Wohlfühlen", sub: "Kaffee inklusive" },
          ].map(({ icon, label, sub }) => (
            <div key={label} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", flex: "1 1 140px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", textAlign: "center" as const }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15 }}>{label}</div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>
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
          <li data-edit-id="price-1">Schnitt &amp; Föhnen — ab 45 €</li>
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
