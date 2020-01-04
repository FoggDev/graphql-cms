// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  {
    getPostsCount {
      count
    }
  }
`
