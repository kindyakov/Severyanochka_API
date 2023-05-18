import express from "express";
import { roleProtect } from '../middleware/role.middleware.js'
import { createFeedback, getFeedback, getFeedbackProduct, deleteFeedback, getFeedbackAdmin } from "./feedback.controller.js";

const router = express.Router()

router.route('')
  .post(createFeedback)
  .get(roleProtect('admin'), getFeedback)

router.route('/:id')
  .get(getFeedbackProduct)

router.route('/admin')
  .get(roleProtect('admin'), getFeedbackAdmin)

router.route('/delete')
  .post(roleProtect('admin'), deleteFeedback)

export default router