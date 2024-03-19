import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myhotelRoutes from "./routes/my-hotels";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import hotelRoutes from "./routes/hotels";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//connect to database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);

app.use(express.json()); //to parse the incoming requests with JSON payloads
//to support query string data
app.use(express.urlencoded({ extended: true })); //to parse the incoming requests with urlencoded payloads

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myhotelRoutes);
app.use("/api/hotels", hotelRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(7000, () => {
  console.log("Server is listing on port 7000 ");
});
