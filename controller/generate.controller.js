// import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
// dotenv.config()
// console.log(process.env.GOOGLE_API_KEY);


export const generateQuestions = async (req,res) =>{
   try {
   const googelAPI = "AIzaSyA0W8Vf2TVBty_kQUvYeCPmjMcizGR0RjA"
   const genAI = new GoogleGenerativeAI(googelAPI);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
   const {text} = req.body;
   const result = await model.generateContent(`generate questions on ${text}, return in json format contains {qustion:...,answer:..,dificulty:...} without any backticks`);
   console.log(result.response.text());
   res.status(200).send(result.response.text())

   } catch (error) {
   console.log("error in generate controller",error.message)
   res.status(500).json({error:"error in internal server"})
   }
    }


