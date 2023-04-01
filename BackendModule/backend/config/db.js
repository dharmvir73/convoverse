const mongoose = require('mongoose');
require("colors");

require('dotenv').config();

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });  

        console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline)
    }catch(error){
        console.log(error.message)
        process.exit()
    }
} 

module.exports = connectDB