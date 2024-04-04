import { values } from '../utils/getCommandArgs';

import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { getArticleLinks } from './getArticleLinks';

async function searchTask() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log(taskDescription);
        // regex to extract url:
        const urlRegex = /https?:\/\/[^\s]+/g;
        const urls = taskDescription.msg.match(urlRegex);
        if (!urls || urls.length === 0) {
            throw new Error('No urls found');
        }
        console.log(urls[0]);
        const links = await getArticleLinks(urls[0]);
    } catch (e) {
        console.error(e);
    }
}

await searchTask();
