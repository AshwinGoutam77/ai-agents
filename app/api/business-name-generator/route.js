import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const body = await req.json();

    const { count, keywords, description, style } = body;

    // Format keywords properly
    const keywordText =
      keywords && keywords.length > 0
        ? `Keywords to include or take inspiration from (use at least half of them in names or derivatives): ${keywords.join(
            ", "
          )}`
        : "No specific keywords provided.";

    // Build prompt
    const prompt = `
Generate ${count} creative and brandable business names based on the following:

Business Description:
"${description}"

${keywordText}

Guidelines:
- Make names relevant to the business described.
- Ensure all names are unique, memorable, and follow the **${style}** name style.
- Exactly **half** of the names should be strongly related to the keywords (e.g., include the keyword or a close variation, prefix, suffix, or phonetic twist).
- Some names should include or be inspired by the keywords. Others can be low random but highly relevant.
- Do not include numbers or explanations — just list the names, one per line.
- Avoid generic or overly literal names.
`;

    // Hit OpenAI
    const nameResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a creative branding and business naming expert.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 400,
        }),
      }
    );

    const nameData = await nameResponse.json();

    const suggestions =
      nameData?.choices?.[0]?.message?.content
        ?.split("\n")
        .filter((line) => line.trim() !== "") || [];

    return NextResponse.json({
      suggestions,
    });
  } catch (error) {
    console.error("Error in name-generator route:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
