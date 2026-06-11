export const metadata = { title: "Friseur Demo — pixelmeister Kunde" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{ fontFamily: "Georgia, serif", margin: 0 }}>{children}</body>
    </html>
  );
}
