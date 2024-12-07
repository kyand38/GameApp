import express from 'express';
import db from './config/connection.js';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import quizRoutes from './routes/quizRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import ApolloServer and set up server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
await server.start();
await db();

// Set up Express server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/quiz', quizRoutes);
// Apollo GraphQL Middleware
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: authenticateToken,
  })
);

// Route to handle QuizMaster API requests
app.get('/api/quiz/random-question', async (_req, res) => {
  try {
    const apiUrl = 'https://quizmania-api.p.rapidapi.com/random-trivia';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.QUIZMASTER_API_KEY || '',
        'x-rapidapi-host': process.env.QUIZMASTER_API_HOST || '',
      },
    };

    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch trivia question' });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Error fetching question:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'client', 'dist')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`**API server running on port ${PORT}!**`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});