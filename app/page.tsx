export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: 48 }}>
      <h1>Salon Demo</h1>
      <p data-edit-id="intro">Willkommen bei Ihrem Friseur in Wien.</p>
      <h2>Öffnungszeiten</h2>
      <p data-edit-id="hours">Mo–Fr 09:00–17:55 Uhr</p>
      <button data-edit-id="cta" style={{ background: "#1a1a1a", color: "#fff", padding: "12px 24px", border: 0 }}>
        Termin buchen
      </button>
    </main>
  );
}
