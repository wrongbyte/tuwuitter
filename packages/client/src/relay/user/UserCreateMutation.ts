import { graphql } from 'react-relay';

export const UserCreate = graphql`
  mutation UserCreateMutation(
    $username: String!
    $displayName: String!
    $email: String!
    $password: String!
  ) {
    CreateUserMutation(
      input: { username: $username, displayName: $displayName, email: $email, password: $password }
    ) {
      token
    }
  }
`;
