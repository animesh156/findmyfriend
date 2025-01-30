import { useEffect, useState } from "react";
import {getFriendRequests, acceptFriendRequest, rejectFriendRequest} from '../api'

import {useSelector} from 'react-redux'



function FriendRequests() {
     
    const {user} = useSelector((state) => state.auth)

    const [requests, setRequests] = useState([])

    useEffect(() => {
        async function loadRequests() {
            const res = await getFriendRequests(user._id)
            setRequests(res.data)
        }
        loadRequests()
    }, [user])

    const handleAccept = async (requestId) => {
        await acceptFriendRequest(requestId)
        setRequests(requests.filter((req) => req._id !== requestId))
    }

    const handleReject = async (requestId) => {
        await rejectFriendRequest(requestId)
        setRequests(requests.filter((req) => req._id !== requestId))
    }


  return (
    <>

    <h3>Friend Requests</h3>
    {requests.length > 0 ? (
         requests.map((req) => (
            <div key={req._id}>
              <p>{req.sender.name} sent you a friend request</p>
              <button onClick={() => handleAccept(req._id)}>Accept</button>
              <button onClick={() => handleReject(req._id)}>Reject</button>
            </div>
         ))
    ) : (
         <p>No friend requests</p>
    )}

    </>
  )
}

export default FriendRequests