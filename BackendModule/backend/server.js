const express = require('express');
const connectDB = require('./config/db');
const chats  = require('./data/data');
const userRoutes = require('./routes/userRoutes')
require("colors");
const app = express();

app.use(express.json())

connectDB();

require("dotenv").config()

app.get("/", (req, res)=> {
    
    res.send("SERVER RUNNING SUCCESSFULLY")
})


app.use("/api/user", userRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running on port ${PORT}`.yellow.bold));