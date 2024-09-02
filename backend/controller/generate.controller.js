// import dotenv from "dotenv";
// dotenv.config()
// console.log(process.env.GOOGLE_API_KEY);
import model from "../util/aiModel.js";

export const generateQuestions = async (req, res) => {
  try {
    console.log(req.body)
    const { text } = req.body;
    
    const mode = req.params;
    let result;
    if (mode.mode === "1") {
      console.log(1);
      result = await model.generateContent(
        `generate exactly 20  mutli choise questions on all important topics that covered in /n/n ${text},/n/n every question should contain required context to answer, return in json format contains {questions:[{question:...,options:[0,1,2,3],answer: /just give option number, topic: //topic this question covers},{question:...,option:[1,2,3,4],answer: 1... ,topic:"differenciation"},...]} without any stylings`
      );
    } else {
      result = await model.generateContent(
        `generate questions on ${text}, return in json format contains {question:...,answer:..,dificulty:...} without any stylings`
      );
    }
    console.log(result.response.text());
    res.status(200).send(result.response.text());
  } catch (error) {
    console.log("error in generate controller : ", error.message);
    res.status(500).json({ error: "error in internal server" });
  }
};

let userChats = new Map()
let chat;
export const startChat = async (req, res) => {
  try {
    console.log(req.body)
    const {userId, text } = req.body;
    
    console.log
    chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `Hii, Here is my leture notes that i want to understand /n/n ${text}` }],
        },
        {
          role:"model",
          parts:[{text:"How can i help you using the given notes"}]
        }
        ,{
          role: "user",
          parts: [{ text: "i need some help understading the above lecure notes, answer my following questions based on the text " }],
        },
      ],
    });
    userChats.set(userId,chat)
    res.status(200).json({answer:"hii how can i help you"});
  } catch (error) {
    console.log("error in start chat controller", error.message);
    res.status(500).json({ error: "error in internal server" });
  }
};

export const askQuery = async (req, res) => {
  try {
    const {userId,message} = req.body
    const userChat = userChats.get(userId)
    console.log(req.body.message)
    const query  = message;
    console.log(1,query)
    let result = await userChat.sendMessage(
      ` {question:: ${query} } reply in a format {answer:...}`
    );
    console.log(result.response.text());
    res.status(200).send(result.response.text());
  } catch (error) {
    console.log("error in askQuery controller:", error.message);
    res.status(500).json({ error: "error in internal server" });
  }
};
