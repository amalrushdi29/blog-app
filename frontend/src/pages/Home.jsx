import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

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

      {posts.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-2xl">📭</p>
          <p className="text-lg font-medium">No posts yet. Be the first to write one!</p>
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

export default Home