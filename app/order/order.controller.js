import asyncHandler from 'express-async-handler'
import { Order, Delivery, OrderProduct } from '../models/models.js'

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const { userId } = req.user;
    const { deliveryData, orderProduct } = data
    let arrOrderProduct = []

    const order = await Order.create({ userDatumId: userId })

    orderProduct.forEach(obj => arrOrderProduct.push({
      productId: obj.id, orderDatumId: order.id, count: obj.count
    }));

    await OrderProduct.bulkCreate(arrOrderProduct)

    deliveryData.orderDatumId = order.id
    const delivery = await Delivery.create(deliveryData)

    res.json(true)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})