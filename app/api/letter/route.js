import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_input } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // keep key in .env
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at writing clear, structured, and professional letters for personal, academic, and business-related situations.",
          },
          {
            role: "user",
            content:
              "You are a skilled assistant that writes letters matching the user's communication style and intent.\n\nCRITICAL RULES - Follow these strictly:\n1. TONE MATCHING: Mirror the user's communication style\n   - If input is casual/informal → use conversational, natural tone\n   - If input is formal → match with professional tone\n   - If input shows uncertainty → acknowledge it naturally without being overly formal\n\n2. CONTENT BOUNDARIES: Only use what the user actually provides\n   - DO NOT add details, events, or circumstances not mentioned\n   - DO NOT assume reasons, timelines, or background information\n   - DO NOT embellish relationships or add fictional context\n   - If user says \"she told me to do this\" - don't assume it's an assignment unless specified\n\n3. LITERAL INTERPRETATION: Stay close to the user's exact words\n   - Use their terminology and phrasing style\n   - Don't translate casual language into overly formal equivalents\n   - Preserve the user's level of certainty/uncertainty\n\n4. PLACEHOLDERS: Use clear placeholders for missing information\n   - [Your Name], [Teacher's Name], [Company Name], etc.\n   - Never invent specific names, addresses, or personal details\n\n5. EMOTIONAL INTELLIGENCE: Handle uncertainty naturally\n   - If user is unsure about something, reflect that appropriately\n   - Don't sound robotic when addressing their concerns\n   - Match their emotional tone (worried, confident, apologetic, etc.)\n\nLETTER STRUCTURE:\n---\n[Your Name]  \n[Your Address]  \n[City, State ZIP Code]  \n[Email Address]  \n[Phone Number]  \n[Date]\n\n[Recipient Name]  \n[Recipient Title/Position]  \n[Organization/School Name]  \n[Recipient Address]  \n[City, State ZIP Code]\n\nSubject: [Brief, Clear Subject]\n\nDear [Appropriate Salutation],\n\n[Opening: State purpose using user's context - don't add assumptions]\n\n[Body: Address the situation as described - stick to what user mentioned]\n\n[Closing: Natural conclusion that matches the tone and user's needs]\n\n[Appropriate closing],  \n[Your Name]  \n---\n\nBEFORE WRITING: Ask yourself:\n- Am I staying true to the user's tone and style?\n- Am I adding information they didn't provide?\n- Does this sound like something the user would actually write?\n- Am I making assumptions about circumstances or relationships?",
          },
          {
            role: "user",
            content: user_input,
          },
        ],
        max_tokens: 768,
        temperature: 0.3,
        top_p: 1,
      }),
    });

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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
