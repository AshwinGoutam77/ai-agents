export async function saveChat({ email, toolName, prompt, response }) {
  try {
    const res = await fetch("/api/save-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, toolName, prompt, response }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Save chat failed:", err.error);
      return { success: false, error: err.error };
    }

    return { success: true };
  } catch (err) {
    console.error("Save chat error:", err);
    return { success: false, error: "Network error" };
  }
}
