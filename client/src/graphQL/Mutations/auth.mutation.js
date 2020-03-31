import { gql } from 'apollo-boost';

export const userLogin = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      email
      username
      token
    }
  }
`;

export const userRegister = gql`
  mutation registerUser(
    $email: String!
    $username: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    addUser(
      email: $email
      username: $username
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      email
      username
    }
  }
`;
