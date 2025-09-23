import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only protect sub-paths, not the root /ai-agents
  if (pathname.startsWith("/ai-agents/")) {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply middleware to all /ai-agents sub-paths
export const config = {
  matcher: ["/ai-agents/:path*"], // note: /ai-agents alone is not matched
};
