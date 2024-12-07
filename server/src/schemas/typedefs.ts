import { gql } from 'apollo-server-express' ;

const typeDefs = gql`

  type User {
  _id: ID!
  username: String
  email: String
  highScore: [Int]
  }
 # Entrada para agregar un Usuario
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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    # Crea un nuevo usuario
    addUser(  username: String!, email: String!,  password: String!): Auth
  }


`;

export default typeDefs;