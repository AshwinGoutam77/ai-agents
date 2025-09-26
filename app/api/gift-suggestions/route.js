// File: app/api/gift-suggestion/route.ts
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const body = await req.json();

    const {
      gender,
      age_group,
      age_range,
      recipient,
      occasion,
      hobbies,
      budget,
    } = body;

    console.log(
      gender,
      age_group,
      age_range,
      recipient,
      occasion,
      hobbies,
      budget
    );

    // 1. Gift ideas request
    const giftIdeasResponse = await fetch(
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
              content: "You are a gift recommendation expert.",
            },
            {
              role: "user",
              content: `Suggest 10 unique and thoughtful gift ideas for the following profile:
- Gender: ${gender}
- Age Group: ${age_group} (${age_range})
- Recipient Relationship: ${recipient}
- Occasion: ${occasion}
- Interests/Hobbies: ${hobbies}
- Budget Category: ${budget}

Make sure each gift idea:
- Matches the age and interest profile
- Fits the cultural context of the occasion
- Falls under the budget category
- Includes a 1-line description

Respond ONLY in valid JSON.
2. Return an array of 10 objects.
3. Each object must have exactly two keys: "title" and "description".
4. Do not include any extra text, comments, or formatting outside the JSON.

Example format:
[
  { "title": "Gift Name", "description": "One-line description." }
]`,
            },
          ],
          temperature: 0.6,
          top_p: 1,
        }),
      }
    );

    const giftIdeasData = await giftIdeasResponse.json();

    // 2. Gift card message request
    const giftCardResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a professional greeting card writer.",
            },
            {
              role: "user",
              content: `Write a heartfelt and personalized gift card message for the following:

- Gender: ${gender}
- Age Group: ${age_group} (${age_range})
- Recipient Relationship: ${recipient}
- Occasion: ${occasion}

The message should:
- Fit the tone of the relationship and occasion (e.g., formal, fun, loving)
- Be suitable for writing on a physical gift card
- Be 2 to 4 sentences long`,
            },
          ],
          max_tokens: 200,
          temperature: 0.8,
          top_p: 1,
        }),
      }
    );

    const giftCardData = await giftCardResponse.json();

    // 3. Combine responses
    const finalResponse = {
      gifts: JSON.parse(giftIdeasData.choices[0].message.content),
      cardMessage: giftCardData.choices[0].message.content,
    };

    return NextResponse.json(finalResponse);
  } catch (error) {
    console.error("Error in gift-suggestion route:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
