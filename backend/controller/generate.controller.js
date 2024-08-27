// import dotenv from "dotenv";
// dotenv.config()
// console.log(process.env.GOOGLE_API_KEY);
import model from "../util/aiModel.js";

export const generateQuestions = async (req, res) => {
  try {
    const { text } = req.body;
    const mode = req.params;
    let result;
    if (mode.mode === "1") {
      console.log(1);
      result = await model.generateContent(
        `generate mutli choise questions on ${text}, return in json format contains {question:...,option:..,answer option:...} without any stylings`
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

let chat;
export const startChat = async (req, res) => {
  try {
    const { text } = req.body;
    chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: text }],
        },
      ],
    });
    res.status(200).send("chat started");
  } catch (error) {
    console.log("error in start chat controller", error.message);
    res.status(500), json({ error: "error in internal server" });
  }
};

export const askQuery = async (req, res) => {
  try {
    const { query } = req.body;
    let result = await chat.sendMessage(
      `${query} answer this question without any styling in a format {answer:...}`
    );
    console.log(result.response.text());
    res.status(200).send(result.response.text());
  } catch (error) {
    console.log("error in askQuery controller", error.message);
    res.status(500).json({ error: "error in internal server" });
  }
};
