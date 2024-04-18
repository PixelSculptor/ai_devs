import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';

const model = new ChatOpenAI({ modelName: Bun.env.FINE_TUNED_MODEL_ID });

export async function parseTextToHtml(text: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const { content } = await model.invoke([
                new SystemMessage(
                    `I am Markdown to HTML parser. I always convert user text saved in markdown notation to HTML following rules which were saved in my based knowlege. I only return answer in HTML format without original text.
                    I have to pay attention for this rules:
                    - for underline text (_text_) I use <u></u> custom tags
                    - for bold text (**bold**) I use <span class="bold">text</span>
                    - for italic(cursive) text (*text*) I use <em>text</em> 
                    `,
                ),
                new HumanMessage(text),
            ]);
            console.log(content);
            resolve(content.toString());
        } catch (error) {
            reject(error);
        }
    });
}
