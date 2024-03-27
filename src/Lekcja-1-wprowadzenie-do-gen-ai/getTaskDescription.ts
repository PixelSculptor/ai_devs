import type { TaskResponse } from '../types/commonTypes';

// type guard to check TaskResponse:
export const isTaskResponse = (response: unknown): response is TaskResponse => {
    if (
        (response as TaskResponse).code !== undefined &&
        (response as TaskResponse).msg !== undefined
    ) {
        return true;
    }
    return false;
};

// Function which gets task token and get description of the task
export const getTaskDescription = async (
    token: string,
): Promise<TaskResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const task = await (
                await fetch(`${process.env.API_URL}/task/${token}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).json();

            if (isTaskResponse(task)) {
                resolve(task);
            } else {
                reject({ msg: 'Bad Request', code: 400, input: [] });
            }
        } catch (error) {
            reject(`Error while fetching task description ${error}`);
        }
    });
};
