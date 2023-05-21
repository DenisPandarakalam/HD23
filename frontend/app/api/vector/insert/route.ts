import { get_vector } from "@/app/utils/openai";
import { insert_vector } from "@/app/utils/pinecone";
import { Vector } from "@pinecone-database/pinecone";

// insert a single therapist into the database
type req_body = {
  id: string;
  text: string;
};
export async function POST(req: Request): Promise<Response> {
  const body: req_body = await req.json();
  if (!body || !body.text) {
    return new Response("Missing text", { status: 400 });
  }

  // get vectors
  const values = await get_vector_values(body.text);

  // insert vectors into database
  await insert_vectors([
    {
      id: body.id,
      values: values,
    },
  ]);

  return new Response(`Successfully inserted ${body.id}`, { status: 200 });
}
