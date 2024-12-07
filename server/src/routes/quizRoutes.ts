import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Random question route
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
        return res.json(data);
    } catch (error) {
        console.error('Error fetching question from QuizMaster API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Trivia by category route
router.get('/trivia-by-category', async (req: Request, res: Response) => {
    const { category } = req.query;
    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
    }

    try {
        const apiUrl = `https://quizmania-api.p.rapidapi.com/trivia-by-category?category=${encodeURIComponent(
            String(category)
        )}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.QUIZMASTER_API_KEY || '',
                'x-rapidapi-host': process.env.QUIZMASTER_API_HOST || '',
            },
        });

        if (!response.ok) {
            console.error(`Error from QuizMaster API: ${response.status}`);
            return res.status(response.status).json({ error: 'Failed to fetch trivia by category' });
        }

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error('Error fetching trivia by category from QuizMaster API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;