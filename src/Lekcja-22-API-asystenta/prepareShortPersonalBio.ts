import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';

const model = new ChatOpenAI({ modelName: 'gpt-3.5-turbo' });
const CHUNK_SIZE = 5;

const systemMessage =
    new SystemMessage(`Extract 4 comma-separated keywords for each of the sentences to serve as a base of information about the person. If there is a proper name for something, add it. Omit the keyword if it is to be a name. Do not add any additional commentary. Return the answer in English.
`);

export async function prepareShortPersonalBio(
    personalDB: string[],
): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const summaries: string[] = [];
            for (let i = 0; i < personalDB.length; i += CHUNK_SIZE) {
                const chunk = personalDB.slice(i, i + CHUNK_SIZE);
                const { content } = await model.invoke([
                    systemMessage,
                    new HumanMessage(chunk.join('\n')),
                ]);
                summaries.push(content.toString());
            }
            const bio = summaries.join(',');
            resolve(bio);
        } catch (error: unknown) {
            if (error instanceof Error) {
                reject(error.message);
            } else {
                reject('An error occurred while preparing short bio');
            }
        }
    });
}
