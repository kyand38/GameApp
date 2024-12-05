import User, { UserDocument } from '../models/User.js'
import { GraphQLError } from 'graphql'
import { signToken, AuthenticationError } from '../services/auth.js';

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
            
            return await User.findOne({ _id: context.user._id }).populate('savedBooks');
        }
    },
    Mutation: {
      addUser: async (_parent: any, { username, email, password }: CreateUserArgs): Promise<{ token: string; user: UserDocument }> => {
          if (!/^\S+@\S+\.\S+$/.test(email)) {
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
          const user = await User.findOne({ email: email.toLowerCase() });

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
  },
};

export default resolvers;