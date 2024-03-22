import { ChatOpenAI } from "@langchain/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const chat = new ChatOpenAI({ modelName: "gpt-3.5-turbo", openAIApiKey: Bun.env.OPEN_AI_KEY });

const guardPrompt = `Return YES or NO if the prompt: {response} is not related with {prompt} Answer:`;

export async function guardRail(response: string): Promise<string> {
    const prompt = PromptTemplate.fromTemplate(guardPrompt);

    const chain = new LLMChain({llm: chat, prompt: prompt})

    const { text } = await chain.call({prompt, response});

    return parseInt(text) === 1 ? "YES" : "NO";
}
