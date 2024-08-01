import express from "express";
import authRouter from "./src/routers/authRouter";
import userRouter from "./src/routers/userRouter";
import connectDB from "./src/dbConnect";
import { authenticateToken } from "./src/jwtAuth/authMiddeware";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use("/auth", authRouter);
// app.use(authenticateToken);
app.use("/user", userRouter);

app.listen(3000);
