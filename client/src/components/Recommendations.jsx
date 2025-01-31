import { useState, useEffect } from "react";
import { getRecommendations, sendFriendRequest } from "../api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Recommendations() {
  const { user } = useSelector((state) => state.auth);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRecommendations() {
      const res = await getRecommendations(user._id);
      setRecommendations(res.data);
    }
    loadRecommendations();
  }, [user]);

  const handleSendRequest = async (receiverId) => {
    try {
      await sendFriendRequest(user._id, receiverId);
      setRecommendations(
        recommendations.filter((rec) => rec._id !== receiverId)
      );
      toast.success("Friend request sent!");
    } catch (error) {
      toast.error("Error sending request");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      toast.warning("Please login first");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <>
      <ToastContainer
      autoClose={2000}
      closeOnClick
       />
      {recommendations.length > 0 ? (
        <>
          <h3 className="text-red-600 text-center md:text-5xl text-2xl  mb-5 mt-5 font-bold">
            Suggested Friends
          </h3>

          <ul className="list overflow-y-scroll h-96 p-3 dark:bg-neutral-900 rounded-box shadow-md">
            {recommendations.map((rec) => (
              <li
                key={rec._id}
                className="list-row mb-1   bg-gray-100 flex  justify-between items-center"
              >
                <div className="w-12">
                  <img src="./avatar.png" alt="user_img" />
                </div>

                <div>
                  <p className="uppercase text-md text-sky-600 font-semibold">
                    {rec.name}
                  </p>
                </div>
                <div>
                  <button
                    className="btn bg-green-500 hover:bg-green-600"
                    onClick={() => handleSendRequest(rec._id)}
                  >
                    Add Friend
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-3xl text-center md:text-5xl mt-10 text-yellow-600 font-bold">
          No recommendations available
        </p>
      )}
    </>
  );
}

export default Recommendations;
