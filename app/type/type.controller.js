import asyncHandler from 'express-async-handler'
import { Type } from '../models/models.js';
import path from 'path'
import fs from 'fs';

const __dirname = path.resolve()
const pathImg = 'app/static/img/img_types'

export const createType = asyncHandler(async (req, res) => {
  try {
    const data = req.body;

    if (req.files) {
      const { img } = req.files;
      img.mv(path.resolve(__dirname, pathImg, img.name))
      data.img = JSON.stringify([img.name]);
    }

    const type = await Type.create(data)
    res.json(type)
  } catch (error) {
    res.status(400)
    throw new Error('Тип не создан!', error)
  }
})

export const getTypes = asyncHandler(async (req, res) => {
  try {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const type = await Type.findAndCountAll({
      order: [
        ['id', 'ASC'],
      ], limit, offset
    })

    res.json(type)
  } catch (error) {
    res.status(400)
    throw new Error('Типы не найдены!', error)
  }
})

export const getTypesList = asyncHandler(async (req, res) => {
  try {
    const type = await Type.findAll({
      order: [
        ['id', 'ASC'],
      ]
    })

    res.json(type)
  } catch (error) {
    res.status(400)
    throw new Error('Продукты не найдены', error)
  }
})

export const getType = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const type = await Type.findOne({
      where: { id }
    })

    res.json(type)
  } catch (error) {
    res.status(400)
    throw new Error('Тип не найден!', error)
  }
})

export const getTypeAdmin = asyncHandler(async (req, res) => {
  try {
    let { sorting, page, limit } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const type = await Type.findAndCountAll({
      order: [
        [sorting.data, sorting.type],
      ],
      limit, offset
    })

    res.json(type)
  } catch (error) {
    res.status(400)
    throw new Error('Продукт не найден', error)
  }
})

export const deleteType = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const type = await Type.destroy({
      where: { id }
    })

    res.json({ message: "The type has been removed" })
  } catch (error) {
    res.status(400)
    throw new Error('Тип не удален', error)
  }
})

export const deleteTypes = asyncHandler(async (req, res) => {
  try {
    const idArr = req.body;

    for (const id of idArr) {
      const type = await Type.findOne({
        where: { id }
      })
      await Type.destroy({ where: { id } })

      if (type.img) {
        if (fs.existsSync(path.resolve(__dirname, pathImg, type.img))) {
          fs.unlink(path.resolve(__dirname, pathImg, type.img), (err) => {
            if (err) throw new Error('Изображение не удалено', err)
          })
        }
      }
    }

    res.json({ message: "Типы удалены!" })
  } catch (error) {
    res.status(400)
    throw new Error('Тип не удален', error)
  }
})

export const updateType = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.files) {
      const { img } = req.files;
      img.mv(path.resolve(__dirname, pathImg, img.name))
      data.img = JSON.stringify([img.name]);
    }

    await Type.update(
      data,
      {
        where: { id }
      }
    )

    const type = await Type.findOne({
      where: { id }
    })

    res.json(type)
  } catch (error) {
    res.status(400)
    throw new Error('Тип не обнавлен!', error)
  }
})