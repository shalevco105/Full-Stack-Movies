import fs from "fs/promises";
import path from "path";
import { LogModel } from "../models/logModel";
const jsonFilePath = path.join(__dirname, "../logs.json");

class JsonHandler {
  static async addLogToJson(
    sessionId: string,
    times?: number,
    action?: string
  ): Promise<void> {
    try {
      const data = await fs.readFile(jsonFilePath, "utf-8");
      const logs: LogModel[] = JSON.parse(data);

      const log = logs.find(
        (userLog: LogModel) => userLog.userId === sessionId
      );

      if (log) {
        if (log.actions.length > 0 && action && times !== undefined) {
          log.actions.push({
            numOfActionLeft: 11 - times,
            actionExecuted: action,
            date: new Date(),
          });
        } else {
          console.log("No more actions or invalid input");
        }
      } else {
        console.table(logs);

        logs.push({
          userId: sessionId,
          actions: [
            {
              numOfActionLeft: 10,
              actionExecuted: "created",
              date: new Date(),
            },
          ],
        });
        console.table(logs);
      }

      await fs.writeFile(jsonFilePath, JSON.stringify(logs, null, 2), "utf-8");
    } catch (err) {
      console.error("Error reading or writing JSON file:", err);
    }
  }
}

export default JsonHandler;
