import asyncHandler from 'express-async-handler'
import { Basket, BasketProduct, Product } from '../models/models.js'

export const createBasketProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    const basket = await Basket.findOne({
      where: { userDatumId: userId }
    })

    const basket_product = await BasketProduct.create({
      basketDatumId: basket.id,
      productId
    })

    res.json({ isAdd: true, message: 'Продукт добавлен в корзину' })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const addBasketProducts = asyncHandler(async (req, res) => {
  try {
    const idArr = req.body;
    const { userId } = req.user;
    let arrBasketProduct = []

    const basket = await Basket.findOne({
      where: { userDatumId: userId }
    })

    idArr.forEach(id => arrBasketProduct.push({
      productId: id, basketDatumId: basket.id
    }));

    await BasketProduct.bulkCreate(arrBasketProduct)

    const basket_product = await BasketProduct.findAll({
      where: { basketDatumId: basket.id }
    })

    res.json(basket_product)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const getBasketProducts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;

    const basket = await Basket.findOne({
      where: { userDatumId: userId }
    })

    const basket_product = await BasketProduct.findAll({
      where: { basketDatumId: basket.id }
    })

    res.json(basket_product)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const deleteBasketProducts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const idArr = req.body
    let products = []

    for (const id of idArr) {
      await BasketProduct.destroy({
        where: { productId: id }
      })
    }

    const basket = await Basket.findOne({
      where: { userDatumId: userId }
    })

    const basket_products = await BasketProduct.findAll({
      where: { basketDatumId: basket.id }
    })

    for (const basket_product of basket_products) {
      const product = await Product.findOne({ where: { id: basket_product.productId } })
      products.push(product)
    }

    res.json(products)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    let products = []

    const basket = await Basket.findOne({
      where: { userDatumId: userId }
    })

    const basket_products = await BasketProduct.findAll({
      where: { basketDatumId: basket.id }
    })

    for (const basket_product of basket_products) {
      const product = await Product.findOne({ where: { id: basket_product.productId } })
      products.push(product)
    }

    res.json(products)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})