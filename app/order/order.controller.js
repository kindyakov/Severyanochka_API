import asyncHandler from 'express-async-handler'
import { Order, Delivery, OrderProduct, Product, Type } from '../models/models.js'

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const { userId } = req.user;
    let arrOrderProduct = []

    const order = await Order.create({ userDatumId: userId })

    data.products.forEach(obj => arrOrderProduct.push({
      productId: obj.id, orderDatumId: order.id, count: obj.count
    }));

    await OrderProduct.bulkCreate(arrOrderProduct)

    data.deliveryData.orderDatumId = order.id
    const delivery = await Delivery.create(data.deliveryData)

    res.json({ delivery, data: data.deliveryData })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const getOrdersList = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;

    const orders = await Order.findAll({
      where: { userDatumId: userId },
      order: [['id', 'DESC']],
    });

    res.json(orders)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

export const getOrders = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 5;
    let offset = page * limit - limit

    const orders = await Order.findAndCountAll({
      where: { userDatumId: userId },
      order: [['id', 'DESC']],
      limit,
      offset,
      distinct: true,
      include: [
        { model: Delivery },
        {
          model: OrderProduct, as: 'orderProduct',
          include: [{
            model: Product, as: 'product',
            include: [{ model: Type }]
          }]
        }
      ]
    });

    res.json(orders)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})