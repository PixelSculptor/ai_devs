import path from 'path';
import https from 'https';
import fs from 'fs';
import OpenAI from 'openai';
import FormData from 'form-data';

const openai = new OpenAI({ apiKey: Bun.env.OPEN_AI_KEY });

export async function textToSpeach(url: string) {
    return new Promise((resolve, reject) => {
        const path = './audio.mp3';
        const file = fs.createWriteStream(path);

        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', async () => {
                file.close();
                try {
                    const readStream = fs.createReadStream(path);
                    const transcription =
                        await openai.audio.transcriptions.create({
                            file: readStream,
                            model: 'whisper-1',
                            response_format: 'text',
                        });
                    resolve(transcription);
                } catch (error) {
                    reject(error);
                }
            });
        });
    });
}
