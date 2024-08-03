import dotenv from "dotenv";
dotenv.config();

import userRouter from "./src/routers/userRouter";
import movieRouter from "./src/routers/movieRouter";
import authRouter from "./src/routers/authRouter";
import { trackRequestCount } from "./src/middlewares/sessionMiddleware";
import session from "express-session";
import express from "express";
import connectDB from "./src/dbConnect";


const app = express();
app.use(express.json());


app.use(
  session({
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    name: "sessionCookie",
    cookie: { maxAge: 3600000 },
  })
);

app.use(trackRequestCount);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/movie", movieRouter);

connectDB();
app.listen(3000);
