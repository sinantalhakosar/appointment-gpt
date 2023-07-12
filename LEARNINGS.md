### Learnings
The aim of this file is expressing some feelings after using OpenAI API

```
This is the first time I used this API and before that I didnt think it requires that much technical aspects.
While developing your own system, there are some points that you need to consider.

- First of all, to even create a basic system content you need to approach AI in an algorithmic way
If you check systemContent message that I wrote you can see that it is actually a pseudo code. Please see link number 3

- Secondly, there are some abilities of OpenAI itself which has power to break your system because its designed to process the inputs
So some dangerous inputs might break your system. You can check this scenerio in `appointment.test.ts` file in `with trial to break the system` test.
```

Here some links that I checked while developing this project
1. https://community.openai.com/t/using-gpt-3-5-turbo-for-intent-parsing-for-a-custom-chatbot/187605
2. https://community.openai.com/t/improving-accuracy-of-calendar-prompt-understanding/152891/6
3. https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api (this is the main part of this project)