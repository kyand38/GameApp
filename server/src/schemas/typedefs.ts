import { gql } from 'apollo-server-express';

const typeDefs = gql`

  type User {
  _id: ID!
  username: String
  email: String
  highScore: [Int]
  }
 
  type LeaderboardEntry {
  id: ID!
  username: String!
  score: Int!
  category: String
  createdAt: String!
}

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  type Auth {
  token: ID!
  user: User
  }

  type Query {
    me: User
    getLeaderboard(limit: Int): [LeaderboardEntry!]!
    getLeaderboardByCategory(category: String!): [LeaderboardEntry!]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(  username: String!, email: String!,  password: String!): Auth
    addLeaderboardEntry(username: String!, score: Int!, category: String): LeaderboardEntry!
    # Reset the leaderboard (for admin or testing purposes)
    resetLeaderboard: String!
  }


`;

export default typeDefs;