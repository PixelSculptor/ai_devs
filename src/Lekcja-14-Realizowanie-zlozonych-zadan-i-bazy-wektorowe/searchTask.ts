import { values } from '../utils/getCommandArgs';

import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { getArticleLinks } from './getArticleLinks';
import { importDataToDB, search } from './vectorDbActions';

async function searchTask() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log(taskDescription);
        if (!taskDescription.question) {
            throw new Error('No question found');
        }
        // regex to extract url:
        const urlRegex = /https?:\/\/[^\s]+/g;
        const urls = taskDescription.msg.match(urlRegex);
        if (!urls || urls.length === 0) {
            throw new Error('No urls found');
        }

        console.log(urls[0]);
        const links = await getArticleLinks(urls[0]);

        await importDataToDB(links);

        const foundUrl = await search(taskDescription.question);
        console.log(`Found url: ${foundUrl}`);

        const answer = await resolveUtils.sendAnswer(token, foundUrl);
        console.log(answer);
    } catch (e) {
        console.error(e);
    }
}

await searchTask();
