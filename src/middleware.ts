import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Middleware ini melindungi 3 area: /admin, /tutor, /portal.
// Setiap area hanya bisa diakses oleh role yang sesuai.
// Pengguna yang belum login akan diarahkan ke /masuk.
// Pengguna yang login tapi salah role akan diarahkan ke halaman portalnya sendiri.
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    const roleHome: Record<string, string> = {
      SUPER_ADMIN: "/admin",
      TUTOR: "/tutor",
      PARENT: "/portal",
    };

    if (pathname.startsWith("/admin") && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL(roleHome[role || ""] || "/masuk", req.url));
    }
    if (pathname.startsWith("/tutor") && role !== "TUTOR") {
      return NextResponse.redirect(new URL(roleHome[role || ""] || "/masuk", req.url));
    }
    if (pathname.startsWith("/portal") && role !== "PARENT") {
      return NextResponse.redirect(new URL(roleHome[role || ""] || "/masuk", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/masuk",
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/:path*", "/tutor/:path*", "/portal/:path*"],
};
