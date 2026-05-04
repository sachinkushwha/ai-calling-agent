// import { createChat } from "./ai.js";

// async function test() {
//   const chat = createChat();

//   const result = await chat.sendMessage("Hello bhai kya kar sakte ho?");
//   const reply = result.response.text();

//   console.log("AI Reply:", reply);
// }

// test();
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KYE);

// async function checkModels() {
//   const models = await genAI.listModels();
//   console.log(models);
// }

// checkModels();

// import dotenv from 'dotenv';
// dotenv.config();

// const apiKey = process.env.GEMINI_API_KYE;
// console.log("API Key mil rahi hai?", apiKey ? "Haan - " + apiKey.slice(0,8) + "..." : "NAHI - undefined hai!");

// const res = await fetch(
//   `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
// );
// const data = await res.json();

// if (data.error) {
//   console.log("API Error:", data.error.message);
// } else {
//   const chatModels = data.models
//     .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
//     .map(m => m.name);
//   console.log("Available models:", chatModels);
// }

// import dotenv from 'dotenv';
// import { OpenAI } from 'openai/client.js';
// dotenv.config();

// const client=new OpenAI({
//     baseURL:'https://openrouter.ai/api/v1',
//     apiKey:process.env.openaikey
// })
// export function createChat(){
//    return {
//     async sendMessage(text){
//         const res=await client.chat.completions.create({
//             model: "openai/gpt-3.5-turbo",
//             messages:[
//                 {
//                     role:'system',
//                     content:'your are a super inteligent ai ,which is made by sachin '
//                 },
//                 {
//                     role:'user',
//                     content:text
//                 },
//             ]
//         });
//         return  res.choices[0].message.content;
//     }
//    }
// }
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KYE);

// const model = genAI.getGenerativeModel(
//     { model: "gemini-2.0-flash" },    // v1 ki jagah v1beta
// );

// export async function askAI(prompt) {
//     try {
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         return response.text();
//     } catch (err) {
//         console.error("AI Fetch Error:", err.message);
//         return "Error: AI response generate nahi ho paya.";
//     }
// }
