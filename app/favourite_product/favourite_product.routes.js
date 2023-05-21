import express from 'express'
import { createFavouriteProduct, getFavouriteProducts, deleteFavouriteProduct, getProducts, addFavouriteProduct } from './favourite_product.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/')
  .post(protect, createFavouriteProduct)
  .get(protect, getFavouriteProducts)

router.route('/add')
  .post(protect, addFavouriteProduct)

router.route('/:id')
  .delete(protect, deleteFavouriteProduct)

router.route('/product')
  .get(protect, getProducts)


export default router