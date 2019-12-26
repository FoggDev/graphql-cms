// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  mutation createPost(
    $title: String!,
    $slug: String!,
    $content: String!,
    $readingTime: String!,
    $language: String!,
    $published: Boolean!,
    $userId: UUID!,
    $tags: [TagsInput],
  ) {
    createPost(
      input: {
        title: $title,
        slug: $slug,
        content: $content,
        readingTime: $readingTime,
        language: $language,
        published: $published,
        userId: $userId,
        tags: $tags
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
      tags {
        name
      }
    }
  }
`
