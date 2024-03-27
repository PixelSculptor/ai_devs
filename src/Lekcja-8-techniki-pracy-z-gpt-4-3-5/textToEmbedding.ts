import OpenAI from "openai";

const openAi = new OpenAI({ apiKey: Bun.env.OPEN_AI_KEY });

export async function textToEmbedding(text: string) {
  try {
    const embedding = await openAi.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
      encoding_format: "float",
    });
    return embedding.data[0].embedding;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error while converting text to embedding: ",
        error.message
      );
    } else {
      console.error("Error while converting text to embedding: ", error);
    }
  }
}
