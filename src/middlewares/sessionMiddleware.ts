import { Response, NextFunction } from "express";
import JsonHandler from "../handlers/jsonHandler";
const ACTIONS_LIMIT = process.env.ACTIONS_LIMIT || '100';

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
    if (req.session.counter > parseInt(ACTIONS_LIMIT)) {
      res.send("Request count limit reached. Please try again later.");
      return
    } else {
      await JsonHandler.addSessionToJson(
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
