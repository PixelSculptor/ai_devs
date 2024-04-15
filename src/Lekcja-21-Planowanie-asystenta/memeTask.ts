import { values } from '../utils/getCommandArgs';
import * as utils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { ImageMetadata } from '../types/commonTypes';
import { generateMeme } from './generateMeme';

async function memeTask() {
    try {
        const token = await utils.getAuthorizeToken(values);
        const taskDescription = await utils.getTaskDescription(token);

        console.log(taskDescription);
        if (
            (taskDescription as ImageMetadata).text === undefined &&
            (taskDescription as ImageMetadata).image === undefined
        ) {
            throw new Error('Cannot get required data from API');
        }
        const { image, text } = taskDescription as ImageMetadata;
        const memeUrl = await generateMeme(image, text);
        console.log(memeUrl);
        const answer = await utils.sendAnswer(token, memeUrl);
        console.log(answer);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error while running meme task: ', error.message);
        } else {
            console.error('Error while running meme task: ', error);
        }
    }
}

await memeTask();
