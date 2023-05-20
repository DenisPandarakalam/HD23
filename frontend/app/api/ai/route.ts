import { OpenAIStream, OpenAIStreamPayload } from "@/app/utils/openai";
import { NextRequest, NextResponse } from "next/server";
// export async function GET(request: Request) {
//   return NextResponse.json({ message: "Hello from the API" });
// }

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge";

type PromptData = {
  prompt: string;
};

export async function POST(req: PromptData): Promise<Response> {
  if (!req.prompt || typeof req.prompt !== "string" || !req.prompt.length) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are TherAPI, a virtual assistant trained to provide helpful information and assist with user requests. You have been specifically configured to provide information and respond to user inquiries regarding therapy services in the Davis, CA area. Respond to any questions or provide assistance related to therapy, counseling, and mental health resources in Davis, CA.",
      },
      { role: "user", content: req.prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
