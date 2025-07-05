import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TitleAndSummarySchema = z.object({
  title: z.string(),
  summary: z.string(),
});

export async function POST(req: Request) {
  try {
    const { sessionId, messages } = await req.json();

    // Debugging: Log the parsed request body
    console.log('Parsed request body:', { sessionId, messages });

    // Validate input
    if (!sessionId || !messages || messages.length < 3) {
      console.error('Validation failed:', { sessionId, messages });
      return NextResponse.json({ error: "Invalid input: sessionId and at least 3 messages are required." }, { status: 400 });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant. Generate a JSON object with keys 'title' and 'summary' based on the following conversation." },
        ...messages,
      ],
      temperature: 0.1
    });

    const responseContent = completion.choices[0].message.content || "{}"; // Default to empty JSON string if null

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseContent);
    } catch (error) {
      console.error("Failed to parse OpenAI response as JSON:", error);
      return NextResponse.json({ error: "Invalid response format from OpenAI" }, { status: 500 });
    }

    if (!parsedResponse.title || !parsedResponse.summary) {
      console.error("Missing title or summary in OpenAI response:", parsedResponse);
      return NextResponse.json({ error: "Incomplete response from OpenAI" }, { status: 500 });
    }

    const slicedSummary = parsedResponse.summary.split(" ").slice(0, 6).join(" ") + "...";

    const updatedResponse = {
      title: parsedResponse.title,
      summary: slicedSummary,
    };

    return NextResponse.json(updatedResponse);

  } catch (error: any) {
    console.error('Error in generateTitleAndSummary API:', error);

    // Debugging: Log the error type and details
    console.error('Error type:', typeof error);
    console.error('Error details:', error);

    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: error.response.status });
    } else if (error.message) {
      return NextResponse.json({ error: 'OpenAI API Error: ' + error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}
