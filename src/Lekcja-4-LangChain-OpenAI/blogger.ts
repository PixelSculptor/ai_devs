import OpenAI from "openai";
import { values } from "../utils/getCommandArgs";

import { getTaskDescription } from "../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription";
import { sendAnswer } from "../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer";
import { getAuthorizeToken } from "../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken";

const openai = new OpenAI({
    apiKey: Bun.env.OPEN_AI_KEY,
});

async function blogger(){
    try {
        const token = await getAuthorizeToken(values);
        if(token === undefined) throw Error("Token is undefined");
        const task = await getTaskDescription(token);
        if(task === undefined) throw Error("Task is undefined");
        console.log(task);
    } catch (error) {
        console.error('Error while blogging: ', error);
    }
}

await blogger();