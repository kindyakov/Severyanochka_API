import express from 'express'
import { createFavouriteProduct, getFavouriteProducts, deleteFavouriteProduct, getProducts } from './favourite_product.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/')
  .post(protect, createFavouriteProduct)
  .get(protect, getFavouriteProducts)

router.route('/:id')
  .delete(protect, deleteFavouriteProduct)

router.route('/product')
  .get(protect, getProducts)


export default router