import { useState, useEffect } from "react";
import { getRecommendations, sendFriendRequest } from "../api";
import { useSelector } from "react-redux";
import {toast,ToastContainer} from 'react-toastify'

function Recommendations() {
  const { user } = useSelector((state) => state.auth);
  const [recommendations, setRecommendations] = useState([]);

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
    setRecommendations(recommendations.filter((rec) => rec._id !== receiverId));
    toast.success("Friend request sent!")
      
    } catch (error) {
      toast.error("Error sending request")
      console.log(error)
    }
    
  };

  return (
    <>
    <ToastContainer />
      {recommendations.length > 0 ? (
        <div >
          <h3 className="text-red-600 text-2xl -mt-3 mb-1 fontbold">Friend Recommendations</h3>
              <ul className="list overflow-y-scroll h-96 bg-neutral-900 rounded-box shadow-md">

              {recommendations.map((rec) => (
            <li key={rec._id} className="list-row flex justify-evenly items-center">

<div className="w-12"><img src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>

              <div>

              <p className="uppercase text-md text-sky-600 font-semibold">{rec.name}</p>

              </div>
              <div>

              <button className="btn" onClick={() => handleSendRequest(rec._id)}>
                Add Friend
              </button>

              </div>
              
            </li>
          ))}

              </ul>
          
        </div>
      ) : (
        <p className="text-2xl text-yellow-600 font-semibold">No recommendations available</p>
      )}
    </>
  );
}

export default Recommendations;
