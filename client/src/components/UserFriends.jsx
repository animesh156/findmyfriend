import { useEffect, useState } from "react"
import {getUserFriends, sendFriendRequest} from '../api'
import { useSelector } from "react-redux"


function UserFriends() {

    const {user} = useSelector((state) => state.auth)
    const [friends, setFriends] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const res = await getUserFriends(user._id)
            setFriends(res.data)
        }
     loadUsers()
    }, [user])

    const sendRequest = async (receiverId) => {
      try {
        await sendFriendRequest(user?._id, receiverId)
        
      } catch (error) {
        console.log(user?._id)
        console.log(receiverId)
        console.log(error.message)
      }
       
    }


  return (
    <>
     {friends.length > 0 ? (
    <>
      <h3 className="text-md font-medium">Users</h3>

      <ul className="list bg-neutral-900 rounded-box shadow-md">

      {friends.map((user) => (
        
        <li key={user._id} className="list-row flex justify-evenly items-center">
          
          <div className="w-12"><img src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
          <div>
        
          
          <p className="uppercase text-md text-sky-600 font-semibold">{user.name}</p>
          </div>
         <div>

         <button className="btn bg-red-500 text-black font-bold" onClick={() => sendRequest(user._id)}>Remove</button>

         </div>
          
        </li>
      ))}

      </ul>
      
    </>
  ) : (
    <p className="text-3xl text-red-600 font-semibold">No friends</p>
  )}
    
    </>
  )
}

export default UserFriends