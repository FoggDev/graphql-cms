// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  {
    getPosts {
      id
      title
      slug
      content
      readingTime
      language
      published
      userId
      createdAt
      tags {
        name
      }
    }
  }
`
