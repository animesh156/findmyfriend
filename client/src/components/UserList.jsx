import { useEffect, useState } from "react"
import {fetchUsers, sendFriendRequest} from '../api'
import { useSelector } from "react-redux"


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
        await sendFriendRequest(user._id, receiverId)
    }


  return (
    <>
    <h3>Users</h3>
    {users.map((user) => {
        <div key={user._id}>
           <p>{user.name}</p>
           <button onClick={() => sendRequest(user._id)}>Add Friend</button>
        </div>
    })}
    </>
  )
}

export default UserList