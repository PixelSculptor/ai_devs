import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "langchain/prompts"


const context = `Italian pizza is the best in the world. It is made with fresh ingredients and baked in a wood-fired oven. The crust is thin and crispy, and the toppings are simple and delicious. The most popular toppings are mozzarella cheese, tomato sauce, and fresh basil. The pizza is cooked quickly at a high temperature, so the crust is crispy and the cheese is melted and bubbly. Italian pizza is a classic dish that is loved by people all over the world.`

const systemTemplate = `As a {role} I want to answer give a brief description of Italian cusine in few listed steps based on context below.

context###{context}###
`

const humanTemplate = `{text}`



const chat = new ChatOpenAI({ modelName: "gpt-3.5-turbo", openAIApiKey: Bun.env.OPEN_AI_KEY });


export async function getPizzaBlogChapter(titleChapter: string) {
    try {
        const chatPrompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                systemTemplate
            ],
            [
                "human",
                humanTemplate
            ]
        ]);
        
        const formattedPrompt = await chatPrompt.formatMessages({
            context,
            role: "Italian chef from Napoli",
            text: `I am preparing a blogpost about Italian Margherita pizza. Write paragraph proposition in polish based on title: ${titleChapter}. Limit your answer to be clear but not too long.`
        });
    
        const {content} = await chat.invoke(formattedPrompt);

        if(content === undefined) throw Error("Content is undefined");
        
        return content;
    } catch (error) {
        console.error('Error while getting pizza blog chapters: ', error);
    }
}
