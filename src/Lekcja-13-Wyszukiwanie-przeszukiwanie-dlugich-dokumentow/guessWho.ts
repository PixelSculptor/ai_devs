import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { Document } from 'langchain/document';
import {
    HumanMessage,
    SystemMessage,
    type MessageContent,
} from 'langchain/schema';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

const documents: Document[] = [];
const chat = new ChatOpenAI({ modelName: 'gpt-3.5-turbo' });
const query = 'Zgadnij znaną postać';

export async function guessWho(hint: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            documents.push(new Document({ pageContent: hint }));
            console.log(documents.map((doc) => doc.pageContent).join('\n'));
            const vectorStore = await MemoryVectorStore.fromDocuments(
                documents,
                new OpenAIEmbeddings(),
            );
            const context = await vectorStore.similaritySearch(query, 5);
            const { content } = await chat.invoke([
                new SystemMessage(`Odpowiadam na pytania szczerze używając tylko i wyłącznie kontekstu poniżej oraz swojej bazowej wiedzy i niczego więcej. Jeśli znam odpowiedź zwracam tylko i wyłącznie ją. Jeśli nie znam odpowiedzi na pytanie to odpowiadam tylko słowem: NIE 
            kontekst###${context.map((doc) => doc.pageContent).join('\n')}`),
                new HumanMessage(query),
            ]);
            console.log('Kim jestem: ', content);
            resolve(content.toString());
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error while running search: ', error.message);
                reject(error);
            } else {
                console.error('Error while running search: ', error);
            }
        }
    });
}
