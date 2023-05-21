import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/app/utils/openai";
import { NextRequest, NextResponse } from "next/server";
// export async function GET(request: Request) {
//   return NextResponse.json({ message: "Hello from the API" });
// }

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge";

type PromptData = {
  prompt: ChatGPTMessage[];
};

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) satisfies PromptData as PromptData;
  if (!body.prompt || !body.prompt[0] || !body.prompt[0].content || !body.prompt[0].content.length) {
    return new Response("No prompt in the request", { status: 400 });
  }

  // const user_prompts

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are TherAPI, a virtual assistant trained to provide helpful information and assist with user requests. You have been specifically configured to provide information and respond to user inquiries regarding therapy services in the Davis, CA area. Respond to any questions or provide assistance related to therapy, counseling, and mental health resources in Davis, CA.",
      },
      ...body.prompt, // change to handle multiple prompts
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
