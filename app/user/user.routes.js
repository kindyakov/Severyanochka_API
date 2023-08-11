import express from 'express'
import {
  loginUser, profileUser, registerUser,
  updateProfile, deleteUser, updateUserPassword,
  getUsers, getUserAdmin, getUser, deleteUsers, updateUser
} from './user.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { roleProtect } from '../middleware/role.middleware.js'

const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/profile').get(protect, profileUser)
router.route('')
  .put(protect, updateProfile)
  .get(protect, getUsers)

router.route('/password')
  .put(protect, updateUserPassword)

router.route('/admin')
  .get(roleProtect('admin'), getUserAdmin)

router.route('/:id')
  .get(roleProtect('admin'), getUser)
  .delete(roleProtect('admin'), deleteUser)
  .put(roleProtect('admin'), updateUser)

router.route('/delete')
  .post(roleProtect('admin'), deleteUsers)

export default router