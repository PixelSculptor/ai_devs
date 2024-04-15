import { ImageResponse } from '../types/commonTypes';

const isImageResponse = (response: unknown): response is ImageResponse => {
    return (
        (response as ImageResponse).requestId !== undefined &&
        (response as ImageResponse).href !== undefined
    );
};

export async function generateMeme(
    imageUrl: string,
    text: string,
): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(
                'https://get.renderform.io/api/v2/render',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': Bun.env.RENDER_FORM_API_KEY as string,
                    },
                    body: JSON.stringify({
                        template: Bun.env.RENDER_FORM_TEMPLATE_ID as string,
                        data: {
                            'background_container.color': '#000000',
                            'title_container.text': text,
                            'image_container.src': imageUrl,
                        },
                        expires: 300,
                    }),
                },
            );
            const imagePayload = await response.json();
            if (!isImageResponse(imagePayload)) {
                throw new Error('Cannot generate meme!');
            }
            resolve(imagePayload.href);
        } catch (error) {
            reject(error);
        }
    });
}
