import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/random-question', async (_req: Request, res: Response) => {
    try {
        const apiUrl = 'https://quizmania-api.p.rapidapi.com/random-trivia';

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.QUIZMASTER_API_KEY || '',
                'x-rapidapi-host': process.env.QUIZMASTER_API_HOST || '',
            },
        });

        if (!response.ok) {
            console.error(`Error from QuizMaster API: ${response.status}`);
            return res.status(response.status).json({ error: 'Failed to fetch trivia question' });
        }

        const data = await response.json();
        console.log('QuizMaster Response:', data); // Optional for debugging
        return res.json(data);
    } catch (error) {
        console.error('Error fetching question from QuizMaster API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;