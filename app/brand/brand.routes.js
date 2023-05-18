import express from 'express'
import { createBrand, getBrands, updateBrand, deleteBrand, getBrand, deleteBrands, getBrandsList, getBrandAdmin } from './brand.controller.js'
import { roleProtect } from '../middleware/role.middleware.js'

const router = express.Router()

router.route('/')
  .post(roleProtect('admin'), createBrand)
  .get(getBrands)

router.route('/delete')
  .post(roleProtect('admin'), deleteBrands)

router.route('/all')
  .get(getBrandsList)

router.route('/admin')
  .get(roleProtect('admin'), getBrandAdmin)

router.route('/:id')
  .get(getBrand)
  .put(roleProtect('admin'), updateBrand)
  .delete(roleProtect('admin'), deleteBrand)

export default router