import type { TaskResponse } from '../types/commonTypes';
import { values } from "../utils/getCommandArgs";

// type guard to check TaskResponse:
const isTaskResponse = (response: unknown): response is TaskResponse => {
    if((response as TaskResponse).code !== undefined && (response as TaskResponse).msg !== undefined){
        return true;
    }
    return false;
}

// Function which gets task token and get description of the task
export const getTaskDescription = async ( token: string | undefined): Promise<TaskResponse | undefined> => {
    try {
        if(token === undefined) throw Error("Token is undefined");
        const task = await (await fetch(`${process.env.API_URL}/task/${token}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })).json();
        
        if(isTaskResponse(task)){
            return task;
        }
        return {msg: "Bad Request", code: 400, input: []};
    } catch (error) {
        console.error('Error while fetching task description', error);
    }
}
