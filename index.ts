import { getAuthorizeToken } from './src/Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken';
import type { TaskNameType } from './src/types/commonTypes';
import { values } from './src/utils/getCommandArgs';
import { getTaskDescription } from './src/Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription';
import { sendAnswer } from './src/Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer';

async function main({taskName}: TaskNameType){
    try {
        const token = await getAuthorizeToken({ taskName });
        if(token === undefined) throw Error("Token is undefined")
        console.log(token);
        const task = await getTaskDescription(token);
        console.log('task: ', task);
        if(task === undefined) throw Error("Task is undefined")
        const x = await sendAnswer(token, task);
        console.log(x);
    } catch (error) {
        console.error('Error while fetching task description', error);
    }
}

await main(values);