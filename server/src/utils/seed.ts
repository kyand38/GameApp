import db from '../config/connection.js';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js';
import User from '../models/User.js';

const seedDatabase = async () => {
    try {
        const connection = await db(); // Ensure connection is established
        console.log('Connected to the database for seeding.');

        // Example seed data
        const leaderboardEntries = [
            { username: 'Player1', score: 100, category: 'General Knowledge', createdAt: new Date() },
            { username: 'Player2', score: 95, category: 'Science', createdAt: new Date() },
        ];

        const users = [
            { username: 'User1', email: 'user1@example.com', password: 'password123' },
            { username: 'User2', email: 'user2@example.com', password: 'password123' },
        ];

        await LeaderboardEntryModel.deleteMany({});
        await LeaderboardEntryModel.insertMany(leaderboardEntries);
        console.log('Seeded leaderboard data.');

        await User.deleteMany({});
        await User.insertMany(users);
        console.log('Seeded user data.');

        connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
};

seedDatabase();