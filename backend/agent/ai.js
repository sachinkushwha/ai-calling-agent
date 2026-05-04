
import Groq from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();

const tools = {
    openYouTube: (args) => {
        return {
            type: 'youtube',
            query: args.query
        };
    },
    searchBrowser:(args)=>{
        return {
            type:'chrome',
            query:args.query
        }
    }
}

const groq = new Groq({ apiKey: process.env.GROK_API_KEY });

const systemPrompt = `
You are a conversational AI assistant.

You have tools, but you should use them ONLY when user clearly asks to perform an action.

TOOLS:

1. openYouTube
Use ONLY when user explicitly wants:
- play music
- play song
- youtube pe chalao
- kisi singer ka gana bajao

Return ONLY:
{"tool":"openYouTube","args":{"query":"..."}}

2. searchBrowser
Use ONLY when user explicitly says:
- search karo
- google pe search
- chrome pe search

Return ONLY:
{"tool":"searchBrowser","args":{"query":"..."}}


IMPORTANT RULES:
- Normal conversation (hello, how are you, etc.) → ALWAYS reply in normal text
- NEVER use tools for greetings or casual talk
- Use tools ONLY when user clearly gives an action command
- If unsure → respond normally, NOT with tool
`;

function extractJSON(text) {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
        return JSON.parse(match[0]);
    } catch {
        return null;
    }
}
export async function askAI(prompt) {
    try {
        const res = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",  // Free aur powerful
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ]
        });
        let text = res.choices[0].message.content;
        console.log('aires',text);

        const parsed = extractJSON(text);
        if (parsed?.tool && tools[parsed.tool]) {
            return await tools[parsed.tool](parsed.args);
        }

        return text


    } catch (err) {
        console.error("AI Error:", err.message);
        return "Error: Response generate nahi hua.";
    }
}