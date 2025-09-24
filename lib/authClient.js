// lib/authClient.js (client-safe)
import Cookies from "js-cookie";

export function isUserLoggedIn() {
  const token = Cookies.get("auth_token");
  return !!token; // returns true if token exists, false otherwise
}
