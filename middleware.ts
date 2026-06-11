// middleware.ts — Demo-Kundenrepo
// Nur im Editier-Modus aktiv: schützt die öffentliche Sandbox-URL.
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.PIXELMEISTER_EDIT_MODE !== "1") return NextResponse.next();

  const expected = process.env.PIXELMEISTER_PREVIEW_TOKEN;
  if (!expected) return new NextResponse("Editiermodus falsch konfiguriert", { status: 500 });

  const queryToken = request.nextUrl.searchParams.get("pm_token");
  if (queryToken === expected) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("pm_token");
    const response = NextResponse.redirect(url);
    response.cookies.set("pm_token", expected, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // iframe ist cross-site eingebettet
      path: "/",
      partitioned: true, // CHIPS: verhindert Blockierung durch Browser (3rd-party-Cookie-Sperre)
    });
    return response;
  }

  if (request.cookies.get("pm_token")?.value === expected) return NextResponse.next();

  return new NextResponse("Kein Zugriff", { status: 403 });
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
