import {useSelector, useDispatch} from 'react-redux'
import {toast, ToastContainer} from 'react-toastify'
import { reset, logout } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

function Home() {

  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
        toast.success('Logged Out successfully')
       
        setTimeout(() => {
          dispatch(logout())
          dispatch(reset())
          navigate('/login')
        },2000)

  }

  
  return (
    <>
    <ToastContainer />
    <h1 className="text-3xl text-center text-red-600">Welcome {user?.name}</h1>
    <button onClick={handleLogout} className='border cursor-pointer py-2 font-semibold bg-sky-400 mt-6 px-3 rounded-md'>Logout</button>

    <nav>

      <Link to = "/search">Search Users</Link>
      <Link to="/friend-requests">Friend Requests</Link>
      <Link to="/recommendations">Recommendations</Link>

    </nav>
    </>
  )
}

export default Home