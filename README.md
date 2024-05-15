### Description

The aim of this project is assigning a specific job to GPT. And trying to understand user messages' intent whether is an appointment request with specific date/time or not, basically labelling
There are some rules assigned to GPT, you can see them as `systemContent` in `/routes/appointment.ts`
The tests are written in Turkish language but the system I tried to build is trying to support other languages that OpenAI supports (`systemContent` is written in English)
Its using `gpt-3.5-turbo`

Ps. The main part of this project is prompt engineering: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api (this is the main part of this project)

### How it works?
- Its an API endpoint that extracts the user intent for a new appointment from a natural language message using GPT4.
- Handles both relative and absolute time and date. For example `today`, `tomorrow`, `this Friday`, `30 of July` (or from other languages for example in Turkish `bugün`)
- No "parsing" natural language - GPT4 is doing that for us.
- Given a message like `Are you free for tomorrow at 2pm?`, the API endpoint output a JSON similar to the following (this example assumes the date is `2023-07-29`): `{ intent: "new_appointment", datetimeStr: "2023-07-30T14:00" }`
- Included a suite of tests that call the API endpoint with a few different example inputs. Tests are asserting that the correct intent and datetime is extracted, also assert that intents other than new appointments are  classified as "other."

### How to setup
1. Clone this project
2. Install dependencies using yarn (`yarn install`)
3. Create an env file called `.env.local` under root folder
4. Add `PORT` env variable to `.env.local` file
5. Create your own OpenAI API key and add it as env variable in `.env.local`
6. So resulting `.env.local` file should look like
```
PORT=<example_port>
OPENAI_API_KEY=<your OpenAI API key>
```
7. Run `yarn start:dev` for development
8. Run `yarn test` to run tests
9. Make a `GET` request to /appointment-intent to `extracts the user intent for a new appointment`
10. Make a `GET` request to /appointment-classify to start building your own classifier model (please read `CLASSIFICATION_README`)
11. Make a `GET` request to /ask to chat with OpenAI API (please read `ASK_README`)

### Things can be improved
In the project I tried to keep time zones into consideration but in some scenerios its working flaky. Based on the run time
For example if you are in Turkey and run this project at night there can be some +/- 1day.
You can observe this with running the tests (please check `expected` & `received` difference). So I advise you to run it at noon :D

Also since this project using GPT, we shouldnt expect 100% correctness.

- Sinan Talha KOSAR (sinantalhakosar@gmail.com)