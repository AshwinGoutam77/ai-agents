import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { blogContent } = body;

    if (!blogContent) {
      return NextResponse.json({ error: "Missing blog content" }, { status: 400 });
    }

    // Call OpenAI API
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // store safely in .env.local
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant."
          },
          {
            role: "user",
            content: `You are tasked with creating a concise, engaging, and well-structured summary for the following blog content:

Blog Content: ${blogContent}

Instructions:

1. **Introduction (2-3 lines)**:
    - Provide a clear and engaging introduction that captures the blog's main idea and sets the context for the summary.

2. **Key Points (3-6 bullet points)**:
   - Extract and highlight the most critical takeaways from the blog in bullet-point format.
   - Ensure each point is concise and specific, and focused on the essence of the content.

- Aim for 3-6 key points. If the content is brief (e.g., 7-8 lines), focus on summarizing in 3 points. For longer content, up to 6 points is acceptable, but avoid redundancy.

3. **Conclusion (2-3 lines)**:
   - Wrap up the summary with a concluding statement that emphasizes the importance, value, or future relevance of the content.

4. **Additional Considerations**:
   - Use professional language tailored for an audience seeking actionable insights.
   - Where technical advancements are discussed, ensure clarity while avoiding excessive detail.

### Output Format:

# **Summary**:

## **Brief Introduction**:
- Provide the brief introduction in 1-3 lines.

## **Key Points**:
- Bullet point 1
- Bullet point 2
- Bullet point 3
- Additional bullet points, if applicable, up to 6.

## **Concluding Statement**:
- 2-3 lines to wrap up the summary effectively.`
          }
        ]
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      return NextResponse.json({ error: err }, { status: openaiRes.status });
    }

    const data = await openaiRes.json();
    const summary = data.choices?.[0]?.message?.content || "No summary generated";

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Blog Summarizer API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
