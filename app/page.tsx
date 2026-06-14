const maxW: React.CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "0 24px" };

const accentBar: React.CSSProperties = {
  display: "block",
  width: 40,
  height: 3,
  background: "#7aa89c",
  marginBottom: 20,
};

export default function Home() {
  return (
    <main style={{ background: "#fff", color: "#1a1a1a" }}>

      {/* ── HERO ── */}
      <header
        style={{
          background: "linear-gradient(160deg, #1d3530 0%, #2e5248 100%)",
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
              color: "#a8d5c8",
              marginBottom: 18,
              marginTop: 0,
            }}
          >
            Kraniosakral-Therapie · Wien
          </p>
          <h1
            data-edit-id="hero-title"
            style={{
              fontSize: "clamp(36px, 7vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              margin: "0 0 20px",
              lineHeight: 1.1,
            }}
          >
            Praxis für Kraniosakral-Therapie
          </h1>
          <p
            data-edit-id="hero-subtitle"
            style={{
              fontSize: 19,
              color: "#c2ddd8",
              marginTop: 0,
              marginBottom: 36,
              lineHeight: 1.6,
            }}
          >
            Sanfte Berührung — tiefe Wirkung. Ihre Praxis für ganzheitliche Gesundheit im Herzen von Wien.
          </p>
          <button
            data-edit-id="hero-cta"
            style={{
              background: "#7aa89c",
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
            Termin vereinbaren
          </button>
        </div>
      </header>

      {/* ── WAS IST KRANIOSAKRAL-THERAPIE ── */}
      <section style={{ padding: "72px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="about-title"
            style={{ fontSize: 30, margin: "0 0 16px", fontWeight: 700 }}
          >
            Was ist Kraniosakral-Therapie?
          </h2>
          <p
            data-edit-id="about-text"
            style={{ lineHeight: 1.8, color: "#444", fontSize: 17, margin: 0 }}
          >
            Die Kraniosakral-Therapie ist eine sanfte, manuelle Körpertherapie, die das
            kraniosakrale System — bestehend aus Schädel, Wirbelsäule und Kreuzbein —
            in seiner natürlichen Bewegung unterstützt. Mit feinfühligen Handgriffen werden
            Blockaden im Fluss der Gehirn-Rückenmarksflüssigkeit gelöst, das Nervensystem
            beruhigt und die Selbstheilungskräfte des Körpers aktiviert. Die Methode wirkt
            tief und nachhaltig, ohne dabei invasiv zu sein.
          </p>
        </div>
      </section>

      {/* ── ANWENDUNGSGEBIETE ── */}
      <section style={{ background: "#f2f8f6", padding: "72px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="areas-title"
            style={{ fontSize: 30, margin: "0 0 32px", fontWeight: 700 }}
          >
            Anwendungsgebiete
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {(
              [
                { emoji: "🧠", label: "Kopf- & Migräneschmerzen", id: "area-1" },
                { emoji: "🦴", label: "Nacken- & Rückenbeschwerden", id: "area-2" },
                { emoji: "😴", label: "Schlafstörungen & Erschöpfung", id: "area-3" },
                { emoji: "😟", label: "Stress & Burnout", id: "area-4" },
                { emoji: "👂", label: "Tinnitus & Schwindel", id: "area-5" },
                { emoji: "🤰", label: "Schwangerschaft & Geburtsvorbereitung", id: "area-6" },
                { emoji: "👶", label: "Säuglinge & Kleinkinder", id: "area-7" },
                { emoji: "🏃", label: "Sportverletzungen & Rehabilitation", id: "area-8" },
              ] as { emoji: string; label: string; id: string }[]
            ).map(({ emoji, label, id }) => (
              <li
                key={id}
                data-edit-id={id}
                style={{
                  background: "#fff",
                  border: "1px solid #cce0da",
                  borderRadius: 10,
                  padding: "20px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24, flexShrink: 0 }}>{emoji}</span>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: "#2a4a44", fontWeight: 600 }}>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ÜBER MICH ── */}
      <section style={{ padding: "72px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="therapist-title"
            style={{ fontSize: 30, margin: "0 0 16px", fontWeight: 700 }}
          >
            Über mich
          </h2>
          <p
            data-edit-id="therapist-text"
            style={{ lineHeight: 1.8, color: "#444", fontSize: 17, margin: 0 }}
          >
            Mein Name ist Maria Musterfrau. Seit über 10 Jahren begleite ich Menschen
            auf ihrem Weg zu mehr Wohlbefinden und innerer Balance. Meine Ausbildung zur
            zertifizierten Kraniosakral-Therapeutin absolvierte ich am Österreichischen
            Institut für Kraniosakrale Therapie. Ergänzend habe ich Weiterbildungen in
            Traumasensibilität und Säuglingstherapie absolviert. In meiner Praxis begegne
            ich jedem Menschen mit Achtsamkeit, Respekt und ganzheitlichem Blick.
          </p>
        </div>
      </section>

      {/* ── LEISTUNGEN & PREISE ── */}
      <section style={{ background: "#f2f8f6", padding: "72px 24px" }}>
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
                background: "#fff",
                border: "1px solid #cce0da",
                borderRadius: 8,
                padding: "18px 24px",
              }}
            >
              <div>
                <span style={{ fontSize: 16, fontWeight: 600, display: "block" }}>
                  Erstbehandlung (90 Min.)
                </span>
                <span style={{ fontSize: 14, color: "#666" }}>inkl. ausführlicher Anamnese</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#7aa89c", whiteSpace: "nowrap", marginLeft: 16 }}>
                110 €
              </span>
            </li>
            <li
              data-edit-id="price-2"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fff",
                border: "1px solid #cce0da",
                borderRadius: 8,
                padding: "18px 24px",
              }}
            >
              <div>
                <span style={{ fontSize: 16, fontWeight: 600, display: "block" }}>
                  Folgebehandlung (60 Min.)
                </span>
                <span style={{ fontSize: 14, color: "#666" }}>Einzelsitzung</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#7aa89c", whiteSpace: "nowrap", marginLeft: 16 }}>
                85 €
              </span>
            </li>
            <li
              data-edit-id="price-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fff",
                border: "1px solid #cce0da",
                borderRadius: 8,
                padding: "18px 24px",
              }}
            >
              <div>
                <span style={{ fontSize: 16, fontWeight: 600, display: "block" }}>
                  Säuglings- &amp; Kinderbehandlung (45 Min.)
                </span>
                <span style={{ fontSize: 14, color: "#666" }}>für Neugeborene bis 12 Jahre</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#7aa89c", whiteSpace: "nowrap", marginLeft: 16 }}>
                70 €
              </span>
            </li>
            <li
              data-edit-id="price-4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fff",
                border: "1px solid #cce0da",
                borderRadius: 8,
                padding: "18px 24px",
              }}
            >
              <div>
                <span style={{ fontSize: 16, fontWeight: 600, display: "block" }}>
                  5er-Block Folgebehandlungen
                </span>
                <span style={{ fontSize: 14, color: "#666" }}>je 60 Min., Paketpreis</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#7aa89c", whiteSpace: "nowrap", marginLeft: 16 }}>
                390 €
              </span>
            </li>
          </ul>
          <p style={{ marginTop: 20, fontSize: 14, color: "#666", lineHeight: 1.6 }}>
            * Kraniosakral-Therapie ist eine komplementäre Methode und ersetzt keine ärztliche Behandlung.
            Kassenrefundierung ist nicht möglich. Einige private Zusatzversicherungen übernehmen die Kosten anteilig.
          </p>
        </div>
      </section>

      {/* ── PRAXISZEITEN ── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={maxW}>
          <span style={accentBar} />
          <h2
            data-edit-id="hours-title"
            style={{ fontSize: 30, margin: "0 0 24px", fontWeight: 700 }}
          >
            Praxiszeiten
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              background: "#f2f8f6",
              border: "1px solid #cce0da",
              borderRadius: 8,
              padding: "18px 28px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: 24 }}>🕘</span>
            <p data-edit-id="hours" style={{ fontSize: 17, margin: 0, color: "#333" }}>
              Mo, Mi, Fr 9–18 Uhr · Di &amp; Do 11–20 Uhr · Sa nach Vereinbarung
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#1d3530",
          color: "#9abfb8",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <p
          data-edit-id="contact"
          style={{ margin: 0, fontSize: 15, lineHeight: 1.9 }}
        >
          Praxis Maria Musterfrau · Ruhegasse 7, 1090 Wien
          <br />
          📞 01 234 56 78 · ✉️ praxis@kraniosakral-demo.at
        </p>
      </footer>

    </main>
  );
}
