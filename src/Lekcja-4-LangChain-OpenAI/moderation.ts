import OpenAI from "openai";
import { values } from "../utils/getCommandArgs";

import { getAuthorizeToken } from "../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken";
import { getTaskDescription } from "../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription";
import { sendAnswer } from "../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer";

const openai = new OpenAI({
    apiKey: Bun.env.OPEN_AI_KEY,
});



async function moderation(){
    try {
        const token = await getAuthorizeToken(values);
        const task = await getTaskDescription(token);

        if(task === undefined) throw Error("Task is undefined");

        const moderations: number[] = [];
        const {input} = task;

        for await(const inp of input){
            const response =  await openai.moderations.create({input: inp, model: "text-moderation-latest"})
            moderations.push(response.results[0].flagged ? 1 : 0);
        }
        console.log(await sendAnswer(token, moderations));
    } catch (error) {
        console.error('Error while moderating', error);
    }
}

await moderation();