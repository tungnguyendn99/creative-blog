import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient } from '../../sanity'
import { UserBlog } from '../../typings'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  userBlog: UserBlog
}

const UserBlog = ({ userBlog }: Props) => {
  const [submitted, setSubmitted] = useState(false)

  console.log(userBlog)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  console.log(useForm())

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createUserComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <main>
      <Header />
      <img
        className="h-72 w-full object-cover"
        src={userBlog.blogImageUrl}
        alt=""
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{userBlog.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {userBlog.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={userBlog.blogImageUrl}
            alt=""
          />
          <p className="text-sm font-extralight">
            Blog post by{' '}
            <span className="text-blue-600">{userBlog.author}</span> - Published
            at {new Date(userBlog._createdAt).toLocaleString()}
          </p>
        </div>
        <p className="pt-5 text-xl">{userBlog.blog}</p>
      </article>

      <hr className="my-5 mx-auto max-w-lg border border-amber-400" />

      {submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-amber-500 p-10 text-white">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex max-w-2xl flex-col p-5 "
        >
          <h3 className="text-sm text-amber-500">Enjoyed this article?</h3>
          <h4 className="text-3-xl font-bold">Leave a comment below!</h4>
          <hr className="mt-2 py-3" />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={userBlog._id}
          />

          <label className="mb-5 block ">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-amber-500 focus:ring"
              placeholder=""
              rows={8}
            />
          </label>

          <label className="mb-5 block ">
            <span className="text-gray-700">Name</span>
            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-amber-500 focus:ring"
              placeholder=""
              type="text"
            />
          </label>
          <label className="mb-5 block ">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
              placeholder=""
              type="email"
            />
          </label>

          {/* errors will return when field validation fails */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">- The Name Field is required</span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                - The Comment Field is required
              </span>
            )}
            {errors.email && (
              <span className="text-red-500">
                - The Email Field is required
              </span>
            )}
          </div>

          <button className="focus:shadow-outline cursor-pointer rounded bg-amber-500 py-2 px-4 font-bold text-white shadow hover:bg-amber-400 focus:outline-none">
            Submit
          </button>
        </form>
      )}

      {/* Comments */}
      <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-400">
        <h3 className="text-4xl">{userBlog.comments.length} Comments</h3>
        <hr className="pb-2" />

        {userBlog.comments.map((comment) => (
          <div
            key={comment._id}
            className="my-10 flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-amber-500"
          >
            <p>
              <span className="text-amber-600">{comment.name}: </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default UserBlog

export const getStaticPaths = async () => {
  const query = `*[_type == "userBlog"]{
          _id,
          blogSlug{
              current
          }
        }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((userBlog: UserBlog) => ({
    params: {
      blogSlug: userBlog.blogSlug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "userBlog" && blogSlug.current == $blogSlug][0]{
          _id,
        _createdAt,
        title,
        author,
       'comments': *[
          _type == "userComment" &&
          userBlog._ref == ^._id &&
          approved == true],
       description,
       blogImageUrl,
       blogSlug,
       blog
      }`

  const userBlog = await sanityClient.fetch(query, {
    blogSlug: params?.blogSlug,
  })

  if (!userBlog) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      userBlog,
    },
    revalidate: 60, //after 60 seconds, it'll update the old cached version
  }
}
