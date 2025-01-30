import axios from 'axios';
const API_URL = "http://localhost:";
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const fetchUsers = () => axios.get(`${API_URL}/friends/users`);
export const sendFriendRequest = (senderId, receiverId) => axios.post(`${API_URL}/friends/sendRequest`, { senderId, receiverId });
export const acceptFriendRequest = (requestId) => axios.put(`${API_URL}/friends/acceptRequest`, { requestId });
