import { useEffect, useState } from "react";
import {getFriendRequests, acceptFriendRequest, rejectFriendRequest} from '../api'
import {toast,ToastContainer} from 'react-toastify'
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import Loader from '../components/Loader'



function FriendRequests() {

  const [isLoading,setLoading] = useState(true)
     
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [requests, setRequests] = useState([])

    useEffect(() => {
        async function loadRequests() {
          try {
            const res = await getFriendRequests(user._id)
            setRequests(res.data)
            setLoading(false)
          } catch (error) {
            console.log(error)
            setLoading(false)
          }
            
        }
        loadRequests()
    }, [user])

    const handleAccept = async (requestId) => {
      try {
        await acceptFriendRequest(requestId)
        setRequests(requests.filter((req) => req._id !== requestId))
        toast.success("Friend request accepted!")
      } catch (error) {
        toast.error("Error accepting request")
        console.log(error)
      }
       
    }

    const handleReject = async (requestId) => {
      try {
        await rejectFriendRequest(requestId)
        setRequests(requests.filter((req) => req._id !== requestId))
        toast.info("Friend request rejected")
      } catch (error) {
        toast.error("Error rejecting request")
        console.log(error)
      }
        
    }

    useEffect(() => {

      if(!user){
        toast.warning("Please login first")

        setTimeout(() => {
          navigate("/login")
        },2000)
      }
       
    },[user,navigate])


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
    {requests.length > 0 ? (
      <>
      <h3 className="text-center font-bold text-2xl md:text-4xl mt-2 mb-5">Friend Requests</h3>
    {console.log(requests)}

      <ul className="list overflow-y-scroll h-96 p-3 dark:bg-neutral-900 rounded-box shadow-md">

      {requests.map((req) => (
            <li key={req._id} className="list-row mb-1 dark:bg-neutral-800  bg-gray-100 flex  justify-between items-center">
              <div>
              <p><span className="text-pink-600 uppercase font-bold">{req.sender.name === null ? req.sender.name : "Guest"} </span> sent you a friend request</p>
              </div>
              
              <div className="space-x-3">
              <button onClick={() => handleAccept(req._id)} className="border cursor-pointer hover:bg-green-700 rounded-md px-2 py-0.5 bg-green-500 text-black font-semibold">Accept</button>
              <button onClick={() => handleReject(req._id)} className="border cursor-pointer hover:bg-red-700  rounded-md px-2 py-0.5 bg-red-500 text-black font-semibold">Reject</button>
              </div>
              
            </li>
           
         ))}

      </ul>
        
         </>
    ) : (
         <p className="text-3xl mt-16 md:text-5xl text-center text-green-600 font-bold">No friend requests</p>
    )}

    </>
  )
}

export default FriendRequests