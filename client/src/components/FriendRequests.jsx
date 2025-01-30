import { useEffect, useState } from "react";
import {getFriendRequests, acceptFriendRequest, rejectFriendRequest} from '../api'
import {toast,ToastContainer} from 'react-toastify'
import {useSelector} from 'react-redux'



function FriendRequests() {
     
    const {user} = useSelector((state) => state.auth)

    const [requests, setRequests] = useState([])

    useEffect(() => {
        async function loadRequests() {
            const res = await getFriendRequests(user._id)
            console.log(res)
            setRequests(res.data)
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


  return (
    <>

     <ToastContainer />
    {requests.length > 0 ? (
      <>
      <h3>Friend Requests</h3>


      <ul className=" bg-neutral-900 rounded-box shadow-md">

      {requests.map((req) => (
            <li key={req._id} className=" py-2 flex justify-evenly items-center">
              <div>
              <p><span className="text-pink-600 uppercase font-bold">{req.sender.name}</span> sent you a friend request</p>
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
         <p className="text-2xl text-green-600 fotn-semibold">No friend requests</p>
    )}

    </>
  )
}

export default FriendRequests