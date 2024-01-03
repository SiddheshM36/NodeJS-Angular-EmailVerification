const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./config/dbConnection')
const User = require('./models/user')
const userRouter = require('./routes/userRouter')


//body parser
app.use(express.json())
app.use(express.urlencoded( { extended : false   }))

//cors
app.use(cors())


//routes
app.use('/user', userRouter)




//listening port
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
})