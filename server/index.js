const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT 
const authRoutes = require('./routes/authRoute')
const friendRequestModel = require('./models/friendRequestModel')
const FriendRequestRoute = require('./routes/FriendRequestRoute')


connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))




app.use('/user', authRoutes)
app.use('/friends', FriendRequestRoute)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

