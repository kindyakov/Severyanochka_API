import asyncHandler from 'express-async-handler'
import path from 'path'
import fs from 'fs'
import { Product, Characteristic, Type } from '../models/models.js'
import translit from '../translite.js'
import { Op } from 'sequelize'

const __dirname = path.resolve()
const imgPath = 'app/static/img/img_products'

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const { img } = req.files;
    let imgNames = []
    const productName = translit(data.name)

    if (!fs.existsSync(path.join(__dirname, imgPath, productName))) {
      fs.mkdir(path.join(__dirname, imgPath, productName),
        err => { if (err) console.log(err) })
    }

    if (Array.isArray(img)) {
      img.forEach(_img => {
        imgNames.push(_img.name)
        _img.mv(path.join(__dirname, imgPath, productName, _img.name),
          err => { if (err) console.log(err) })
      });

      data.img = JSON.stringify(imgNames)
    } else {
      img.mv(path.join(__dirname, imgPath, productName, img.name),
        err => { if (err) console.log(err) })
      imgNames.push(img.name)
      data.img = JSON.stringify(imgNames)
    }

    const product = await Product.create(data)

    if (data.characteristic) {
      const characteristicArr = JSON.parse(data.characteristic)

      for (const obj of characteristicArr) {
        obj.productId = product.id
        const characteristic = await Characteristic.create(obj)
      }
    }

    // Получение объекта Product вместе с объектом Type
    const productWithType = await Product.findOne({
      where: { id: product.id },
      include: { model: Type }
    });

    res.json(productWithType)
  } catch (error) {
    res.status(400)
    throw new Error('Продукт не создан', error)
  }
})

export const getProducts = asyncHandler(async (req, res) => {
  try {
    let { brandId, typeId, limit, page, filters } = req.query;
    let product;
    page = page || 1;
    limit = limit || 6;
    let offset = page * limit - limit

    if (!brandId && !typeId) {
      product = await Product.findAndCountAll({
        order: [
          ['id', 'ASC'],
        ], limit, offset,
        include: { model: Type }
      })
    }
    if (brandId && !typeId) {
      product = await Product.findAndCountAll({
        where: { brandId },
        order: [
          ['id', 'ASC'],
        ],
        limit, offset,
        include: { model: Type }
      })
    }
    if (!brandId && typeId && !filters) {
      const max = await Product.max('price', { where: { typeId } })
      const min = await Product.min('price', { where: { typeId } })
      product = await Product.findAndCountAll({
        where: { typeId },
        order: [
          ['id', 'ASC'],
        ],
        limit, offset,
        include: { model: Type }
      })
      product.filter = { min, max }
    }
    if (brandId && typeId) {
      product = await Product.findAndCountAll({
        where: { brandId, typeId },
        order: [
          ['id', 'ASC'],
        ],
        limit, offset,
        include: { model: Type }
      })
    }
    if (filters && typeId) {
      product = await Product.findAndCountAll({
        where: {
          typeId,
          price: {
            [Op.between]: [--filters.min, ++filters.max],
          }
        },
        order: [
          [`${filters.sort_name}`, `${filters.sort_type}`],
        ],
        limit, offset,
        include: { model: Type }
      })
      product.filter = filters
    }

    res.json(product)
  } catch (error) {
    res.status(400)
    throw new Error('Products not found', error)
  }
})

export const getProductsList = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [
        ['id', 'ASC'],
      ]
    })

    res.json(products)
  } catch (error) {
    res.status(400)
    throw new Error('Продукты не найдены', error)
  }
})

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id },
    include: [{ model: Characteristic, as: 'characteristic' }]
  });

  if (product === null) {
    res.json({ message: `Продукт не найден по этому ID ${id}` });
  } else {
    res.json(product);
  }
});

export const getProductAdmin = asyncHandler(async (req, res) => {
  try {
    let { sorting, page, limit } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const product = await Product.findAndCountAll({
      order: [
        [sorting.data, sorting.type],
      ],
      limit, offset
    })

    res.json(product)
  } catch (error) {
    res.status(400)
    throw new Error('Продукт не найден', error)
  }
})

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.destroy({
      where: { id }
    })

    const characteristic = await Characteristic.destroy({
      where: { productId: id }
    })

    res.json({ message: 'The product has been removed' })
  } catch (error) {
    res.status(400)
    throw new Error('Product not found', error)
  }
})

export const deleteProducts = asyncHandler(async (req, res) => {
  try {
    const idArr = req.body;


    for (const id of idArr) {
      const product = await Product.findOne({
        where: { id }
      })
      if (product.img) {
        if (fs.existsSync(path.join(__dirname, imgPath, translit(product.name)))) {
          fs.rm(path.join(__dirname, imgPath, translit(product.name)), { recursive: true }, (err) => {
            if (err) throw new Error('Изображения не удалены', err)
          })
        }
      }

      await product.destroy({ where: { id } })

      const characteristic = await Characteristic.destroy({
        where: { productId: id }
      })
    }

    res.json({ message: 'Продукты успешно удалены!' })
  } catch (error) {
    res.status(400)
    throw new Error('Продукты не удалены!', error)
  }
})

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const { img } = req.files;
    let imgNames = []
    const productName = translit(data.name)

    if (!fs.existsSync(path.join(__dirname, imgPath, productName))) {
      fs.mkdir(path.join(__dirname, imgPath, productName),
        err => { if (err) console.log(err) })
    }
    if (Array.isArray(img)) {
      img.forEach(_img => {
        _img.mv(path.join(__dirname, imgPath, productName, _img.name),
          err => { if (err) console.log(err) })
        imgNames.push(_img.name)
      });
      data.img = JSON.stringify(imgNames)
    } else {
      img.mv(path.join(__dirname, imgPath, productName, img.name),
        err => { if (err) console.log(err) })
      imgNames.push(img.name)
      data.img = JSON.stringify(imgNames)
    }

    await Product.update(
      data,
      {
        where: { id }
      }
    )
    if (data.characteristic) {
      const characteristicArr = JSON.parse(data.characteristic)
      for (const obj of characteristicArr) {
        const { title, description } = obj
        if (obj.id === 'new') {
          const characteristic = await Characteristic.create({
            title,
            description,
            productId: id
          })
        } else {
          const characteristic = await Characteristic.update(
            { title, description },
            { where: { id: obj.id } })
        }
      }
    }
    const product = await Product.findOne({
      where: { id },
      include: [{ model: Characteristic, as: 'characteristic' }]
    })

    res.json(product)
  } catch (error) {
    res.status(400)
    throw new Error('Продукт не обновлен', error)
  }
})