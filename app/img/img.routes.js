import express from 'express'
import path from 'path'
import { imgTypes } from './img.controller.js'

const router = express.Router()
const __dirname = path.resolve()

router.use('img/img_products', express.static(path.resolve(__dirname,
  'app/static/img/img_products')))

router.use('img/img_brands', express.static(path.resolve(__dirname,
  'app/static/img/img_brands')))

router.use('img/img_types', express.static(path.resolve(__dirname,
  'app/static/img/img_types')))

router.use('img/img_users', express.static(path.resolve(__dirname,
  'app/static/img/img_users')))

router.use('img/img_posts', express.static(path.resolve(__dirname,
  'app/static/img/img_posts')))

export default router