import express from "express";
import { protect } from '../middleware/auth.middleware.js'
import { } from "./order.controller.js";

const router = express.Router()

router.route('')
  .post(protect)
  .get(protect)

export default router