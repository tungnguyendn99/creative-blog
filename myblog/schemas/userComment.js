export default {
  name: 'userComment',
  title: 'User Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      title: 'Approved',
      name: 'approved',
      type: 'boolean',
      description: "Comments won't show on the site without approval",
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'comment',
      type: 'text',
    },
    {
      name: 'userBlog',
      type: 'reference',
      to: [{ type: 'userBlog' }],
    },
  ],
}
