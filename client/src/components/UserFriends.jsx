import { useEffect, useState } from "react";
import { getUserFriends, removeFriend } from "../api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function UserFriends() {
  const { user } = useSelector((state) => state.auth);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await getUserFriends(user._id);
      setFriends(res.data);
      setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
      
    }
    loadUsers();
  }, [user]);
  
  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(user?._id, friendId);
      toast.success("Friend removed");

      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend._id !== friendId)
      );
    } catch (error) {
      toast.error("Errror removing friend");
      console.log(error);
    }
  };

  useEffect(() => {
      if(!user){
        toast.warning("Please login first")

        setTimeout(() => {
            navigate("/login")
        },2000)
      }
  }, [user, navigate])

  if (isLoading) {
    return (
     <Loader />
    );
  }

  return (
    <>
      <ToastContainer
      autoClose={2000}
      closeOnClick
       />
      {friends.length > 0 ? (
        <>
          <h3 className="text-center mt-5 mb-5 md:text-4xl text-2xl font-bold">Users</h3>

          <ul className="list p-3 overflow-y-scroll h-96 dark:bg-neutral-900 ">
            {friends.map((user) => (
              <li
               key={user._id}
                className="list-row dark:bg-neutral-800 bg-gray-200 flex justify-evenly items-center"
              >
                <div className="w-12">
                  <img src="./avatar.png" />
                </div>
                <div>
                  <p className="uppercase text-md text-sky-600 font-bold">
                    {user.name}
                  </p>
                </div>
                <div>
                  <button
                    className="btn bg-red-500 hover:bg-red-700 text-black font-bold"
                    onClick={() => handleRemoveFriend(user._id)}
                  >
                    Unfriend
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="md:text-5xl text-3xl text-center mt-14 text-red-600 font-bold">No friends</p>
      )}
    </>
  );
}

export default UserFriends;
