import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import API from '../config'

function Profile() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { username } = useParams()

  useEffect(() => {
    fetch(`${API}/api/posts/user/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [username])

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400 text-xl">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-center">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-white font-bold">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">@{username}</h1>
        <p className="text-gray-500 mt-1">{posts.length} posts written</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-2xl">📭</p>
          <p className="text-lg font-medium">No posts yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile