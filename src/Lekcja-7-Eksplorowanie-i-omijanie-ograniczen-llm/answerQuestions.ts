import { ChatOpenAI } from "@langchain/openai";
import { Document } from "langchain/document";
import { HumanMessage, SystemMessage } from "langchain/schema";

export async function answerQuestions(database: string, name: string, question: string){
    const model = new ChatOpenAI({openAIApiKey: Bun.env.OPEN_AI_KEY});
    
    const doc = new Document({
            pageContent: database,
            metadata: {source: name}
        })
    console.log(doc);
    const {content} = await model.invoke([
        new SystemMessage(`
        Answer questions about ${doc.metadata} as truthfully using the context below and nothing more. If there is no information about ${doc.metadata} in the context, please respond with "I don't know".

            ###context: ${doc.pageContent} ###
        `),
        new HumanMessage(question)
    ]);
    return content;
}