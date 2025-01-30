import { useEffect, useState } from "react";
import { getUserFriends, removeFriend } from "../api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function UserFriends() {
  const { user } = useSelector((state) => state.auth);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await getUserFriends(user._id);
      setFriends(res.data);
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

  return (
    <>
      <ToastContainer />
      {friends.length > 0 ? (
        <>
          <h3 className="text-md font-medium">Users</h3>

          <ul className="list bg-neutral-900 rounded-box shadow-md">
            {friends.map((user) => (
              <li
                key={user._id}
                className="list-row flex justify-evenly items-center"
              >
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
                </div>
                <div>
                  <p className="uppercase text-md text-sky-600 font-semibold">
                    {user.name}
                  </p>
                </div>
                <div>
                  <button
                    className="btn bg-red-500 hover:bg-red-700 text-black font-bold"
                    onClick={() => handleRemoveFriend(user._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-3xl text-red-600 font-semibold">No friends</p>
      )}
    </>
  );
}

export default UserFriends;
