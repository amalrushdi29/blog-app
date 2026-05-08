import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function SinglePost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
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

    fetch(`http://localhost:5000/api/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
  }, [id])

  const handleDelete = async () => {
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    navigate('/')
  }

  const handleComment = async () => {
    if (!newComment) return
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content: newComment })
    })
    const data = await res.json()
    setComments([data, ...comments])
    setNewComment('')
  }

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:5000/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    setComments(comments.filter((c) => c._id !== commentId))
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
          ✍️ Written by{' '}
          <Link
            to={`/profile/${post.author?.username}`}
            className="font-semibold text-blue-500 hover:underline">
            {post.author?.username}
          </Link>
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>

        {user && user.userId === post.author?._id && (
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => navigate(`/edit/${post._id}`)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg transition">
              ✏️ Edit Post
            </button>
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

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          💬 Comments ({comments.length})
        </h2>

        {user ? (
          <div className="flex flex-col gap-3 mb-8">
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleComment}
              className="self-end bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition">
              Post Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-400 mb-6">
            <Link to="/login" className="text-blue-500 hover:underline font-semibold">
              Login
            </Link>{' '}
            to leave a comment!
          </p>
        )}

        {comments.length === 0 ? (
          <p className="text-gray-400 text-center">No comments yet. Be the first!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment._id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <Link
                    to={`/profile/${comment.author?.username}`}
                    className="text-sm font-semibold text-blue-500 hover:underline">
                    @{comment.author?.username}
                  </Link>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{comment.content}</p>
                {user && (user.userId === comment.author?._id || user.userId === post.author?._id) && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-400 hover:text-red-500 text-xs mt-2 font-medium">
                    🗑️ Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SinglePost