// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  query getPostById($id: UUID!) {
    getPostById(id: $id) {
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
