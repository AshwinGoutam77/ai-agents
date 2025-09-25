import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_input } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // keep key safe in .env.local
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You help rephrase prompts while preserving their original meaning and intent.",
          },
          {
            role: "user",
            content: `You are an expert prompt engineer with deep knowledge of LLM optimization. Your task is to improve prompts following these principles:\n\nIMPROVEMENT CRITERIA:\n1. Clarity: Remove ambiguity, use precise language\n2. Specificity: Add concrete details or options without over-constraining\n3. Structure: Organize with clear sections, formatting\n4. Role Definition: Define the AI's role when useful\n5. Output Format: Suggest clear formats (e.g., list, step-by-step, bullet points)\n6. Context: Add background information if needed\n7. Variants: Offer multiple improved versions when there’s more than one useful interpretation\n8. Preserve Intent: Maintain the user's original goal and level of openness\n\n\nORIGINAL PROMPT:\n{raw_prompt}\n\nINSTRUCTIONS:\n- Provide your analysis of issues with the original prompt\n- Then provide 2–3 improved versions, if applicable (e.g., general and role-specific)\n- Explain what changes you made and why\n\nFORMAT YOUR RESPONSE AS:\nANALYSIS:\n[Brief analysis of weaknesses]\n\nIMPROVED PROMPTS:\n1. [Improved version 1]\n2. [Improved version 2]\n3. [Optional version 3]\n4. [Optional version 4]\n5. [Optional version 5]\n\nCHANGES MADE:\n[Summary of key improvements and reasoning]`,
          },
          {
            role: "user",
            content: user_input,
          },
        ],
        max_tokens: 800,
        temperature: 0.5,
        top_p: 1,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
