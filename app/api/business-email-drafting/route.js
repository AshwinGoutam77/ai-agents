import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_input } = await req.json();
    console.log("user_input received in API route:", user_input);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "You are an expert at writing polished, persuasive, and professional emails and letters for various business needs.",
            },
            {
              role: "user",
              content:
                "You are a highly skilled assistant trained to write professional, effective, and well-structured emails for a wide range of purposes.\n\nInstructions:\n- Understand the user's intent from the input.\n- Determine the appropriate tone and style (e.g., formal, friendly, promotional, apologetic).\n- Add structure and missing context if needed.\n- Make the email concise, personalized, and ready to send.\n- If the user input lacks specific details (e.g., recipient name, product, date), fill in with [Placeholders] like [Product Name], [Manager’s Name], etc.\n- For scheduling or meeting-related emails, always include:\n  - A placeholder for proposed date/time: [Proposed Date/Time]\n  - A placeholder link or instruction for availability: [Please share your availability]\n\nUse the following standard format for the email:\n\n---\nSubject: [Clear and relevant subject line]\n\nDear [Recipient Name/Team/Customer/etc.],\n\n[Opening line - greeting or brief context]\n\n[Main body - explain purpose, details, or call to action clearly]\n\n[Closing line - wrap up with thanks, invitation, or next steps]\n\nBest regards,\n[Your Name]\n[Your Title or Company Name]\n---",
            },
            {
              role: "user",
              content: user_input,
            },
          ],
        //   max_tokens: 512,
          temperature: 0.3,
          top_p: 1,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `OpenRouter error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
