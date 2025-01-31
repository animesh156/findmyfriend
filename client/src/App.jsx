import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserFriends from "./components/UserFriends";
import Recommendations from "./components/Recommendations";
import FriendRequests from "./components/FriendRequests";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         
          <Route path="/userfriends" element={<UserFriends />} />
          <Route path="/friendrequest" element={<FriendRequests />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
