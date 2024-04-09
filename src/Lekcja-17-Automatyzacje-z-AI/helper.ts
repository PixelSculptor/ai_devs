import { BaseMessageChunk } from 'langchain/schema';
import { Category, Task } from './types.dt';

export function parseFunctionCall(
    result: BaseMessageChunk,
): { name: string; args: any[] } | null {
    if (result?.additional_kwargs?.function_call === undefined) {
        return null;
    } else if (result.additional_kwargs.function_call.name !== 'matchTool') {
        return null;
    }
    return {
        name: result.additional_kwargs.function_call.name,
        args: JSON.parse(result.additional_kwargs.function_call.arguments),
    };
}

export const matchTool = (
    tool: Category,
    desc: string,
    date?: string,
): Task => {
    if (tool === 'Calendar' && date) {
        return { tool, desc, date };
    }
    return { tool, desc };
};
