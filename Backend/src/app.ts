import express from "express";
import path from "path";
import cors from "cors";
import dotenv, { config } from "dotenv";
import { AppDataSource } from "./lib/db/db";
import router from "./routes/user.routes";
import Razorpay from 'razorpay';

dotenv.config();
const app = express();
const port = 3000;


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

export const instance = new Razorpay({
  key_id:process.env.RAZORPAY_API_KEY || "",
  key_secret:process.env.RAZORPAY_API_SECRET||""
})

if (!process.env.RAZORPAY_API_KEY || !process.env.RAZORPAY_API_SECRET) {
  throw new Error("Razorpay API credentials are not defined in the .env file.");
}

// console.log("RAZORPAY_API_KEY::::::::::::::::::::::::::::::::::::::", process.env.RAZORPAY_API_KEY);
// console.log("RAZORPAY_API_SECRET:", process.env.RAZORPAY_API_SECRET);




// AppDataSource.initialize()
//   .then(() => {
//     console.log("Database Connected Successfully");
//     app.listen(port, () => {
//       console.log(`App is running on port ${port}`);
//     });
//   })
//   .catch((err) => console.log("Error Connecting Database", err));


(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected Successfully");
    
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error Connecting Database:", err);
    process.exit(1); // Exit the process if DB connection fails
  }
})();
