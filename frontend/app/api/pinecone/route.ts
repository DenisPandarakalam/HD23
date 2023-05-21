import { pinecone } from "@/app/utils/pinecone";
import type { UpsertRequest } from "@pinecone-database/pinecone";
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge";
export const preferredRegion = "sfo1";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as UpsertRequest;
  if (!body.vectors.length || body.vectors.length > 0) {
    return new Response("No vectors in the request", { status: 400 });
  }
  const index = pinecone.Index("therapi-dataset");
  const upsertResponse = await index.upsert({ upsertRequest: body });
  return new Response(JSON.stringify(upsertResponse));
}
