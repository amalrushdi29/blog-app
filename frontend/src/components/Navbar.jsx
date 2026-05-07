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
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        📝 BlogApp
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-600 font-medium">
              👋 {user.username}
            </span>
            <Link
              to="/create"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition">
              New Post
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
              className="text-blue-500 hover:text-blue-600 font-semibold transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar