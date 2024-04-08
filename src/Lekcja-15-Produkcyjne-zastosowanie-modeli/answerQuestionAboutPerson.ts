import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';

const chat = new ChatOpenAI({ modelName: 'gpt-3.5-turbo' });

export async function answerQuestionAboutPerson(
    query: string,
    personContext: string,
): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const { content } = await chat.invoke([
                new SystemMessage(
                    `Odpowiadam na pytanie o użytkowniku zgodnie z prawdą, używając tylko {context} poniżej i nic więcej. Zwrot odpowiedzi w języku polskim. Jeśli nie znam odpowiedzi na pytanie, odpowiadam tylko jednym słowem: NIE
                    ###{context}: ${personContext}`,
                ),
                new HumanMessage(query),
            ]);
            resolve(content.toString());
        } catch (error: unknown) {
            if (error instanceof Error) {
                reject(error.message);
            } else {
                reject('An error occurred while answering the question');
            }
        }
    });
}
