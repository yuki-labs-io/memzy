import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (pathname.startsWith("/login")) {
          return true;
        }

        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/settings") ||
          pathname.startsWith("/app")
        ) {
          return !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/app/:path*",
    "/(protected)/:path*",
  ],
};
