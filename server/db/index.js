import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGODB CONNECTED!! DB HOST : ${connectionInstance.connection.host} `);
    } catch (error) {
        console.error(`MONGODB connection ERROR: ${error}`);
    }
}

export default connectDB