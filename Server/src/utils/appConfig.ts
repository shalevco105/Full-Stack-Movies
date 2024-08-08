const env = process.env.config_env || "development";
const configData = require(`../../config/config.${env}.json`);

class AppConfig {
    public readonly JWT_SECRET_KEY: string = configData.JWT_SECRET_KEY;
    public readonly USERS_URL: string = configData.USERS_URL;
    public readonly MONGO_PATH: string = configData.MONGO_PATH;
    public readonly ACTIONS_LIMIT: number = configData.ACTIONS_LIMIT;
    public readonly PORT: number = configData.PORT;
    public readonly CLIENT_URL: string = configData.CLIENT_URL;
    public readonly ENV_TYPE: string = configData.ENV_TYPE;
}

export const appConfig = new AppConfig();