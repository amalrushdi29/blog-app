import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import API from '../config'

function Home() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetch(`${API}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400 text-xl">
        Loading posts...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to BlogApp 📝</h1>
        <p className="text-xl mb-8 text-blue-100">
          Discover stories, ideas, and perspectives from writers on any topic.
        </p>
        {!user && (
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition">
              Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition">
              Login
            </Link>
          </div>
        )}
        {user && (
          <Link
            to="/create"
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition">
            ✍️ Write a Post
          </Link>
        )}
      </div>

      {/* Posts Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
          />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p className="text-2xl">🔍</p>
            <p className="text-lg font-medium">No posts found!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home