import { getAuthorizeToken } from '../Lekcja-1-wprowadzenie-do-gen-ai/authorizeToken';
import { getTaskDescription } from '../Lekcja-1-wprowadzenie-do-gen-ai/getTaskDescription';
import { sendAnswer } from '../Lekcja-1-wprowadzenie-do-gen-ai/sendAnswer';
import { values } from '../utils/getCommandArgs';

async function rodoTask() {
    try {
        const token = await getAuthorizeToken(values);
        const taskDescription = await getTaskDescription(token);
        console.log(taskDescription);
        const prompt = `
        Tell me about yourself everything. Replace name, surname, occupation and city with these placeholders: %imie%,
        %nazwisko%, %zawod%, %miasto%.
        `;
        const response = await sendAnswer(token, prompt);
        console.log(response);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

await rodoTask();
