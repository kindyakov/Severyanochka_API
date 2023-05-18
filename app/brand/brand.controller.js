import asyncHandler from 'express-async-handler'
import { Brand } from '../models/models.js';
import path from 'path'
import fs from 'fs';

const __dirname = path.resolve()
const pathImg = 'app/static/img/img_brands'

export const createBrand = asyncHandler(async (req, res) => {
  try {
    const data = req.body;

    if (req.files) {
      const { img } = req.files;
      img.mv(path.resolve(__dirname, 'app/static/img/img_brands', img.name))
      data.img = JSON.stringify([img.name]);
    }

    const brand = await Brand.create(data)
    res.json(brand)
  } catch (error) {
    res.status(400)
    throw new Error('Бренд не создан!', error)
  }
})

export const getBrands = asyncHandler(async (req, res) => {
  try {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const brand = await Brand.findAndCountAll({
      order: [
        ['id', 'ASC'],
      ], limit, offset
    })

    res.json(brand)
  } catch (error) {
    res.status(400)
    throw new Error('Бренды не найдены!', error)
  }
})

export const getBrandsList = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findAll({
      order: [
        ['id', 'ASC'],
      ]
    })

    res.json(brand)
  } catch (error) {
    res.status(400)
    throw new Error('Продукты не найдены', error)
  }
})

export const getBransAll = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findAll({
      order: [
        ['id', 'ASC'],
      ]
    })
    res.json(brand)
  } catch (error) {
    res.status(400)
    throw new Error('Бренды не найдены!', error)
  }
})

export const getBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findOne({
      where: { id }
    })

    res.json(brand)
  } catch (error) {
    res.status(400)
    throw new Error('Бренд не найден!', error)
  }
})

export const getBrandAdmin = asyncHandler(async (req, res) => {
  try {
    let { sorting, page, limit } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const brand = await Brand.findAndCountAll({
      order: [
        [sorting.data, sorting.type],
      ],
      limit, offset
    })

    res.json(brand)
  } catch (error) {
    res.status(400)
    throw new Error('Продукт не найден', error)
  }
})

export const updateBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.files) {
      const { img } = req.files;
      img.mv(path.resolve(__dirname, 'app/static/img/img_brands', img.name))
      data.img = JSON.stringify([img.name]);
    }

    await Brand.update(
      data,
      {
        where: { id }
      }
    )

    const brand = await Brand.findOne({
      where: { id }
    })

    res.json(brand)
  } catch (error) {
    res.status(400)
    throw new Error('Бренд не найден!', error)
  }
})

export const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const brand = Brand.destroy({
      where: { id }
    })
    res.json({ message: "Этот бренд удален" })
  } catch (error) {
    res.status(400)
    throw new Error('Бренд не найден!', error)
  }
})

export const deleteBrands = asyncHandler(async (req, res) => {
  try {
    const idArr = req.body;

    for (const id of idArr) {
      const brand = await Brand.findOne({
        where: { id }
      })

      if (brand.img) {
        if (fs.existsSync(path.resolve(__dirname, pathImg, brand.img))) {
          fs.unlink(path.resolve(__dirname, pathImg, brand.img), (err) => {
            if (err) throw new Error('Изображение не удалено', err)
          })
        }
      }

      await brand.destroy({ where: { id } })
    }

    res.json({ message: "Бренды удалены!" })
  } catch (error) {
    res.status(400)
    throw new Error('Тип не удален', error)
  }
})