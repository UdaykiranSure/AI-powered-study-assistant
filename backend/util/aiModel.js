import { GoogleGenerativeAI } from "@google/generative-ai";

const googelAPI = "AIzaSyA0W8Vf2TVBty_kQUvYeCPmjMcizGR0RjA"
const genAI = new GoogleGenerativeAI(googelAPI);
const  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" }});

export default model
