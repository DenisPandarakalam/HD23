import { NextResponse } from "next/server";
import openai from "@/app/utils/openai";
export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello from the API" });
}

type PromptData = {
  prompt: string;
};

export async function POST(request: PromptData) {
  "use server";
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "What is 2 + 2",
      },
    ],
  });
  // const res = completion.data.choices[0].message.content;
  console.log("res:", completion.data);
  return NextResponse.json({ message: "0" });
}
