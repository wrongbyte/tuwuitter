import { graphql } from 'react-relay';

export const UserFollow = graphql`
  mutation UserFollowMutation($username: String!) {
    FollowUserMutation(input: { username: $username }) {
      user {
        username
        followers
      }
    }
  }
`;
