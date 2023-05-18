import express from 'express'
import { createProduct, getProduct, getProducts, deleteProduct, updateProduct, getProductsList, deleteProducts, getProductAdmin } from './product.controller.js'
import { roleProtect } from '../middleware/role.middleware.js'

const router = express.Router()

router.route('')
  .post(roleProtect('admin'), createProduct)
  .get(getProducts)

router.route('/delete')
  .post(roleProtect('admin'), deleteProducts)

router.route('/all')
  .get(roleProtect('admin'), getProductsList)

router.route('/admin')
  .get(roleProtect('admin'), getProductAdmin)

router.route('/:id')
  .get(getProduct)
  .delete(roleProtect('admin'), deleteProduct)
  .put(roleProtect('admin'), updateProduct)

export default router