// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  mutation createPost(
    $title: String!,
    $slug: String!,
    $content: String!,
    $userId: String!,
    $tags: Array!
  ) {
    createPost(
      input: {
        title: $title,
        slug: $slug,
      }
    ) {
      id
      title
      slug
      content
      userId
      tags
    }
  }
`
