const env = process.env.CONFIG_ENV || "deployment";
const configData = require(`../../config/config.${env}.json`);

class AppConfig {
    public readonly moviesUrl: string = configData.moviesUrl;
    public readonly registerUrl: string = configData.registerUrl;
    public readonly loginUrl: string = configData.loginUrl;
    public readonly geminiUrl: string = configData.geminiUrl;
    public readonly geminiKey: string = configData.geminiKey;
}

export const appConfig = new AppConfig();
