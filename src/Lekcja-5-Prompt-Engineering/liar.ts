import { values } from "../utils/getCommandArgs";

import { getAuthorizeToken } from "../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken";
import { getTaskDescription, isTaskResponse } from "../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription";
import { guardRail } from "./guardRail";
import { sendAnswer } from "../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer";


async function liar() {
    try{
        const token = await getAuthorizeToken(values);

        if(token === undefined) throw Error("Token is undefined");

        const taskDescription = await getTaskDescription(token);

        if(taskDescription === undefined) throw Error("Task description is undefined");

        const question = 'What is capital city of Poland?';
        const formData = new FormData();
        formData.append('question', question);

        const answer = await (await fetch(`${process.env.API_URL}task/${token}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })).json();

        if(isTaskResponse(answer) && answer.code === 0){

            console.log('answer: ', answer.answer);
            const guardFlag = await guardRail(answer.answer);
            console.log(guardFlag);
            const response = await sendAnswer(token, guardFlag);
            console.log(response);

        }
    } catch(e: unknown) {
        if(e instanceof Error) {
            console.error(e.message);
        }
    }
}

await liar();