import { Response, NextFunction } from "express";
import JsonUtil from "../utils/jsonUtil";
import { appConfig } from "../utils/appConfig";

export const trackRequestCount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.counter) {
    req.session.counter = 1;
  } else {
    req.session.counter++;
  }

  try {
    if (req.session.counter > appConfig.ACTIONS_LIMIT) {
      res.send("Request count limit reached. Please try again later.");
      return
    } else {
      await JsonUtil.addSessionToJson(
        req.sessionID,
        req.session.counter,
        req.path
      );
    }
  } catch (error) {
    console.error("Error adding log to JSON:", error);
  }

  next();
};
