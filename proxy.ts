import { NextRequest, NextResponse } from "next/server";

function withoutTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

export function proxy(request: NextRequest) {
  const pathname = withoutTrailingSlash(request.nextUrl.pathname);
  let destination: string | null = null;

  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const articlePath = pathname.slice("/blog".length).replace(/^\//, "");
    destination = articlePath ? `/news/articole/${articlePath}` : "/news/articole";
  } else if (pathname === "/echipa") {
    destination = "/consiliu-stiintific";
  } else if (pathname === "/consiliul-director") {
    destination = "/consiliu-executiv";
  } else if (request.nextUrl.pathname !== pathname && pathname !== "/") {
    destination = pathname;
  }

  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
