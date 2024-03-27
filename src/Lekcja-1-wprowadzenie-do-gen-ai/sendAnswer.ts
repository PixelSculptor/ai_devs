// function which send task answer to the server
export const sendAnswer = async (token: string, answer: unknown) => {
    return new Promise(async (resolve, reject) => {
        try {
            const answerResponse = await (
                await fetch(`${process.env.API_URL}/answer/${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        answer: answer,
                    }),
                })
            ).json();
            resolve(answerResponse);
        } catch (error) {
            reject(`Error while sending answer ${error}`);
        }
    });
};
