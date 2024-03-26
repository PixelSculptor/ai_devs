import { values } from "../utils/getCommandArgs";

import { getTaskDescription } from "../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription";
import { sendAnswer } from "../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer";
import { getAuthorizeToken } from "../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken";
import { getPizzaBlogChapter } from "./pizzaCook";


async function blogger(){
    try {
        const articleSections = [];
        const token = await getAuthorizeToken(values);
        if(token === undefined) throw Error("Token is undefined");
        const task = await getTaskDescription(token);
        if(task !== undefined && 'blog' in task && Array.isArray(task.blog)){ {
            for await(const title of task.blog){
                const chapter = await getPizzaBlogChapter(title)
                articleSections.push(chapter);
            }
        }
        return await sendAnswer(token, articleSections);
        
    }
    } catch (error) {
        console.error('Error while blogging: ', error);
    }
}

console.log(await blogger());