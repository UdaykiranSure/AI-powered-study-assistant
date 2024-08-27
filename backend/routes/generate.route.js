import express from "express";
const router = express.Router();
import {
  generateQuestions,
  startChat,
  askQuery,
} from "../controller/generate.controller.js";

router.get("/questions/:mode", generateQuestions);
router.get("/chat/start", startChat);
router.get("/chat/query", askQuery);

export default router;
