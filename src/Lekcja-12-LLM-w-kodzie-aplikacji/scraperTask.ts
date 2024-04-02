import { values } from '../utils/getCommandArgs';
import { getAuthorizeToken } from '../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken';
import { getTaskDescription } from '../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription';
import { sendAnswer } from '../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer';
import { getDataFromExternalSource } from './getDataFromExternalSource';

async function screaperTask() {
    try {
        const token = await getAuthorizeToken(values);
        const taskDescription = await getTaskDescription(token);
        console.log(taskDescription);
        if (Array.isArray(taskDescription.input))
            throw Error('Input is not a string');
        const payload = {
            input: taskDescription.input,
            msg: taskDescription.msg,
            question: taskDescription.question as string,
        };
        const response = await getDataFromExternalSource(payload);
        console.log(response);
        const answer = await sendAnswer(token, response);
        console.log(answer);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

await screaperTask();
