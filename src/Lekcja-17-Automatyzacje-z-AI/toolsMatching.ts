import { ChatOpenAI } from '@langchain/openai';
import { parseFunctionCall } from './helper';
import { toolsMatchingSchema } from './toolsMatchingSchema';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { ITools } from './types.dt';
import { matchTool } from './helper';

const model = new ChatOpenAI({ modelName: 'gpt-4-0613' }).bind({
    functions: [toolsMatchingSchema],
});

const tools: ITools = {
    matchTool: matchTool,
};

export async function toolMatchingSchema(task: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const conversation = await model.invoke([
                new SystemMessage(
                    `Today is ${new Date().toLocaleDateString()}`,
                ),
                new HumanMessage(task),
            ]);
            const action = parseFunctionCall(conversation);
            if (action && tools[action.name as keyof ITools]) {
                if (action.name === 'matchTool') {
                    const result = tools[action.name as keyof ITools](
                        action.args.tool,
                        action.args.desc,
                        action.args.date,
                    );
                    resolve(result);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                reject(error.message);
            }
            reject(error);
        }
    });
}
