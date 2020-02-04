// Dependencies
import { gql } from 'apollo-boost'

export default gql`
  mutation updatePost(
    $id: UUID!,
    $title: String!,
    $slug: String!,
    $content: String!,
    $readingTime: String!,
    $language: String!,
    $published: Boolean!,
    $tags: [TagsInput],
  ) {
    updatePost(
      id: $id,
      input: {
        title: $title,
        slug: $slug,
        content: $content,
        readingTime: $readingTime,
        language: $language,
        published: $published,
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
