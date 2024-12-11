import { gql } from '@apollo/client';

// Query to get the current user (me)
export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      highScore
    }
  }
`;

// Query to fetch the entire leaderboard
export const GET_LEADERBOARD = gql`
  query GetLeaderboard {
    getLeaderboard {
    username
    score
    createdAt
  }
  }
`;

// Query to fetch leaderboard entries filtered by category
export const GET_LEADERBOARD_BY_CATEGORY = gql`
  query GetLeaderboardByCategory($category: String!) {
    getLeaderboardByCategory(category: $category) {
      id
      username
      score
      category
      createdAt
    }
  }
`;