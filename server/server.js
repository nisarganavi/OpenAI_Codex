// Import required packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import openai from 'openai';

// Load environment variables from .env file
dotenv.config();
// console.log(process.env.OPENAI_API_KEY);

// Create an instance of the OpenAIApi client
const openaiInstance = new openai({ apiKey: process.env.OPENAI_API_KEY, });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Codex',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openaiInstance.completions.create({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));