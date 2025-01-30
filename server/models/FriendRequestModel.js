const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
 