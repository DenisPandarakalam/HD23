import { PineconeClient, Vector } from "@pinecone-database/pinecone";

export const pinecone = new PineconeClient();
async function setup() {
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!, // always going to be a string
    apiKey: process.env.PINECONE_API_KEY!, // always going to be a string never undefined
  });
}
setup();
const index = pinecone.Index("therapi-dataset");

export async function insert_vectors(vectors: Vector[]): Promise<void> {
  await index.upsert({
    upsertRequest: {
      vectors,
      namespace: "therapi-dataset-v1",
    },
  });
}

export async function query_vector(vector: Vector, topK: number): Promise<{ id: string; score?: number }[]> {
  const queryRequest = {
    vector: vector.values,
    topK,
    includeValues: true,
    includeMetadata: false,
    namespace: "therapi-dataset-v1",
  };

  const queryResponse = await index.query({ queryRequest });
  return queryResponse.matches ?? [];
}
