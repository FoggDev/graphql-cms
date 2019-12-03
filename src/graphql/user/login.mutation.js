// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`
