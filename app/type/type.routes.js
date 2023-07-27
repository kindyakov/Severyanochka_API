import express from 'express'
import { createType, getTypes, deleteType, updateType, getType, deleteTypes, getTypesList, getTypeAdmin } from './type.controller.js'
import { roleProtect } from '../middleware/role.middleware.js'

const router = express.Router()

router.route('/')
  .post(roleProtect('admin'), createType)
  .get(getTypes)

router.route('/delete')
  .post(roleProtect('admin'), deleteTypes)

router.route('/all')
  .get(getTypesList)

router.route('/admin')
  .get(roleProtect('admin'), getTypeAdmin)

router.route('/:id')
  .get(getType)
  .delete(roleProtect('admin'), deleteType)
  .put(roleProtect('admin'), updateType)

export default router