import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {Configuration, OpenAIApi} from "openai";

const config = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openai = new OpenAIApi(config);

const router = express.Router();

router.get("/", async (req, res) => {
    const {language, text, emtotx} = req.query;
    let response = ""
    if (emtotx === "false"){
        response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            top_p: 1,
            temperature: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 2048,
            messages: [
                {
                    role: "system",
                    content: "You are an AI model that converts given text to emojis. Just return emojis, don't answer, don't add any additional text. Just return emoji response"
                },
                {
                    role: "user",
                    content: `Text: ${text}`
                }
            ]
        })
    }else{
        response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            top_p: 1,
            temperature: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 2048,
            messages: [
                {
                    role: "system",
                    content: "You are an AI model that converts given emojis to plain text. Just return text, don't answer, don't add any additional text. Just return translated response"
                },
                {
                    role: "user",
                    content: `Text: ${text}\nLanguage: ${language}`
                }
            ]
        })
    }

    res.json({
        response: response.data.choices[0].message.content
    })

})

export default router;