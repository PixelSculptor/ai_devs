import { values } from '../utils/getCommandArgs';
import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { prepareOptimizeDb } from './prepareOptimizeDb';

async function optimaldbTask() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log(taskDescription);
        const personalDB = await prepareOptimizeDb();
        console.log(personalDB);
        const answer = await resolveUtils.sendAnswer(token, personalDB);
        console.log(answer);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

await optimaldbTask();
