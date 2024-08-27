// import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
// dotenv.config()
// console.log(process.env.GOOGLE_API_KEY);
const googelAPI = "AIzaSyA0W8Vf2TVBty_kQUvYeCPmjMcizGR0RjA"
const genAI = new GoogleGenerativeAI(googelAPI);

const generateQuestions = async (text) =>{
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const result = await model.generateContent(`generate questions on ${text}, return in json format contains {qustion:...,answer:..,dificulty:...}`);
console.log(result.response.text());
}
run();
