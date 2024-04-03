type AnswerType = {
    code: number;
    msg: string;
    note?: string;
};

// type guard to check AnswerType:
const isAnswerType = (response: unknown): response is AnswerType => {
    return (
        (response as AnswerType).code !== undefined &&
        (response as AnswerType).msg !== undefined
    );
};

// function which send task answer to the server
export const sendAnswer = async (
    token: string,
    answer: unknown,
): Promise<AnswerType> => {
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
            if (isAnswerType(answerResponse)) {
                resolve(answerResponse);
            }
        } catch (error) {
            reject(`Error while sending answer ${error}`);
        }
    });
};
