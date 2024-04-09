import { ChatOpenAI } from '@langchain/openai';
import { currencyValueSchema, countryInfoSchema } from './schemas';
import { getCountryCurrencyValue, getInfoAboutCountry } from './countryInfos';
import { ITools } from './types.dt';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { parseFunctionCall } from './helpers';
import { TypeCurrency } from './ICurrency';

const model = new ChatOpenAI({ modelName: 'gpt-4-0613' }).bind({
    functions: [currencyValueSchema, countryInfoSchema],
});

const tools: ITools = {
    getCountryCurrencyValue: getCountryCurrencyValue,
    getInfoAboutCountry: getInfoAboutCountry,
};

export const act = async (query: string): Promise<string> => {
    console.log('User: ', query);
    try {
        const conversation = await model.invoke([new HumanMessage(query)]);
        const action = parseFunctionCall(conversation);
        if (action && tools[action.name]) {
            if (action.name === 'getCountryCurrencyValue') {
                const result = await tools[action.name](
                    action.args.currencyCode,
                );
                console.log(
                    `AI: Aktualny kurs waluty ${result.currency}(${result.code}) to ${result.mid}zł`,
                );
                return `Aktualny kurs waluty ${result.currency}(${result.code}) to ${result.mid}zł`;
            } else if (action.name === 'getInfoAboutCountry') {
                const result = await tools[action.name](action.args.population);
                console.log(
                    `AI: Populacja kraju ${result.name} to ${result.population}.`,
                );
                return `Populacja kraju ${result.name} to ${result.population} ludzi.`;
            }
        }

        console.log(`AI: ${conversation.content}.`);
        return JSON.stringify(conversation.content);
    } catch (error) {
        console.log(error);
        return 'Error';
    }
};
