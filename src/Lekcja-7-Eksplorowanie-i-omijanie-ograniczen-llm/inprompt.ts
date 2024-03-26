import { values } from "../utils/getCommandArgs";
import { getAuthorizeToken } from "../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken";
import { getTaskDescription } from "../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription";
import { findNameInQuestion, getNames, filterAnswers } from "./filterExternalData";
import { answerQuestions } from "./answerQuestions";
import { sendAnswer } from "../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer";

async function inprompt() {
    try {
        const token = await getAuthorizeToken(values);
        if(token === undefined) throw Error("Token is undefined");

        const taskDescription = await getTaskDescription(token);

        if(taskDescription === undefined) throw Error("Task description is undefined");

        if(taskDescription.question === undefined) throw Error("Question is undefined");

        const names = getNames(taskDescription.input);
        const targetName = findNameInQuestion(taskDescription.question, names);

        if(targetName === undefined) throw Error("Name not found in question");

        console.log(`question: ${taskDescription.question} targetName: ${targetName}`);

        const database = filterAnswers(taskDescription.input, targetName);
        const answerForQuestion = await answerQuestions(database, targetName, taskDescription.question);
        console.log(answerForQuestion);
        const answer = await sendAnswer(token, answerForQuestion);
        console.log(answer);

    } catch (error) {
        if(error instanceof Error) console.error(error.message);
        else console.error('Error while inprompting: ', error)
    }
}

await inprompt();