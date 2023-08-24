import express from 'express'
import { roleProtect } from '../middleware/role.middleware.js'
import {
  searchProducts, searchTypes,
  searchBrands, searchFeedbacks,
  searchUsers, searchАrticles
} from './search.controller.js'

const router = express.Router()

router.route('/product').get(searchProducts)
router.route('/type').get(searchTypes)
router.route('/brand').get(searchBrands)
router.route('/user').get(searchUsers)
router.route('/Feedback').get(searchFeedbacks)
router.route('/article').get(searchАrticles)

export default router
