import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Signup($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
      _id
    }
  }
}
`

export const  LoginMutations = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}`

export const ADD_LEADERBOARD_ENTRY = gql`
mutation AddLeaderboardEntry($username: String!, $score: Int!) {
  addLeaderboardEntry(username: $username, score: $score) {
    id
    username
    score
    createdAt
    category
  }
}`
