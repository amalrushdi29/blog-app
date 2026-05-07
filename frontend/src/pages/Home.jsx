import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'

function Home() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Latest Posts 📰
      </h1>

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
  )
}

export default Home