import { useState, useEffect } from "react"
import axios from 'axios'

function Search() {

    const [users, setUsers] = useState([])
    const [query, setQuery] = useState("")

    useEffect(()) => {
        axios.get()
    }


  return (
    <>
   <h2>Search Users</h2> 
    </>
  )
}

export default Search