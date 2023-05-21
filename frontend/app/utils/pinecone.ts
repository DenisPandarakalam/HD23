import { PineconeClient, Vector } from "@pinecone-database/pinecone";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

export const pinecone = new PineconeClient();
export async function setup() {
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!, // always going to be a string
    apiKey: process.env.PINECONE_API_KEY!, // always going to be a string never undefined
  });
}
setup();

export async function insert_vectors(index: VectorOperationsApi, vectors: Vector[]): Promise<void> {
  await index.upsert({
    upsertRequest: {
      vectors,
      namespace: "therapi-dataset-v1",
    },
  });
}

export async function query_vector(
  index: VectorOperationsApi,
  vector: Vector,
  topK: number
): Promise<{ id: string; score?: number }[]> {
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
