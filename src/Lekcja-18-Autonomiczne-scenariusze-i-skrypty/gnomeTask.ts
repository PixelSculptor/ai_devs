import { values } from '../utils/getCommandArgs';
import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { recognizeHat } from './recognizeHat';

async function gnomeTask() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log(taskDescription);
        if (!taskDescription.url) {
            throw new Error('Url not found');
        }
        const color = await recognizeHat(taskDescription.url);
        const answer = await resolveUtils.sendAnswer(token, color);
        console.log(answer);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Error: ', error);
        }
    }
}

await gnomeTask();
