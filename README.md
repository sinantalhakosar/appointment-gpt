### Description

The aim of this project is assigning a specific job to GPT. And trying to understand user messages' intent whether is an appointment request with specific date/time or not. Basically labelling
There are some rules assigned to GPT, you can see them as `systemContent` in `/routes/appointment.ts`
The tests are written in Turkish language but the system I tried to build is trying to support other languages that OpenAI supports (`systemContent` is written in English)
Its using `gpt-3.5-turbo`

Ps. The main part of this project is prompt engineering: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api (this is the main part of this project)

### Requirements
Build an API endpoint that extracts the user intent for a new appointment from a natural language message in Turkish using GPT4.
- Extract both relative and absolute time and date. Handle "bugün", "yarın", "bu Cuma", "30 Temmuz"
- No "parsing" natural language - GPT4 should be doing that for you.
- Given a message like "Yarin oglen 2'de musait misiniz?" the API endpoint should output
- JSON similar to the following (this example assumes the date is 2023-07-29): { intent: "new_appointment", datetimeStr: "2023-07-30T14:00" }
- Including a suite of tests that call the API endpoint with a few different example inputs. Tests should assert that the correct intent and datetime is extracted, also assert that intents other than new appointments are  classified as "other."

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

- Sinan Talha KOSAR (sinantalhakosar@gmail.com)