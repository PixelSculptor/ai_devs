import { values } from '../utils/getCommandArgs';

import * as resolveTaskUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { guessWho } from './guessWho';

async function whoamiTask() {
    try {
        let token = '';
        let numberOfNeededHints = 1;
        let character = 'NIE';
        while (character === 'NIE') {
            token = await resolveTaskUtils.getAuthorizeToken(values);
            const taskDescription = await resolveTaskUtils.getTaskDescription(
                token,
            );
            if (!taskDescription.hint) throw new Error('Hint is missing');
            character = await guessWho(taskDescription.hint);
            numberOfNeededHints++;
        }
        const answer = await resolveTaskUtils.sendAnswer(token, character);
        if (answer.code === -777) {
            console.log(answer);
            throw new Error(answer.msg);
        } else {
            console.log(
                'Task completed successfully',
                answer,
                `\n Number of needed hints: ${numberOfNeededHints}`,
            );
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error while running whoamiTask: ', error.message);
        } else {
            console.error('Error while running whoamiTask: ', error);
        }
    }
}

await whoamiTask();
