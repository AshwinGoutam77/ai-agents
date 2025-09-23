let cachedToken = null;
let refreshing = false;

/**
 * Fetch a new token from API
 */
async function fetchToken() {
  try {
    const formData = new URLSearchParams();
    formData.append("username", "admin");
    formData.append("password", "admin123");

    const res = await fetch("https://api.devwings.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch token:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    cachedToken = data?.access_token ?? data?.token?.access_token ?? null;
    return cachedToken;
  } catch (err) {
    console.error("Error fetching token:", err);
    return null;
  }
}

/**
 * Get current token (fetches new if missing)
 */
export async function getToken() {
  if (!cachedToken && !refreshing) {
    refreshing = true;
    await fetchToken();
    refreshing = false;
  }
  return cachedToken;
}

/**
 * Start automatic token refresh every 20 minutes
 */
export function startTokenRefresh() {
  // Immediately fetch token
  fetchToken();

  // Refresh every 20 minutes
  setInterval(fetchToken, 20 * 60 * 1000);
}
