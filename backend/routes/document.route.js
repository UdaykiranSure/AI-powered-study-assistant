import express from 'express'
import { findDoc, saveDoc } from '../controller/document.controller.js'

const router  = express.Router()

router.get('/:id',findDoc);
router.post('/:id',saveDoc);
export default router