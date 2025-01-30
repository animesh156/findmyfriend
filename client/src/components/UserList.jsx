import { useEffect, useState } from "react"
import {fetchUsers, sendFriendRequest} from '../api'
import { useSelector } from "react-redux"
import {ToastContainer, toast} from 'react-toastify'


function UserList() {

    const {user} = useSelector((state) => state.auth)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const res = await fetchUsers(user._id)
            setUsers(res.data)
        }
     loadUsers()
    }, [user])

    const sendRequest = async (receiverId) => {
      try {
        await sendFriendRequest(user?._id, receiverId)
        toast.success("Friend request sent")

         setUsers((prevUsers) => prevUsers.filter((userData) => userData._id !== receiverId))

       
      } catch (error) {
       toast.error('Error sending friend request')
        console.log(error.message)
      }
       
    }


  return (
    <>
    <ToastContainer />
     {users.length > 0 ? (
    <>
      <h3 className="text-2xl -mt-4 text-black font-bold mb-2">Users</h3>

      <ul className="list h-96 overflow-y-scroll bg-neutral-900 rounded-box shadow-md">

      {users.map((user) => (
        
        <li key={user._id} className="list-row flex justify-evenly items-center">
          
          <div className="w-12"><img src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
          <div>
        
          
          <p className="uppercase text-md text-sky-600 font-semibold">{user.name}</p>
          </div>
         <div>

         <button className="btn" onClick={() => sendRequest(user._id)}>Add Friend</button>

         </div>
          
        </li>
      ))}

      </ul>
      
    </>
  ) : (
    <p className="text-3xl text-red-600 font-semibold">No users</p>
  )}
    
    </>
  )
}

export default UserList