import express from 'express'
import { getBasketProducts, createBasketProduct, deleteBasketProducts, getProducts } from './basket_product.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/')
  .post(protect, createBasketProduct)
  .get(protect, getBasketProducts)

router.route('/product')
  .get(protect, getProducts)

router.route('/delete')
  .post(protect, deleteBasketProducts)

export default router