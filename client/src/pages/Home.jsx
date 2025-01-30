import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { reset, logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import FriendRequests from "../components/FriendRequests";
import Recommendations from "../components/Recommendations";
import UserFriends from "../components/UserFriends";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users"); // State to manage the active tab

  const handleLogout = () => {
    toast.success("Logged Out successfully");

    setTimeout(() => {
      dispatch(logout());
      dispatch(reset());
      navigate("/login");
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return <UserList />;
        case "friends":
       return <UserFriends />;
      case "friendRequests":
        return <FriendRequests />;
      case "recommendations":
        return <Recommendations />;
      default:
        return null;
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-red-600">Welcome, {user?.name}</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-400 transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 gap-x-6 ">
          {/* Tab Navigation */}
          <div className="flex space-x-6 justify-center">

          <button
              onClick={() => setActiveTab("users")}
              className={`py-2 px-4 font-semibold rounded-lg ${
                activeTab === "users"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-sky-400 transition duration-200`}
            >
              User List
            </button>



          <button
              onClick={() => setActiveTab("friends")}
              className={`py-2 px-4 font-semibold rounded-lg ${
                activeTab === "friends"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-sky-400 transition duration-200`}
            >
              Friend List
            </button>


           
            <button
              onClick={() => setActiveTab("friendRequests")}
              className={`py-2 px-4 font-semibold rounded-lg ${
                activeTab === "friendRequests"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-sky-400 transition duration-200`}
            >
              Friend Requests
            </button>
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`py-2 px-4 font-semibold rounded-lg ${
                activeTab === "recommendations"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-sky-400 transition duration-200`}
            >
              Recommendations
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
