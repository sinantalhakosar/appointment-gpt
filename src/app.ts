import express, { Express } from 'express';
import dotenv from 'dotenv';
import appointmentRouter from './routes/appointment';
import classificationRouter from './routes/classification';
import askRouter from './routes/ask';

dotenv.config({path: '.env.local'});

console.log('process.env.PORT', process.env.PORT)

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const openaiApiModel = "gpt-3.5-turbo";

//routes
app.use('/appointment-intent', appointmentRouter);
app.use('/appointment-classify', classificationRouter);
app.use('/ask', askRouter);

export const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;