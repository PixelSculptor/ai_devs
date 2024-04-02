import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from 'langchain/prompts';

type InputMessage = {
    msg: string;
    input: string;
    question: string;
};

const chat = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: Bun.env.OPEN_AI_KEY,
});

export async function getDataFromExternalSource({
    input,
    msg,
    question,
}: InputMessage) {
    return new Promise(async (resolve, reject) => {
        try {
            let notes = '';
            let attempts = 0;
            const maxAttempts = 10;
            do {
                try {
                    const response = await fetch(input, {
                        headers: {
                            'User-Agent': 'Chrome 123.0.6312.86/87',
                        },
                    });
                    if (!response.ok && response.status === 403) {
                        console.log(response);
                        throw new Error(
                            'Failed to fetch data. 403 Forbidden. Bot is blocked.',
                        );
                    }
                    const notes = await response.text();

                    if (notes.length > 0) {
                        break;
                    }
                } catch (error) {
                    console.log('Error fetching data, retrying...', error);
                    attempts++;
                    if (attempts === maxAttempts) {
                        throw new Error('Maximum attempts reached');
                    }
                    await new Promise((resolve) =>
                        setTimeout(resolve, Math.pow(2, attempts) * 1000),
                    );
                }
            } while (true);
            const systemTemplate = `As a {role} I answer questions based ONLY external information from {context}. I am following this rules to provide best answers ${msg}.
            context###{context}###`;
            const humanTemplate = `{text}`;
            const chatPrompt = ChatPromptTemplate.fromMessages([
                ['system', systemTemplate],
                ['human', humanTemplate],
            ]);
            const formattedPrompt = await chatPrompt.formatMessages({
                context: notes,
                role: 'Italian Cusines Enthusiast',
                text: question,
            });
            const { content } = await chat.invoke(formattedPrompt);
            if (!content) throw Error('Content is undefined');
            resolve(content);
        } catch (error) {
            reject(error);
        }
    });
}
