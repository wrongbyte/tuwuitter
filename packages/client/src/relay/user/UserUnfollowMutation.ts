import { graphql } from 'react-relay';

export const UserUnfollow = graphql`
  mutation UserUnfollowMutation($username: String!) {
    UnfollowUserMutation(input: { username: $username }) {
      user {
        username
        followers
      }
    }
  }
`;
