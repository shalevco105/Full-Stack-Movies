import { appConfig } from "../Utils/AppConfig";
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
    public async chat(prompt: string) {
        const genAI = new GoogleGenerativeAI(appConfig.geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    }
}

export const geminiService = new GeminiService();
