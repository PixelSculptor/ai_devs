import path from 'path';
import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: Bun.env.OPEN_AI_KEY });

export async function textToSpeach(url: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const filePath = path.resolve(__dirname, './mateusz.mp3');
            const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream(filePath),
                model: 'whisper-1',
                response_format: 'text',
            });

            resolve(transcription);
        } catch (error: unknown) {
            reject(error);
        }
    });
}
