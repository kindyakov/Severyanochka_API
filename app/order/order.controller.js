import asyncHandler from 'express-async-handler'
import { Order, Delivery, OrderProduct } from '../models/models.js'

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    const order = await Order.findOne({
      where: { userDatumId: userId }
    })

    const order_product = await OrderProduct.create({
      basketDatumId: order.id,
      productId
    })

    res.json()
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})