// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, blog, title, description, author, blogImageUrl } = JSON.parse(
    req.body
  )

  try {
    await client.create({
      _type: 'userBlog',
      // post: {
      //   _type: 'reference',
      //   _ref: id,
      // },
      blogImageUrl,
      blog,
      title,
      description,
      author,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: `Couldn't create post`, err })
  }
  console.log('Post created')
  return res.status(200).json({ message: 'Post created' })
}
