import React from 'react'
import Header from '../../components/Header'
import { sanityClient } from '../../sanity'
import { UserBlog } from '../../typings'
import Link from 'next/link'

interface Props {
  userBlogs: [UserBlog]
}

const UserBlogPage = ({ userBlogs }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <div className="mx-auto grid grid-cols-1 gap-3 p-2 md:gap-6 md:p-6 lg:max-w-6xl">
        {userBlogs.map((userBlog) => (
          <Link
            key={userBlog._id}
            href={`/userBlogs/${userBlog.blogSlug?.current}`}
          >
            <div className="group cursor-pointer overflow-hidden rounded-lg border lg:flex">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105 lg:w-1/3"
                src={userBlog.blogImageUrl}
                alt=""
              />
              <div className="px-3 lg:w-2/3">
                <div className="flex h-44 justify-between bg-white p-4">
                  <div>
                    <p className="text-lg font-bold hover:text-indigo-500">
                      {userBlog.title}
                    </p>
                    <p className="pt-2 text-xs lg:text-sm lg:leading-7">
                      {userBlog.description} - by{' '}
                      <span className="text-blue-600">{userBlog.author}</span>
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={userBlog.blogImageUrl}
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-between px-4 pb-2">
                  <p className="text-sm font-thin">
                    {new Date(userBlog._createdAt).toLocaleString()}
                  </p>
                  <span className="mb-1 cursor-pointer rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
                    Continue Reading
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UserBlogPage

export const getServerSideProps = async () => {
  const query = `*[_type == "userBlog"]{
        _id,
        title,
        author,
        description,
        blogImageUrl,
        blogSlug,
        _createdAt,
        blog
      }`

  const userBlogs = await sanityClient.fetch(query)

  return {
    props: {
      userBlogs,
    },
  }
}
