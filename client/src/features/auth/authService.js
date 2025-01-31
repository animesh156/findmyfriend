import axios from 'axios'

const registerRoute =  "https://findmyfriend-backend.vercel.app/user/register"

const loginRoute = "https://findmyfriend-backend.vercel.app/user/login"



const register = async (userData) => {
    const response = await axios.post(registerRoute, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}


const login = async (userData) => {
    const response = await axios.post(loginRoute, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}


export default authService