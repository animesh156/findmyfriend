const express = require("express");
const User = require("../models/userModel");
const FriendRequest = require("../models/FriendRequestModel");
const mongoose = require('mongoose')

const router = express.Router();

// Get all users except current user
router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all users who have a pending friend request from the current user
    const sentRequests = await FriendRequest.find({ sender: userId }).select("receiver");
    const sentRequestIds = sentRequests.map((request) => request.receiver.toString());

    // Find all users who are already friends
    const user = await User.findById(userId).populate("friends");
    const friendIds = user.friends.map((friend) => friend._id.toString());

    // Fetch users who are NOT the current user, NOT friends, and do NOT have a pending request
    const users = await User.find({
      _id: { $nin: [...friendIds, ...sentRequestIds, userId] },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users" });
  }
});

// remoeve friend

router.put("/removeFriend", async (req,res) => {
  const {userId, friendId} = req.body;

  try {

    const user = await User.findById(userId)
    const friend = await User.findById(friendId)

    if(!user || !friend){
      return res.status(404).json({msg: "User not found"})
    }


    user.friends = user.friends.filter((id) => id.toString() !== friendId)
 
    friend.friends = friend.friends.filter((id) => id.toString() !== userId)

    await user.save()
    await friend.save()

    res.json({msg: "friend removed successfully"})
  } catch (error) {
    res.status(500).json({msg: "Error removing friends"})
  }
})

// get users friends

router.get('/:userId', async (req,res) => {
  try {
    const user = await User.findById(req.params.userId).populate('friends','name email')

    if(!user){
      return res.status(404).json({msg: "User not found"})
    }

    res.json(user.friends)
  } catch (error) {
    res.status(500).json({msg: "error fetching friends"})
  }
})
 
// Send Friend Request
router.post("/sendRequest", async (req, res) => {
 
  const { senderId, receiverId } = req.body;

  console.log("Sender ID:", senderId);
  console.log("Receiver ID:", receiverId);

   // Validate if senderId and receiverId are valid ObjectIds
   if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
    return res.status(400).json({ msg: "Invalid sender or receiver ID" });
  }
  
  try {
    if (senderId === receiverId) {
      return res.status(400).json({ msg: "Cannot send friend request to yourself" });
    }

    const existingRequest = await FriendRequest.findOne({ sender: senderId, receiver: receiverId });
    if (existingRequest) {
      return res.status(400).json({ msg: "Friend request already sent" });
    }

    const newRequest = new FriendRequest({ sender: senderId, receiver: receiverId });
    await newRequest.save();
    
    res.json({ msg: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ msg: "Error sending friend request" });
  }
});

// Accept Friend Request
router.put("/acceptRequest", async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await FriendRequest.findById(requestId).populate("sender receiver");
    if (!request) {
      return res.status(400).json({ msg: "Friend request not found" });
    }

    request.sender.friends.push(request.receiver._id);
    request.receiver.friends.push(request.sender._id);

    await request.sender.save();
    await request.receiver.save();
    await FriendRequest.findByIdAndDelete(requestId);

    res.json({ msg: "Friend request accepted" });
  } catch (err) {
    res.status(500).json({ msg: "Error accepting friend request" });
  }
});

// Reject Friend Request
router.put("/rejectRequest", async (req, res) => {
  const { requestId } = req.body;

  try {
    await FriendRequest.findByIdAndDelete(requestId);
    res.json({ msg: "Friend request rejected" });
  } catch (err) {
    res.status(500).json({ msg: "Error rejecting friend request" });
  }
});

// Get Friend Requests
router.get("/requests/:userId", async (req, res) => {
  try {
    const requests = await FriendRequest.find({ receiver: req.params.userId, status: "pending" })
      .populate("sender", "name");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching friend requests" });
  }
});

// Get Friend Recommendations
router.get("/recommendations/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("friends");
    const friendIds = user.friends.map((friend) => friend._id);
    
    const recommendations = await User.find({ _id: { $nin: [...friendIds, user._id] } }).limit(5);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ msg: "Error getting recommendations" });
  }
});

module.exports = router;
