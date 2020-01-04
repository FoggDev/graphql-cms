// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  query getPosts(
    $orderBy: String,
    $direction: String,
    $limit: Int,
    $offset: Int
  ) {
    getPosts(
      options: {
        orderBy: $orderBy,
        direction: $direction,
        limit: $limit,
        offset: $offset
      }
    ) {
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
