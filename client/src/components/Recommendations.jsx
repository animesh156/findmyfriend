import { useState, useEffect } from "react";
import { getRecommendations, sendFriendRequest } from "../api";
import { useSelector } from "react-redux";

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
    await sendFriendRequest(user._id, receiverId);
    setRecommendations(recommendations.filter((rec) => rec._id !== receiverId));
  };

  return (
    <>
      <h3>Friend Recommendations</h3>
      {recommendations.length > 0 ? (
        recommendations.map((rec) => (
          <div key={rec._id}>
            <p>{rec.name}</p>
            <button onClick={() => handleSendRequest(rec._id)}>
              Add Friend
            </button>
          </div>
        ))
      ) : (
        <p>No recommendations available</p>
      )}
    </>
  );
}

export default Recommendations;
