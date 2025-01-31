import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, messge } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Invalid Credentials");
    
      dispatch(reset());
    }

    if (isSuccess || user) {
      toast.success("User logged in successfully!");
      
      setTimeout(() => {
        navigate("/");
      dispatch(reset());
      }, 1000)
      
    }

    
  }, [user, isError, isSuccess, messge, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col md:mt-12 mt-8 items-center justify-center "
     
    >
      <ToastContainer
     
       />

      <h1 className="md:text-6xl font-bold text-3xl text-center">Welcome Back</h1>
      <h4 className="text-center  mt-2 mb-6">Enter your email and password to access your account</h4>
      <section className="mx-auto border shadow-lg shadow-gray-300 md:w-96 px-4 py-4 text-center rounded-3xl">
        <form onSubmit={onSubmit} className="py-5 mt-6 md:w-full ">
          <div>
            <input
              type="email"
              className="py-2.5 px-3 border-2 focus:outline-none focus:ring-1 backdrop-blur-sm  focus:ring-gray-500 rounded-xl w-64 md:w-80 caret-yellow-500  mb-8"
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
              className="py-2.5 px-3 border-2 w-64 focus:outline-none focus:ring-1 backdrop-blur-sm  focus:ring-gray-500 rounded-xl md:w-80 caret-yellow-500  mb-8"
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
              className="py-2 px-3 w-64 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg transition-all md:w-32"
            >
              Login
            </button>
          </div>

          <div className="mt-4">
            <p className="font-bold text-neutral-900  text-base">
              New User ?{" "}
              <Link
                to="/register"
                className="text-sky-500 underline font-extrabold hover:text-sky-700"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
