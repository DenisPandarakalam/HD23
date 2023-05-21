import { OpenAIApi } from "openai";

type EmbeddingBody = {
  model: string;
  input: string;
};

type EmbeddingResponse = {
  object: string;
  index: number;
  embedding: number[];
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
};

export async function POST(req: Request) {
  const body = (await req.json()) as EmbeddingBody;
  if (!body.input || !body.input.length || !body.model || !body.model.length) {
    return new Response("No text in the request", { status: 400 });
  }
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await res.json();
  const embed = json.data as EmbeddingResponse;
  return new Response(JSON.stringify(embed));
}
