import express from "express";
import { protect } from '../middleware/auth.middleware.js'
import { createOrder } from "./order.controller.js";

const router = express.Router()

router.route('/')
  .post(protect, createOrder)
// .get(protect)

export default router