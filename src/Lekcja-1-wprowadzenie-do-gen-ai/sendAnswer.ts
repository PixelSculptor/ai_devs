// function which send task answer to the server
export const sendAnswer = async (token: string, answer: unknown) => {
    try {
        const answerResponse = await (await fetch(`${process.env.API_URL}/answer/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                answer: answer
            })
        })).json();
        return answerResponse;
    } catch (error) {
        console.error('Error while sending answer', error);
    }
}
