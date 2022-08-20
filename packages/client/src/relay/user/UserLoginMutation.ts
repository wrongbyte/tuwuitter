import { graphql } from 'react-relay';

//TODO: REMOVE UNUSED FIELDS IN RETURN

export const UserLogin = graphql`
  mutation UserLoginMutation($username: String!, $password: String!) {
    userLoginMutation(input: { username: $username, password: $password }) {
      token
      me {
        username
        displayName
        email
        id
      }
    }
  }
`;
