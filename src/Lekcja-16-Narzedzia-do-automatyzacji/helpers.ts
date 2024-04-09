import { BaseMessageChunk as LangChainBaseMessageChunk } from 'langchain/schema';
import { Country } from './ICountry';
import { type NBPResponse, type TypeCurrency } from './ICurrency';
import { FunctionNames } from './types.dt';

export const isCountry = (data: unknown): data is Country => {
    const countryKeys = Object.keys(data as Country);

    return countryKeys.every((key) => key in (data as Country));
};

export const isNBPResponse = (data: unknown): data is NBPResponse => {
    return (
        (data as NBPResponse).table !== undefined &&
        (data as NBPResponse).rates !== undefined &&
        (data as NBPResponse).no !== undefined &&
        (data as NBPResponse).effectiveDate !== undefined &&
        (data as NBPResponse).rates.every(isTypeCurrency)
    );
};

const isTypeCurrency = (data: unknown): data is TypeCurrency =>
    (data as TypeCurrency).code !== undefined &&
    (data as TypeCurrency).currency !== undefined;

// function name checker
const verifyFunctionName = (name: string): name is FunctionNames => {
    return name === 'getCountryCurrencyValue' || name === 'getInfoAboutCountry';
};

export const parseFunctionCall = (
    result: LangChainBaseMessageChunk,
): { name: FunctionNames; args: any } | null => {
    if (result?.additional_kwargs?.function_call === undefined) {
        return null;
    } else if (
        !verifyFunctionName(result.additional_kwargs.function_call.name)
    ) {
        return null;
    }
    return {
        name: result.additional_kwargs.function_call.name,
        args: JSON.parse(result.additional_kwargs.function_call.arguments),
    };
};
