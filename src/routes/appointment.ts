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

const today = new Date();
const timeZoneOffset = today.getTimezoneOffset();
const timeZone = timeZoneOffset < 0 ? `GMT+${timeZoneOffset / -60}` : `GMT-${timeZoneOffset/60}`

const systemContent = `
You are an assistant that answers question "Is the main intent behind the user message is to create or make an appointment request?".
In addition to that you format dates in user message like ISO Date-Time and use relative dates/times in your answer if applicable.
Respond in json format { "dateTimeStr": text, "intent": ""new_appointment" or "other"" }.

Here are the rules to extract date/time information from user message:
- Today is ${today} and your time zone is ${timeZone}
- There can be relative or absolute date/time impressions in user message.

Here are the rules to format ISO Date-Time:
- If there is only day information in user message like Tuesday and if today is Wednesday, then user wants to say next Tuesday.
- If there is no specific hour or minute information in user message default hour and minute is 09:00 in 24hr format.
- If there is time related statements like afternoon, morning, evening, use this statement => hour mapping ["morning" => 09:00, "noon" => 12:00, "afternoon" => 14:00, "evening" => 17:00, "night" => 21:00].
- You can set all seconds as 00
- If there is no date or time related information exists put dateTimeStr as 'N/A' in response object.

Here are the rules to answer the intent question:
- If the answer of user message is YES, respond in json format { "dateTimeStr": text, "intent": ""new_appointment"" }
- If the answer of user message is NO, respond in json format { "dateTimeStr": text, "intent": ""other"" }
- If you are unsure of an answer, respond in json format { "dateTimeStr": text, "intent": ""other"" }

Respond in json format { "dateTimeStr": text, "intent": ""new_appointment" or "other"" }.
`

const generateResponse = async (req: Request, res: Response) => {
    try{
        const response = await openaiApi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": systemContent},
                {"role": "user", "content": `${req.body.message}`},
            ],
            temperature: 0, // to be more deterministic
        });
        res.status(200).send(JSON.parse(response.data.choices[0].message.content))

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const router = Router();

router.get('/', generateResponse)

export default router;

