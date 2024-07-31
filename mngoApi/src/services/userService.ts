import { USERS_PATH } from "../constants/consts";
import { ApiUser } from "../models/apiUserModel";
import { FullUser } from "../models/fullUserModel";
import User from "../models/mongoUserModel";
import JsonHandler from "./jsonHandler";
import RequestHandler from "./requestHandler";

class UserService {
  static async getAllUsers(): Promise<FullUser[] | undefined> {
    const mongoUsers = (await User.find()) || [];
    const fullUsers: FullUser[] = [];
    for (const mongoUser of mongoUsers) {
      const apiUser = await RequestHandler.sendRequest<ApiUser>(
        `${USERS_PATH}/${mongoUser.externalId}`,
        "GET"
      );
      const jsonUser = await JsonHandler.fetchUserDataFromJson(
        mongoUser.externalId
      );

      if (jsonUser && apiUser) {
        let fullUser: FullUser = {
          id: mongoUser.externalId,
          phone: jsonUser.phone,
          name: apiUser.name,
          username: apiUser.username,
          email: apiUser.email,
          address: {
            city: mongoUser.city,
            country: mongoUser.country,
          },
          website: apiUser.website,
          company: apiUser.company,
        };
        fullUsers.push(fullUser);
      }
    }
    return fullUsers;
  }
}

export default UserService;
