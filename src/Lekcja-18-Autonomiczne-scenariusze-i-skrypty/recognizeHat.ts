import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';

const chat = new ChatOpenAI({
    modelName: 'gpt-4-turbo',
    openAIApiKey: process.env.OPEN_AI_KEY,
});

export function recognizeHat(url: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const { content: imageRecognition } = await chat.invoke([
                new SystemMessage(
                    `I am assisant and recognize patterns on images from user url. I am returning color of that gnome's hat and only color name in polish. If there is no gnome on the picture, I return 'ERROR' message.`,
                ),
                new HumanMessage({
                    content: [
                        {
                            type: 'text',
                            text: "What is color of gnome's color",
                        },
                        {
                            image_url: {
                                url,
                            },
                            type: 'image_url',
                        },
                    ],
                }),
            ]);
            console.log('Color: ', imageRecognition);
            resolve(imageRecognition.toString());
        } catch (error) {
            reject(error);
        }
    });
}
