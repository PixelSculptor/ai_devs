import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: Bun.env.OPEN_AI_KEY });

const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: 'A painting easter chicken',
});

console.log(response.data);
