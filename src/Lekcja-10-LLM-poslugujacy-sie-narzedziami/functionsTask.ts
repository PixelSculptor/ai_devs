import { values } from '../utils/getCommandArgs';
import { getAuthorizeToken } from '../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken';
import { getTaskDescription } from '../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription';
import { sendAnswer } from '../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer';
import { addUser } from './functionCalling';

async function functionTask() {
    try {
        const token = await getAuthorizeToken(values);
        const task = await getTaskDescription(token);
        console.log(task);
        const result = await addUser();
        const answer = await sendAnswer(token, result);
        console.log(answer);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
}

await functionTask();
