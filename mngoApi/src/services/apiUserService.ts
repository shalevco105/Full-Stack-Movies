import { USERS_PATH } from "../constants/consts";
import { ApiUser } from "../models/apiUserModel";
import RequestHandler from "../handlers/requestHandler";

class ApiUserService {
  static async getUserById(id: number): Promise<ApiUser | null> {
    return await RequestHandler.sendRequest<ApiUser>(
        `${USERS_PATH}/${id}`,
        "GET"
      );
  }
}

export default ApiUserService;