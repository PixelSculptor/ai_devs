import type { TaskNameType } from '../types/commonTypes';
import { values } from '../utils/getCommandArgs';

type AuthorizeResponseType = {
    code: number;
    msg: string;
    token: string;
};

// type guard for task token:
const isAuthorizeToken = (
    response: unknown,
): response is AuthorizeResponseType => {
    if (
        (response as AuthorizeResponseType).code !== undefined &&
        (response as AuthorizeResponseType).msg !== undefined &&
        (response as AuthorizeResponseType).token !== undefined
    ) {
        return true;
    }
    return false;
};

// function make API POST request to get authorization token
export const getAuthorizeToken = async ({
    taskName,
}: TaskNameType): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (taskName === undefined) reject('Task name is undefined');

            const apikey = await (
                await fetch(`${process.env.API_URL}/token/${taskName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apikey: process.env.API_KEY,
                    }),
                })
            ).json();

            if (isAuthorizeToken(apikey) && apikey.token !== undefined) {
                resolve(apikey.token);
            } else {
                reject('API response is not valid');
            }
        } catch (error) {
            reject(`Error while fetching authorization token ${error}`);
        }
    });
};

// console.log(await getAuthorizeToken(values));
