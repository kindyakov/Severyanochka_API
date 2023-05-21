import express from 'express'
import { loginUser, profileUser, registerUser, updateUser, deleteUser, updateUserPassword, getUsers, getUserAdmin } from './user.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { roleProtect } from '../middleware/role.middleware.js'

const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/profile').get(protect, profileUser)
router.route('')
  .put(protect, updateUser)
  .delete(protect, deleteUser)
  .get(protect, getUsers)

router.route('/password')
  .put(protect, updateUserPassword)

router.route('/admin')
  .get(roleProtect('admin'), getUserAdmin)

export default router