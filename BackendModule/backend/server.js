const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express();
require("colors");
require("dotenv").config()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://capable-shortbread-91e1ec.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.static('dist'))

app.use(express.json())

connectDB();



/*app.get("/", (req, res)=> {
    
    res.send("SERVER RUNNING SUCCESSFULLY")
})*/


app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)  

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server is running on port ${PORT}`.yellow.bold));

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin: "https://capable-shortbread-91e1ec.netlify.app"
        }
});

io.on("connection", (socket) => {
    console.log("connected to socket.io")
    socket.on('setup', (userData)=>{
        socket.join(userData._id)
        console.log(userData._id)
        socket.emit("connected")
    })
    socket.on('join chat', (room)=> {
        socket.join(room)
        console.log("user joined room: "+ room)
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on('new message', (newMessageRecived)=> {
        var chat = newMessageRecived.chat;

        console.log(chat)

        if(!chat.users) return console.log("chat.user not defined")

        chat.users.forEach(user=>{
            if(user._id == newMessageRecived.sender._id) return;
            socket.in(user._id).emit("message recived", newMessageRecived)
        })
    })

   
})