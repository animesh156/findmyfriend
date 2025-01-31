import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";

function Home() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

     if(!user) navigate('/login')

  return (
    <>
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
