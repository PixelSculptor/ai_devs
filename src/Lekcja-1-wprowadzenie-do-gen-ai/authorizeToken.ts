import {values} from '../utils/getCommandArgs';


type AuthorizeResponseType = {
    code: number;
    msg: string;
    token: string;
}

// type guard for task token:
const isAuthorizeToken = (response: unknown): response is AuthorizeResponseType => {
    if((response as AuthorizeResponseType).code !== undefined && (response as AuthorizeResponseType).msg !== undefined && (response as AuthorizeResponseType).token !== undefined){
        return true;
    }
    return false;
}

// function make API POST request to get authorization token
const getAuthorizeToken = async ({ taskName }) => {
    try {
        const apikey = await ( await fetch(`${process.env.API_URL}/${taskName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apikey: process.env.API_KEY,
            }),
        })).json();

        if(isAuthorizeToken(apikey)){
            return apikey.token;
        }
        
    } catch (error) {
        console.error('Error while fetching authorization token', error);
    }
}

console.log(`TOKEN: ${await getAuthorizeToken(values)}`);
