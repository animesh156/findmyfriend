const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT 


connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req,res) => {
    res.send('Hello World')
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

