import User, { UserDocument } from '../models/User.js';
import { GraphQLError } from 'graphql';
import { signToken, AuthenticationError } from '../services/auth.js';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js';

interface UserArgs {
    userId: string;
}

interface CreateUserArgs {
    username: string;
    email: string;
    password: string;
}

interface loginArgs {
    email: string;
    password: string;
}

const resolvers = {
    Query: {
        me: async (_parent: unknown, _args: UserArgs, context: any) => {
            console.log('Here is context', context.user)
try {
            const user = await User.findOne({ _id: context.user.data._id });
            return user;    
} catch (error) {
    console.error(error)
    return error
}
        },

        // Fetch all leaderboard entries, sorted by score in descending order
        getLeaderboard: async (_: unknown, { limit = 10 }: { limit: number }, _context: any) => {
            try {
              return await LeaderboardEntryModel.find()
                .sort({ score: -1 })
                .limit(limit); // Limit results for performance
            } catch (error) {
              console.error('Error fetching leaderboard:', error);
              throw new Error('Failed to fetch leaderboard');
            }
          },

        // Fetch leaderboard entries filtered by category
        getLeaderboardByCategory: async (_: unknown, { category }: { category: string }, _context: any) => {
            try {
                return await LeaderboardEntryModel.find({ category }).sort({ score: -1 });
            } catch (error) {
                console.error(`Error fetching leaderboard for category ${category}:`, error);
                throw new Error(`Failed to fetch leaderboard for category ${category}`);
            }
        },
    },

    Mutation: {
        addUser: async (_parent: any, { username, email, password }: CreateUserArgs): Promise<{ token: string; user: UserDocument }> => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                throw new GraphQLError('Invalid email format.');
            }
            if (password.length < 8) {
                throw new GraphQLError('Password must be at least 8 characters.');
            }
            if (!username || !email || !password) {
                throw new GraphQLError('Username, email, and password required.');
            }

            const userExists = await User.findOne({ $or: [{ email }, { username }] });
            if (userExists) {
                throw new GraphQLError('Username or Email already exists.');

            }

            const newUser = await User.create({ username, email, password });
            const token = signToken(newUser.username, newUser.email, newUser._id);
            return { token, user: newUser, };
        },

        login: async (_parent: any, { email, password }: loginArgs): Promise<{ token: string; user: UserDocument }> => {
            const user = await User.findOne({ email: email.toLowerCase() });//puede dar error con la diferencia entre mayusculas y minustculas

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                throw new GraphQLError('Invalid email format.');
            }
            if (password.length < 8) {
                throw new GraphQLError('Password must be at least 8 characters.');
            }
            if (!user) {
                throw new AuthenticationError('User not found.');
            }
            const passCheck = await user.isCorrectPassword(password);
            if (!passCheck) {
                throw new AuthenticationError('Invalid password.')
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        // Add a new entry to the leaderboard
        addLeaderboardEntry: async (
            _: unknown,
            { score, category, username }: { score: number; category: string | null, username: string },
            context: any // Assuming context contains the user info
        ) => {
            try {
                // Ensure the user is authenticated
                if (!context.user) {
                    throw new Error('Not authenticated. Please log in.');
                }
        

                const newEntry = new LeaderboardEntryModel({
                    username, // Include the authenticated user's username
                    score,
                    category,
                    createdAt: new Date(),
                });
        
                return await newEntry.save();
            } catch (error) {
                console.error('Error adding leaderboard entry:', error);
                throw new Error('Failed to add leaderboard entry');
            }
        },

        // Reset the leaderboard
        resetLeaderboard: async (_: unknown, __: unknown, _context: any) => {
            try {
                await LeaderboardEntryModel.deleteMany({});
                return 'Leaderboard successfully reset!';
            } catch (error) {
                console.error('Error resetting leaderboard:', error);
                throw new Error('Failed to reset leaderboard');
            }
        },

    },
};
export default resolvers;