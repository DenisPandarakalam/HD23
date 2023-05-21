if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge";
export const preferredRegion = "sfo1";

export async function POST(req: Request): Promise<Response> {}
