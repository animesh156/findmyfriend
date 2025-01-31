import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import { useEffect } from "react";

function Home() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

     useEffect(() => {
     
           if(!user){
             toast.warning("Please login first")
     
             setTimeout(() => {
              toast.dismiss();
               navigate("/login")
             },2000)
           }
            
         },[user,navigate])

         

  return (
    <>
    <ToastContainer
    autoClose={2000}
    closeOnClick
     />
      {user ? (
        <h1 className="md:text-4xl text-2xl text-center mt-5 mb-5 font-bold text-pink-500">
          Welcome, {user?.name}
        </h1>
      ) : (
        <> </>
      )}

      <UserList />
    </>
  );
}

export default Home;
