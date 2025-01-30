const mongoose = require('mongoose')

const FriendRequestSchema = mongoose.Schema({
    sender: {
        type:mongoose.Schema.Types.ObjectId, 
        ref: "User",
         required: true
    },

    sender: {
        type:mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
})


module.exports = mongoose.model('FriendRequest', FriendRequestSchema)