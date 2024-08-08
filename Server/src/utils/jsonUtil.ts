import fs from "fs/promises";
import path from "path";
import { SessionModel } from "../models/sessionModel";
import { appConfig } from "./appConfig";

const ACTION_LIMIT = appConfig.ACTIONS_LIMIT

const sessionsJsonPath = path.join(__dirname, "../data/sessions.json");
const moviesJsonPath = path.join(__dirname, "../data/movies.json");

class JsonUtil {
  static async addSessionToJson(
    sessionId: string,
    times?: number,
    action?: string
  ): Promise<void> {
    try {
      const data = await fs.readFile(sessionsJsonPath, "utf-8");
      const sessions: SessionModel[] = JSON.parse(data);

      const session = sessions.find(
        (userLog: SessionModel) => userLog.sessionId === sessionId
      );

      if (session) {
        if (session.actions.length > 0 && action && times !== undefined) {
          session.actions.push({
            numOfActionLeft: ACTION_LIMIT - times,
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
              numOfActionLeft: ACTION_LIMIT - 1,
              actionExecuted: "session created",
              date: new Date(),
            },
          ],
        });
      }

      await fs.writeFile(sessionsJsonPath, JSON.stringify(sessions, null, 2), "utf-8");
    } catch (err) {
      console.error("Error reading or writing JSON file:", err);
    }
  }

  static async readMoviesFromJson(): Promise<any[]> {
    try {
      const fileData = await fs.readFile(moviesJsonPath, 'utf8');
      return JSON.parse(fileData);
    } catch (error) {
      console.error('Error reading or parsing JSON file:', error);
      throw new Error('Failed to read or parse movies data.');
    }
  }
}

export default JsonUtil;
