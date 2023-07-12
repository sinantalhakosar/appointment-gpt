### This file is for explaning why we have /routes/classification.ts router
REF: https://community.openai.com/t/answers-classification-search-endpoint-deprecation/18532

While checking some best practices of labelling & classifying user texts. I saw creating Classification in OpenAI
But in REF link there is an announcement that says Classification is deprecated and there is a Transition doc
So I gave it a try with fine tuning (a.k.a Option 1) and follow the doc: https://platform.openai.com/docs/guides/fine-tuning/classification
Transition doc: https://help.openai.com/en/articles/6272941-classifications-transition-guide

I left this router here to try some experiemental learning for myself. If you read the doc, there are some steps that you need to follow
so that your classification model will be trained