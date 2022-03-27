import Link from 'next/link'

function Header() {
  return (
    <header className="mx-auto flex max-w-7xl justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 cursor-pointer object-contain"
            src="https://i.pinimg.com/600x315/23/7e/2e/237e2e7a4ca4c4e72e11fd3f6a8499c8.jpg"
            alt=""
          />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="cursor-pointer rounded-full bg-blue-500 px-4 py-1 text-white hover:bg-blue-400">
            Follow
          </h3>
        </div>
      </div>

      <div className="flex cursor-pointer items-center space-x-5">
        <Link href="/userBlogs">
          <h3 className="cursor-pointer rounded-full bg-indigo-500 px-4 py-1 text-white hover:bg-blue-300">
            User Blog
          </h3>
        </Link>
        {/* <h3 className="cursor-pointer rounded-full border border-blue-500 px-4 py-1 hover:bg-blue-300">
          Sign In
        </h3> */}
        <Link href="/userBlogs/create">
          <h3 className="cursor-pointer rounded-full bg-blue-500 px-4 py-1 text-white hover:bg-blue-300">
            Create Blog
          </h3>
        </Link>
      </div>
    </header>
  )
}

export default Header
