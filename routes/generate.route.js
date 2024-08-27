import express from "express"
const router = express.Router()
import { generateQuestions } from "../controller/generate.controller.js"

router.get("/questions",generateQuestions)

export default router