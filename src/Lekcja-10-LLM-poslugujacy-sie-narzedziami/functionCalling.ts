import { ChatOpenAI } from '@langchain/openai';

import { userSchema } from './userSchema';
import { HumanMessage } from 'langchain/schema';
import type { ITools, User } from './types.dt';
import { parseFunctionCall } from './helpers';

const model = new ChatOpenAI({ modelName: 'gpt-4-0613' }).bind({
    functions: [userSchema],
    function_call: { name: 'addUser' },
});

const tools: ITools = {
    addUser: (name: string, surname: string, yearOfBorn: number) => ({
        name,
        surname,
        year: yearOfBorn,
    }),
};

export async function addUser() {
    return new Promise(async (resolve, reject) => {
        try {
            console.log({
                functions: [userSchema],
                function_call: { name: 'addUser' },
            });

            const result = await model.invoke([
                new HumanMessage(`John Doe 1990`),
            ]);

            const action = parseFunctionCall<User>(result);

            if (action && tools[action.name]) {
                const result = tools[action.name](
                    action.args.name,
                    action.args.surname,
                    action.args.year,
                );
                console.log(`Result is: `, JSON.stringify(result));
                resolve(userSchema);
            } else {
                throw Error(JSON.stringify(result.content));
            }
        } catch (error) {
            if (error instanceof Error) {
                reject(error.message);
            } else {
                reject(error);
            }
        }
    });
}

// await addUser();
