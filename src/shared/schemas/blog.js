export default {
  userId: {
    type: 'hidden',
    required: true
  },
  title: {
    label: 'Title',
    type: 'input',
    required: true,
    slug: true
  },
  readingTime: {
    label: 'Reading Time',
    type: 'select',
    theme: 'dark',
    options: [
      {
        option: '3 minutes',
        value: '3 minutes',
        selected: true
      },
      {
        option: '5 minutes',
        value: '5 minutes'
      },
      {
        option: '7 minutes',
        value: '7 minutes'
      },
      {
        option: '10 minutes',
        value: '10 minutes'
      },
      {
        option: '15 minutes',
        value: '15 minutes'
      }
    ]
  },
  tags: {
    label: 'Tags',
    type: 'tags'
  },
  language: {
    label: 'Language',
    type: 'select',
    options: [
      {
        option: 'English',
        value: 'en'
      },
      {
        option: 'Spanish',
        value: 'es',
        selected: true
      }
    ]
  },
  content: {
    label: 'Content',
    type: 'textarea',
    required: true
  },
  published: {
    label: 'Published',
    type: 'select',
    options: [
      {
        option: 'Yes',
        value: true
      },
      {
        option: 'No',
        value: false,
        selected: true
      }
    ]
  }
}
