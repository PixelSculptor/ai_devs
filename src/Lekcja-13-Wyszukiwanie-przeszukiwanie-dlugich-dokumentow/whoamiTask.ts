import * as fs from 'fs';

import { values } from '../utils/getCommandArgs';
import * as resolveTaskUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { guessWho } from './guessWho';

async function whoamiTask() {
    try {
        let token = await resolveTaskUtils.getAuthorizeToken(values);
        let numberOfNeededHints = 1;
        let character = 'NIE';
        while (character === 'NIE') {
            const taskDescription = await resolveTaskUtils.getTaskDescription(
                token,
            );
            if (!taskDescription.hint) throw new Error('Hint is missing');
            character = await guessWho(taskDescription.hint);
            numberOfNeededHints++;
        }
        const answer = await resolveTaskUtils.sendAnswer(token, character);
        if (answer.code === -777) {
            await resolveTaskUtils.getAuthorizeToken(values);
            throw new Error(answer.msg);
        } else {
            console.log(
                'Task completed successfully',
                answer,
                `\nNumber of needed hints: ${numberOfNeededHints}`,
            );
            fs.appendFileSync(
                'src/Lekcja-13-Wyszukiwanie-przeszukiwanie-dlugich-dokumentow/recognizeResults.txt',
                `\nNumber of needed hints: ${numberOfNeededHints}`,
            );
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error while running whoamiTask: ', error.message);
            fs.appendFileSync(
                'src/Lekcja-13-Wyszukiwanie-przeszukiwanie-dlugich-dokumentow/recognizeResults.txt',
                `\nBad answer`,
            );
        } else {
            console.error('Error while running whoamiTask: ', error);
        }
    }
}

await whoamiTask();
