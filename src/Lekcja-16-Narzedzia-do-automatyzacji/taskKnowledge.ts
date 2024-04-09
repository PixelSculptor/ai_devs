import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { values } from '../utils/getCommandArgs';
import { act } from './functionCalling';

async function taskKnowledge() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log(taskDescription);
        if (!taskDescription.question) {
            throw new Error('No question in task description');
        }
        const response = await act(taskDescription.question);
        const answer = await resolveUtils.sendAnswer(token, response);
        console.log(`Response: `, answer);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
}

await taskKnowledge();
