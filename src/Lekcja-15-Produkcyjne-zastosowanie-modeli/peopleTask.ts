import * as resolveUtils from '../Lekcja-1-wprowadzenie-do-gen-ai/index';
import { values } from '../utils/getCommandArgs';
import { importDataToDB, search } from './vectorDbActions';
import { getData } from './getData';
import { transformPerson } from './transformPerson';
import { answerQuestionAboutPerson } from './answerQuestionAboutPerson';

async function peopleTask() {
    try {
        const token = await resolveUtils.getAuthorizeToken(values);
        const taskDescription = await resolveUtils.getTaskDescription(token);
        console.log(taskDescription);
        if (
            typeof taskDescription?.data === 'string' &&
            taskDescription?.question
        ) {
            const data = await getData(taskDescription.data);
            console.log(`Data length: ${data.length}`);
            // await importDataToDB(data);
            // znajdz osobe
            // przetransformuj dane
            // wyslij pytanie z kontekstem do api
            // wyslij odpowiedz
            const personContext = transformPerson(
                await search(taskDescription.question),
            );

            console.log(personContext);

            const responseAboutPerson = await answerQuestionAboutPerson(
                taskDescription.question,
                personContext,
            );

            console.log(responseAboutPerson);
            const answer = await resolveUtils.sendAnswer(
                token,
                responseAboutPerson,
            );
            console.log(answer);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

await peopleTask();
