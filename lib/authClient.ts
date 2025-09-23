// lib/authClient.ts
export function isLoggedInClient(): boolean {
  if (typeof window === "undefined") return false; // server-side
  const token = document.cookie.split("; ").find(c => c.startsWith("auth_token="));
  return !!token;
}
