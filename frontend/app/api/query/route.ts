// import { pinecone } from "@/app/utils/pinecone";
// import type { QueryRequest } from "@pinecone-database/pinecone";
// if (!process.env.OPENAI_API_KEY) {
//     throw new Error("Missing env var from OpenAI");
//   }

//   export const runtime = "edge";
//   export const preferredRegion = "sfo1";

// export async function POST(req: Request) {
//   const req_body = (await req.json()) as Partial<QueryRequest>;
//     if (!req_body || !req_body.vector || !req_body.filter) {
//     return new Response("Invalid body", { status: 400 });
//     }

//     const body: QueryRequest = {
//     vector: req_body.vector,
//     filter: req_body.filter,
//     topK: 30,
//     includeMetadata:true,
//     includeValues: false,
//     namespace: ""

//   const index = pinecone.Index("therapi-dataset");
//   const queryResponse = await index.query({ queryRequest: body });
//   return new Response(JSON.stringify(queryResponse));
// }
