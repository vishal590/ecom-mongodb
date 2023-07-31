import mongoose from "mongoose";
import colors from 'colors';


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Mongdb: ${conn.connection.host}`.green)
    }catch(error){
        console.log(`Errors in mongodb: ${error}`.bgRed.white)
    }
}

export default connectDB;