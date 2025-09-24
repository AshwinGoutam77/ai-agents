// hooks/useTool.js
export async function useTool(toolName, email) {
  const checkRes = await fetch("/api/use-tool-checker", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, toolName }),
  });

  const checkData = await checkRes.json(); 
  if (!checkRes.ok) {
    alert(checkData.error);
    return { allowed: false };
  }

  return checkData;
}
