import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PostCard({ post }) {
  const { user } = useAuth()
  const [likes, setLikes] = useState(post.likes?.length || 0)
  const [liked, setLiked] = useState(
    user ? post.likes?.includes(user.userId) : false
  )

  const handleLike = async () => {
    if (!user) return
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setLikes(data.likes)
    setLiked(data.liked)
  }

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
        <Link
          to={`/profile/${post.author?.username}`}
          className="text-sm text-blue-500 font-medium hover:underline">
          ✍️ {post.author?.username}
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`text-sm font-semibold px-3 py-1 rounded-lg transition ${
              liked
                ? 'bg-red-100 text-red-500 hover:bg-red-200'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}>
            {liked ? '❤️' : '🤍'} {likes}
          </button>
          <Link
            to={`/post/${post._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard