// import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Creative Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex items-center justify-between border-y border-black bg-neutral-100 py-10 lg:py-0">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Creative
            </span>{' '}
            is a place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>

        <div>
          <img
            className="hidden h-32 px-10 md:inline-flex lg:h-52"
            src="https://www.pngitem.com/pimgs/m/46-467799_transparent-letter-c-logo-png-letter-c-logo.png"
            alt=""
          />
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex h-44 justify-between bg-white p-4">
                <div>
                  <p className="text-lg font-bold hover:text-indigo-500">
                    {post.title}
                  </p>
                  <p className="pt-2 text-xs">
                    {post.description} - by{' '}
                    <span className="text-blue-600">{post.author.name}</span>
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-between px-4 pb-2">
                <p className="text-sm font-thin">
                  {new Date(post._createdAt).toLocaleString()}
                </p>
                <span className="mb-1 cursor-pointer rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 ">
                  Continue Reading
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author->{
      name,
      image
    },
    description,
    mainImage,
    slug,
    _createdAt
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
