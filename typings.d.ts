export interface Post {
  _id: string
  _createdAt: string
  title: string
  author: {
    name: string
    image: string
  }
  comments: Comment[]
  description: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: [object]
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createAt: string
  _id: string
  _rev: string
  _type: string
  _updateAt: string
}

export interface UserBlog {
  approved: boolean
  blog: string
  title: string
  description: string
  comments: Comment[]
  author: string
  blogImageUrl: url
  _createdAt: string
  _id: string
  _updateAt: string
  blogSlug: {
    current: string
  }
}

export interface UserComment {
  approved: boolean
  comment: string
  email: string
  name: string
  userBlog: {
    _ref: string
    _type: string
  }
  _createAt: string
  _id: string
  _rev: string
  _type: string
  _updateAt: string
}
