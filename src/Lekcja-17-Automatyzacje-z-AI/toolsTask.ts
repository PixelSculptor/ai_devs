import { values } from '../utils/getCommandArgs';
import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { toolMatchingSchema } from './toolsMatching';

async function toolTask() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log('Task description:', taskDescription.question);
        if (!taskDescription.question) {
            throw new Error('Task description is empty');
        }
        console.log('Task description:', taskDescription);
        const taskCategorized = await toolMatchingSchema(
            taskDescription.question,
        );
        console.log(taskCategorized);
        const answer = await resolveUtils.sendAnswer(token, taskCategorized);
        console.log('Answer:', answer);
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        } else {
            console.log('Error:', error);
        }
    }
}

await toolTask();
