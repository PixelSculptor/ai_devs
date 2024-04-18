import { values } from '../utils/getCommandArgs';
import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index.ts';
import { parseTextToHtml } from './parseTextToHtml.ts';

async function md2HtmlTask() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log(taskDescription);
        if (
            !Array.isArray(taskDescription.input) &&
            typeof taskDescription.input === 'string'
        ) {
            console.log(`Data to parse: ${taskDescription.input}`);
            const parsedText = await parseTextToHtml(taskDescription.input);
            const answer = await resolveUtils.sendAnswer(token, parsedText);
            console.log(answer);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
}

await md2HtmlTask();
