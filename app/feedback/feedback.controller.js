import asyncHandler from 'express-async-handler'
import path from 'path'
import { Feedback } from '../models/models.js'

const __dirname = path.resolve()

export const createFeedback = asyncHandler(async (req, res) => {
  try {
    const data = req.body

    const feedback = await Feedback.create(data)

    res.json(feedback)
  } catch (error) {
    res.status(400)
    throw new Error('Отзывы не создан', error)
  }
})

export const getFeedback = asyncHandler(async (req, res) => {
  try {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const feedback = await Feedback.findAndCountAll({
      order: [
        ['id', 'ASC'],
      ], limit, offset
    })

    res.json(feedback)
  } catch (error) {
    res.status(400)
    throw new Error('Отзывы не найдены', error)
  }
})

export const getFeedbackAdmin = asyncHandler(async (req, res) => {
  try {
    console.log('asdasdasdasdasd')
    let { sorting, page, limit } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const feedback = await Feedback.findAndCountAll({
      order: [
        [sorting.data, sorting.type],
      ],
      limit, offset
    })

    res.json(feedback)
  } catch (error) {
    res.status(400)
    throw new Error('Отзывы не найдены', error)
  }
})

export const getFeedbackProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findAll({
      order: [
        ['id', 'ASC'],
      ],
      where: { productId: id }
    })

    res.json(feedback)
  } catch (error) {
    res.status(400)
    throw new Error('Отзывы не найдены', error)
  }
})

export const deleteFeedback = asyncHandler(async (req, res) => {
  try {
    const idArr = req.body;

    for (const id of idArr) {
      const feedback = await Feedback.findOne({
        where: { id }
      })
      await feedback.destroy({ where: { id } })
    }

    res.json({ message: "Отзывы удалены!" })
  } catch (error) {
    res.status(400)
    throw new Error('Отзывы не удален', error)
  }
})