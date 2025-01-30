const express = require("express");
const User = require("../models/userModel");
const FriendRequest = require("../models/FriendRequestModel");

const router = express.Router();

// Get all users except current user
router.get("/users/:userId", async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.userId } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users" });
  }
});

// Send Friend Request
router.post("/sendRequest", async (req, res) => {
  const { senderId, receiverId } = req.body;
  
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
      .populate("sender", "username");
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
