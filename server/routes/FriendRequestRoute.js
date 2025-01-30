const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const FriendRequest = require('../models/FriendRequestModel')


router.get('/users', async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

router.post('/sendRequest', async (req, res) => {
    const { senderId, receiverId } = req.body;
    const newRequest = new FriendRequest({ sender: senderId, receiver: receiverId });
    await newRequest.save();
    res.json({ msg: "Friend request sent!" });
});
 
router.put('/acceptRequest', async (req, res) => {
    const { requestId } = req.body;
    const request = await FriendRequest.findById(requestId).populate('sender receiver');
    request.sender.friends.push(request.receiver._id);
    request.receiver.friends.push(request.sender._id);
    await request.sender.save();
    await request.receiver.save();
    await FriendRequest.findByIdAndDelete(requestId);
    res.json({ msg: "Friend request accepted!" });
});

router.get('/recommendations/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('friends');
    const friendIds = user.friends.map(friend => friend._id);
    const recommendations = await User.find({ _id: { $nin: [...friendIds, req.params.id] } }).limit(5);
    res.json(recommendations);
});

module.exports = router;
