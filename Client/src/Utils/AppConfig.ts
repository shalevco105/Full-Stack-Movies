class AppConfig {

	public readonly moviesUrl = "http://localhost:3030/movie/";
	public readonly registerUrl = "http://localhost:3030/auth/register/";
	public readonly loginUrl = "http://localhost:3030/auth/login/";

	public readonly geminiUrl = "https://api.openai.com/v1/chat/completions";
	public readonly geminiKey = "AIzaSyA96K4uCCFPnSUC7iu1Qx6pdLUcKWXRzlM";

}

export const appConfig = new AppConfig();
