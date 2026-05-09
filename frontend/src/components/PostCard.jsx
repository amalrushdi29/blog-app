import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../config'

function PostCard({ post }) {
  const { user } = useAuth()
  const [likes, setLikes] = useState(post.likes?.length || 0)
  const [liked, setLiked] = useState(
    user ? post.likes?.includes(user.userId) : false
  )

  const handleLike = async () => {
    if (!user) return
    const token = localStorage.getItem('token')
    const res = await fetch(`${API}/api/posts/${post._id}/like`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setLikes(data.likes)
    setLiked(data.liked)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 flex justify-between items-center">
        <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-blue-100">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3 flex-1">
          {post.content}
        </p>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 flex justify-between items-center">
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