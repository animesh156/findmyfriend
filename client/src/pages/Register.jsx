import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Loader from '../components/Loader'

function Register() {

    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: ''
        }
    );


    const {name, email, password} = formData

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
          
          toast.error(message);
          dispatch(reset());
        }
    
        if (isSuccess || user) {
          toast.success('User Registered Successfully')
          setTimeout(() => {
            navigate('/');
            dispatch(reset());
          },1000)
          
        }
    
        
      }, [user, isError, isSuccess, message, navigate, dispatch]);
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      
      const onSubmit = (e) => {
        e.preventDefault();
    
        const userData = {
          name,
          email,
          password,
          
        };
    
        dispatch(register(userData));
      };
    
      if (isLoading) {
        return (
        <Loader />
        )
      }



  return (
    <div
    className=" flex flex-col items-center md:mt-12 justify-center mt-8 "
    
    >

      <ToastContainer
     
       />
      <h1 className="md:text-6xl font-bold text-4xl mb-6">Create an account</h1>
      <section className=" border  inset-shadow-white shadow-lg  md:w-96 px-7 py-7 text-center  rounded-2xl">
        <form onSubmit={onSubmit} className='md:w-full w-64'>
          <div>
            <input
              type="text"
              className="py-2.5 px-3 border-2 w-64  focus:outline-none focus:ring-1 backdrop-blur-sm  focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500  mb-8"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="email"
              className="py-2.5 px-3 border-2 w-64  focus:outline-none focus:ring-1 backdrop-blur-sm  focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500  mb-8"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="py-2.5 px-3 border-2  w-64 focus:outline-none focus:ring-1 backdrop-blur-sm  focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500  mb-8"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

         
       

          <div>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white w-64  md:w-40 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign Up
            </button>
          </div>

          <div>
            <p className="font-medium text-1xl  mt-3">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-sky-500 hover:text-sky-700 font-extrabold"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register