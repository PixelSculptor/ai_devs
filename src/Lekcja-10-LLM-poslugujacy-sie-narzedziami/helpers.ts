import { BaseMessageChunk } from 'langchain/schema';
import type { FunctionNames } from './types.dt';

// function name checker
const verifyFunctionNames = (name: string): name is FunctionNames => {
    return name === 'addUser';
};

export const parseFunctionCall = <T>(
    result: BaseMessageChunk,
): { name: FunctionNames; args: T } | null => {
    if (result?.additional_kwargs?.function_call === undefined) {
        return null;
    } else if (
        !verifyFunctionNames(result.additional_kwargs.function_call.name)
    ) {
        return null;
    }
    return {
        name: result.additional_kwargs.function_call.name,
        args: JSON.parse(result.additional_kwargs.function_call.arguments),
    };
};
