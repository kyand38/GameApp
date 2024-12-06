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