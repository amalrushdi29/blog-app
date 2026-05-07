import { Link } from 'react-router-dom'

function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-white bg-blue-500 px-3 py-1 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>

      <p className="text-gray-600 text-sm line-clamp-3">
        {post.content}
      </p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500 font-medium">
          ✍️ {post.author?.username}
        </span>
        <Link
          to={`/post/${post._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default PostCard