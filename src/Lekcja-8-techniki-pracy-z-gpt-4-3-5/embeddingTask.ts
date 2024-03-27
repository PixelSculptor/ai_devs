import { values } from "../utils/getCommandArgs";
import { getAuthorizeToken } from "../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken";
import { getTaskDescription } from "../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription";
import { textToEmbedding } from "./textToEmbedding";
import { sendAnswer } from "../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer";

async function embeddingTask() {
  try {
    const token = await getAuthorizeToken(values);

    if (token === undefined) throw Error("Token is undefined");

    const task = await getTaskDescription(token);

    if (task === undefined) throw Error("Task is undefined");

    const regex = /\b(\w+)\s(\w+)$/;
    const match = task.msg.match(regex);

    if (match === null) throw Error("No phrase found");
    const [phrase] = match;
    const embedding = await textToEmbedding(phrase);

    const answer = await sendAnswer(token, embedding);
    console.log(answer);
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

console.log(await embeddingTask());
