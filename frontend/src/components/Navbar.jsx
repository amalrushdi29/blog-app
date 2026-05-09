import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white tracking-wide">
        📝 BlogApp
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to={`/profile/${user.username}`}
              className="text-white font-medium hover:underline">
              👋 {user.username}
            </Link>
            <Link
              to="/create"
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition">
              ✍️ New Post
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:underline font-semibold transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar