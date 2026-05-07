import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function SinglePost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
  }, [id])

  const handleDelete = async () => {
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    navigate('/')
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400 text-xl">
        Loading post...
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold text-white bg-blue-500 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          ✍️ Written by <span className="font-semibold">{post.author?.username}</span>
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>

        {user && user.userId === post.author?._id && (
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleDelete}
              className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-lg transition">
              🗑️ Delete Post
            </button>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-500 hover:underline font-medium">
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default SinglePost