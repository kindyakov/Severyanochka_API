import express from 'express'
import { roleProtect } from '../middleware/role.middleware.js'
import { getProducts } from './search.controller.js'

const router = express.Router()

router.route('/').get(getProducts)

export default router
