import { PineconeClient } from "@pinecone-database/pinecone";

export const pinecone = new PineconeClient();
async function setup() {
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!, // always going to be a string
    apiKey: process.env.PINECONE_API_KEY!, // always going to be a string never undefined
  });
}
setup();
// export const pineconeClient = async () => {
//    await getPineconeClient();
// };
