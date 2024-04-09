import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { values } from '../utils/getCommandArgs';

async function taskKnowledge() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log(taskDescription);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
}

await taskKnowledge();
