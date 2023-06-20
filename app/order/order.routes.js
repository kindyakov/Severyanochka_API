import express from "express";
import { protect } from '../middleware/auth.middleware.js'
import { createOrder, getOrders, getOrdersList } from "./order.controller.js";

const router = express.Router()

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders)

router.route('/list')
  .get(protect, getOrdersList)

export default router