export default {
  name: 'userBlog',
  title: 'User Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      description: 'Keep titles short!',
    },
    {
      title: 'Approved',
      name: 'approved',
      type: 'boolean',
      description: "Blogs won't show on the site without approval",
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'blogSlug',
      title: 'Blog Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      type: 'string',
    },
    {
      name: 'blogImageUrl',
      title: 'Blog Image Url',
      type: 'url',
    },
    {
      name: 'blog',
      type: 'text',
    },
  ],
}
