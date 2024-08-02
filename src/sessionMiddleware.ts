import { Response, NextFunction } from "express";
import JsonHandler from "./handlers/jsonHandler";

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

  console.log(
    `Session ID: ${req.sessionID}, Request Count: ${req.session.counter}`
  );

  try {
    console.log("counter: " + req.session.counter);
    if (req.session.counter > 10) {
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
