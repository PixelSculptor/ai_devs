import { values } from '../utils/getCommandArgs';
import { getAuthorizeToken } from '../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken';
import { getTaskDescription } from '../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription';
import { sendAnswer } from '../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer';
import { textToSpeach } from './textToSpeach';

const getResourceUrl = (text: string) => {
    const regex = /(https?:\/\/[^\s]+)/g;
    const match = text.match(regex);
    if (match) {
        const url = match[0];
        return url;
    }
    throw new Error('No URL found');
};

async function whisperTask() {
    try {
        const token = await getAuthorizeToken(values);
        const task = await getTaskDescription(token);
        const url = getResourceUrl(task.msg);
        const transcription = await textToSpeach(url);
        // console.log('transcription:', transcription);
        const answer = await sendAnswer(token, transcription);
        console.log('answer:', answer);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

await whisperTask();
