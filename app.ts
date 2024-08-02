import express from "express";
import authRouter from "./src/routers/authRouter";
import userRouter from "./src/routers/userRouter";
import movieRouter from "./src/routers/movieRouter";
import { trackRequestCount } from "./src/sessionMiddleware";
import connectDB from "./src/dbConnect";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    name: "sessionCookie",
    cookie: { maxAge: 3600000 },
  })
);

app.use(trackRequestCount);

// app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/movie", movieRouter);

app.listen(3000);
