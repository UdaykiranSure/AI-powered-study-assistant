import express from "express";
const router = express.Router();
import {
  generateQuestions,
  startChat,
  askQuery,
} from "../controller/generate.controller.js";

router.post("/questions/:mode", generateQuestions);
router.post("/chat/start", startChat);
router.post("/chat/query", askQuery);

export default router;
