import dotenv from "dotenv";
dotenv.config();

import userRouter from "./src/routers/userRouter";
import movieRouter from "./src/routers/movieRouter";
import authRouter from "./src/routers/authRouter";
import { trackRequestCount } from "./src/middlewares/sessionMiddleware";
import session from "express-session";
import express from "express";
import connectDB from "./src/dbConnect";
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3030;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
}));

app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY",
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
