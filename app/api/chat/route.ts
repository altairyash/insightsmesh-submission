import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Initialize OpenAI with your API key
// The API key is securely accessed from server-side environment variables.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // 1. Authentication/Authorization: Check for a valid token
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value; // Assuming your token is in a cookie named 'auth_token'

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  // In a real application, you would validate this token against a database or service.
  // For this example, we'll just check if it matches a specific value.
  if (token !== process.env.SECRET_LOGIN_TOKEN) { // Replace with actual token validation logic
    return NextResponse.json({ error: 'Forbidden: Invalid token' }, { status: 403 });
  }

  // 2. Parse the request body
  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Bad Request: Messages array is required' }, { status: 400 });
  }

  try {
    // 3. Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or any other OpenAI model
      messages: messages,
    });

    // 4. Send the response back to the client
    return NextResponse.json({ reply: completion.choices[0].message.content });

  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
    // Handle different types of errors
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: error.response.status });
    } else if (error.message) {
      // General error from OpenAI client (e.g., invalid key)
      return NextResponse.json({ error: 'OpenAI API Error: ' + error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}
