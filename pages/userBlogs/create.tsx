import React from 'react'
import Header from '../../components/Header'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import { Post } from '../../typings'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface PostInput {
  _id: string
  title: string
  description: string
  author: string
  blogImageUrl: string
  blog: string
}

const contentCreator = () => {
  const [created, setCreated] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInput>()

  const onSubmit: SubmitHandler<PostInput> = (data) => {
    console.log(data)
    fetch('/api/createPost', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setCreated(true)
      })
      .catch((err) => {
        console.log(err)
        setCreated(false)
      })
  }

  return (
    <div>
      <Header />
      <h1 className="mx-auto mb-5 w-80 border-b-4 border-b-cyan-600 py-3 text-center text-3xl text-cyan-600">
        Create your own ideas
      </h1>
      {created ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-cyan-500 p-10 text-white">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your blog!
          </h3>
          <p>Once it has been approved, it will appear in User Blog!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex max-w-4xl flex-col items-center p-5"
        >
          <textarea
            {...register('blogImageUrl', { required: true })}
            className="form-input mt-1 mb-5 block w-full rounded border py-2 px-3 shadow outline-none ring-amber-500 focus:ring"
            placeholder="Main Image Url"
          />
          <input
            {...register('title', { required: true })}
            className="form-input mt-1 mb-5 block w-full rounded border py-2 px-3 shadow outline-none ring-amber-500 focus:ring"
            placeholder="Blog title..."
            type="text"
          />
          <input
            {...register('description', { required: true })}
            className="form-input mb-5 mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-amber-500 focus:ring"
            placeholder="Description"
            type="text"
          />
          <textarea
            {...register('blog', { required: true })}
            className="form-textarea mb-10 mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-cyan-400 focus:ring "
            placeholder="Blog content"
            rows={20}
          />

          <input
            {...register('author', { required: true })}
            className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-amber-500 focus:ring"
            placeholder="Author"
            type="text"
          />
          {/* errors will return when field validation fails */}
          <div className="flex flex-col p-5">
            {errors.blogImageUrl && (
              <span className="text-red-500">
                - The Main Image Url Field is required
              </span>
            )}
            {errors.blog && (
              <span className="text-red-500">- The Body Field is required</span>
            )}
            {errors.title && (
              <span className="text-red-500">
                - The Title Field is required
              </span>
            )}
            {errors.description && (
              <span className="text-red-500">
                - The Description Field is required
              </span>
            )}
            {errors.title && (
              <span className="text-red-500">
                - The title Field is required
              </span>
            )}
            {errors.author && (
              <span className="text-red-500">
                - The Author Field is required
              </span>
            )}
          </div>
          <button className="focus:shadow-outline cursor-pointer rounded bg-cyan-500 py-3 px-4 font-bold text-white shadow hover:bg-cyan-400 focus:outline-none lg:w-1/6">
            Create
          </button>
        </form>
      )}
    </div>
  )
}

export default contentCreator
