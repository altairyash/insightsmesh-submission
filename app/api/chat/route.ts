import { OpenAI } from 'openai';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  if (token !== process.env.SECRET_LOGIN_TOKEN) {
    return NextResponse.json({ error: 'Forbidden: Invalid token' }, { status: 403 });
  }

  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Bad Request: Messages array is required' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    return NextResponse.json({ reply: completion.choices[0].message.content });

  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
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

