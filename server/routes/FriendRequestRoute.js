 const express = require('express')
 const router = express.Router()
 const User = require('../models/userModel')
 const FriendRequest = require('../models/friendRequestModel')

 router.post('/sendRequest', async (req,res) => {
       const {senderId, receiverId} = req.body

       try {
         if(senderId === receiverId) {
            return res.status(400).json({msg: 'You cannot send a friend request to yourself'})
         }

         let existingRequest = await FriendRequest.findOne({sender: senderId, receiver: receiverId});
         if(existingRequest){
            return res.status(400).json({msg: 'Friend request already sent'})
         }

         const newRequest = new FriendRequest(
            {
                sender: senderId, receiver: receiverId
            }
         );

         await newRequest.save();
       } catch (error) {
        res.status(500).json({msg: "Error sending friend request"});
       }
 })


 router.put('/acceptRequest', async (req,res) => {
    const {requestId} = req.body;

    try {

        const request = await FriendRequest.findById(requestId).populate('sender reciver')

        if(!request){
            return res.status(400).json({msg: 'Friend request not found'})
        }

        request.sender.friends.push(request.receiver._id)
        request.receiver.friends.push(request.sender._id)

        await request.sender.save()
        await request.receiver.save()
        await FriendRequest.findByIdAndDelete(requestId)
        
        res.json({msg: "Friend request accepted"})
        
    } catch (error) {
        res.status(500).json({msg: "Error accepting friend request"});
    }

 })


 router.get('/recommendations/:id', async (req,res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate('friends')
       const friendIds = user.friends.map((friend) => friend._id)
       const recommendations = await User.find({ _id: { $nin: [...friendIds, userId] } }).limit(5);

    res.json(recommendations);
    } catch (error) {
        res.status(500).json({msg: "Error getting recommendations"});
    }
 })


 module.exports = router
