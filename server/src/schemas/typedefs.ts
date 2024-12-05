import { gql } from 'apollo-server-express' ;

const typeDefs = gql`

  type User {
  _id: ID!
  username: String
  email: String
  savedBooks: [Book]
  bookCount: Int
  }

  type Auth {
  token: ID!
  user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
  }
`;

export default typeDefs;