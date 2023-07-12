import { Router, Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config({path: '.env.local'});

// OpenAIApi required config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
    
// OpenAIApi initialization
const openaiApi = new OpenAIApi(configuration);

const generateResponse = async (req: Request, res: Response) => {
    try{
        const response = await openaiApi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "user", "content": `${req.body.message}`},
            ],
            temperature: 0, // to be more deterministic
        });
        res.status(200).send(response.data.choices)

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const router = Router();

router.get('/', generateResponse)

export default router;