import { get_vector_values } from "@/app/utils/openai";
import { insert_vectors, pinecone, setup } from "@/app/utils/pinecone";
// import jayson_file from "../../../../data_map.json";
import { Vector } from "@pinecone-database/pinecone";
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}
export const runtime = "edge";
export const preferredRegion = "sfo1";

export async function GET(req: Request): Promise<Response> {
  // await setup();
  // const index = pinecone.Index("therapi-dataset");
  // // run through map of jayson file
  // const jayson_map = jayson_file as Record<string, object>;
  // const vectors: Vector[] = [];
  // for (const [key, value] of Object.entries(jayson_map)) {
  //   const vector = await get_vector_values(JSON.stringify(value));
  //   console.log(vector);
  //   vectors.push({
  //     id: key,
  //     values: vector,
  //   });
  // }

  // await insert_vectors(index, vectors);

  return new Response(`Successfully inserted`, { status: 200 });
}
