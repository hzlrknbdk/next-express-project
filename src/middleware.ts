import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default function middleware(req: any) {
  const { nextUrl, cookies } = req;

  const locale = nextUrl.locale || "tr";
  const token = cookies.get("token");

  if (!token && !nextUrl.pathname.includes("/auth/login")) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
  }

  if (token && nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${locale}/feeds`, req.url));
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ["/", "/(tr|en)/:path*"],
};
