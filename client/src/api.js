import axios from 'axios';
const API_URL = "http://localhost:6564";

export const registerUser = (userData) => axios.post(`${API_URL}/user/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/user/login`, userData);
export const fetchUsers = (userId) => axios.get(`${API_URL}/friends/users/${userId}`);
export const sendFriendRequest = (senderId, receiverId) => axios.post(`${API_URL}/friends/sendRequest`, { senderId, receiverId });
export const removeFriend = (userId,friendId) => axios.put(`${API_URL}/friends/removeFriend`, {userId, friendId})
export const acceptFriendRequest = (requestId) => axios.put(`${API_URL}/friends/acceptRequest`, { requestId });
export const rejectFriendRequest = (requestId) => axios.put(`${API_URL}/friends/rejectRequest`, { requestId });
export const getFriendRequests = (userId) => axios.get(`${API_URL}/friends/requests/${userId}`);
export const getRecommendations = (userId) => axios.get(`${API_URL}/friends/recommendations/${userId}`);
export const getUserFriends = (userId) => axios.get(`${API_URL}/friends/${userId}`)