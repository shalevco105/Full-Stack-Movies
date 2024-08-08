import mongoose from "mongoose";
import { appConfig } from "./utils/appConfig";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${appConfig.MONGO_PATH}/db`, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
