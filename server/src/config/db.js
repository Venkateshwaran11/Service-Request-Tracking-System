import mongoose from "mongoose";
import dns from "dns";

// Fix for querySrv ECONNREFUSED with MongoDB Atlas on Windows/local DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dotenv from "dotenv";
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB