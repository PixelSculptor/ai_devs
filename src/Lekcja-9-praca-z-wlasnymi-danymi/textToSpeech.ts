import https from 'https';
import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: Bun.env.OPEN_AI_KEY });

export async function textToSpeech(url: string) {
    return new Promise((resolve, reject) => {
        const path = 'src/Lekcja-9-praca-z-wlasnymi-danymi/mateusz.mp3';
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
