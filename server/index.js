import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(()=>{
        app.on("error", (error) => {
            console.error("ERROR: ", error);
            throw error;
        });
        app.listen(process.env.PORT || 3001, () => {
            console.log(`APP listening on ${process.env.PORT}`);
        });
    })
    .catch((error) => {
         console.log("FAILED TO CONNECT DB!!!", error);
    });