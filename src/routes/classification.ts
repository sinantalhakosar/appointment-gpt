// This file is for trial of fine-tuning, please check README file for more context
// Not directly outputs the requirements, main code is in completion.ts

import { Router, Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config({path: '.env.local'});

let fs = require('fs');

// OpenAIApi required config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
    
// OpenAIApi initialization
const openaiApi = new OpenAIApi(configuration);

const uploadFile = async () => {
    try {
        const f = await openaiApi.createFile(
            fs.createReadStream(`${__dirname}/data.jsonl`) as any,
            "fine-tune"
        );
        console.log(`File ID ${f.data.id}`);
        return f.data.id;
    }
    catch (err) {
        console.log('err uploadfile: ', err);
    } 
};

const makeFineTune = async () => {
    try {
        const ft = await openaiApi.createFineTune({
            training_file: 'file-2QosUSdd8pj6wUgVYDyVoh1o',
            model: 'davinci'
        });
        console.log(ft.data);
     }
    catch (err) {
        console.log('err makefinetune: ', err.response.data.error);
    }
}
const getFineTunedModelName = async () => {
    try {
        const modelName = await openaiApi.listFineTunes();
        console.table(modelName.data.data, ["id", "status", "fine_tuned_model"]);

    }
    catch (err) {
        console.log('err getmod: ', err)
    }
 }

const generateResponse = async (req: Request, res: Response) => {
    try {
        const comp = await openaiApi.createCompletion({
            model: 'YOUR-FINETUNED-MODEL-NAME',
            prompt: `Is the intent behind the followint user message ${req.body.message} is to create a new appointment request?`,
            max_tokens: 200
        });
        if (comp.data) {
            console.log('choices: ', comp.data.choices)
        }
        res.status(200).send(JSON.parse(comp.data.choices[0].text))
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const router = Router();

router.get('/', generateResponse)

export default router;

