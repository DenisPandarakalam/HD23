import { get_vector_values } from "@/app/utils/openai";
import { insert_vectors } from "@/app/utils/pinecone";
import { Vector } from "@pinecone-database/pinecone";

// insert multiple therapists into the database
type req_body = therapistData[];
type therapistData = {
  id: string;
  text: string;
};
type other_data = {
  values: number[];
};
export async function POST(req: Request): Promise<Response> {
  const body: req_body = await req.json();
  if (!body || !body.length) {
    return new Response("Missing text", { status: 400 });
  }

  const data = new Array<therapistData & other_data>();
  for (const therapist of body) {
    // data.set(therapist.id, {
    //   id: therapist.id,
    //   text: therapist.text,
    //   values: await get_vector_values(therapist.text),
    // });
    data.push({
      id: therapist.id,
      text: therapist.text,
      values: await get_vector_values(therapist.text),
    });
  }

  // insert vectors into database
  await insert_vectors(data);

  const ids = data.map((therapist) => therapist.id);

  return new Response(`Successfully inserted:\n ${ids.join("\n")}`, { status: 200 });
}
