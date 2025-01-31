import { useEffect, useState } from "react";
import { fetchUsers, sendFriendRequest } from "../api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function UserList() {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await fetchUsers(user._id);
      setUsers(res.data);
    }
    loadUsers();
  }, [user]);

  const sendRequest = async (receiverId) => {
    try {
      await sendFriendRequest(user?._id, receiverId);
      toast.success("Friend request sent");

      setUsers((prevUsers) =>
        prevUsers.filter((userData) => userData._id !== receiverId)
      );
    } catch (error) {
      toast.error("Error sending friend request");
      console.log(error.message);
    }
  };

  return (
    <>
     
      {users.length > 0 ? (
        
        <>
           <ToastContainer
           autoClose={2000}
           closeOnClick
            />
          <h3 className="text-2xl mb-4 text-teal-400 md:text-4xl text-center  font-bold ">
            All Users
          </h3>

          <ul className="list h-96 p-3  overflow-y-scroll dark:bg-neutral-900 rounded-box shadow-md">
            {users.map((user) => (
              <li
                key={user._id}
                className="list-row mb-1   bg-gray-100 flex  justify-between items-center"
              >
                <div className="w-12 ">
                  <img src="./avatar.png" />
                </div>
                <div >
                  <p className="uppercase text-md text-sky-600 font-bold">
                    {user.name}
                  </p>
                </div>
                <div >
                  <button
                    className="btn bg-green-400 py-2 hover:bg-green-600"
                    onClick={() => sendRequest(user._id)}
                  >
                    Add Friend
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-2xl md:text-4xl mt-14 text-red-600 text-center font-bold">No users</p>
      )}
    </>
  );
}

export default UserList;
