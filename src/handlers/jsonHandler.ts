import fs from "fs/promises";
import path from "path";
import { SessionModel } from "../models/sessionModel";
const jsonFilePath = path.join(__dirname, "../sessions.json");
const ACTIONS_LIMIT = process.env.ACTIONS_LIMIT || '10';

class JsonHandler {
  static async addSessionToJson(
    sessionId: string,
    times?: number,
    action?: string
  ): Promise<void> {
    try {
      const data = await fs.readFile(jsonFilePath, "utf-8");
      const sessions: SessionModel[] = JSON.parse(data);

      const session = sessions.find(
        (userLog: SessionModel) => userLog.sessionId === sessionId
      );

      if (session) {
        if (session.actions.length > 0 && action && times !== undefined) {
          session.actions.push({
            numOfActionLeft: parseInt(ACTIONS_LIMIT) - times,
            actionExecuted: action,
            date: new Date(),
          });
        } else {
          console.log("No more actions or invalid input");
        }
      } else {
        sessions.push({
          sessionId: sessionId,
          actions: [
            {
              numOfActionLeft: 9,
              actionExecuted: "session created",
              date: new Date(),
            },
          ],
        });
      }

      await fs.writeFile(jsonFilePath, JSON.stringify(sessions, null, 2), "utf-8");
    } catch (err) {
      console.error("Error reading or writing JSON file:", err);
    }
  }
}

export default JsonHandler;
