import asyncHandler from 'express-async-handler'
import { Favourite, FavouriteProduct, Product, Type } from '../models/models.js'
import { Op } from 'sequelize';

export const createFavouriteProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    const favourite = await Favourite.findOne({
      where: { userDatumId: userId }
    })

    const favourite_product = await FavouriteProduct.create({
      favouriteDatumId: favourite.id,
      productId
    })

    res.json({ isAdd: true, message: 'Продукт добавлен в корзину' })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const addFavouriteProduct = asyncHandler(async (req, res) => {
  try {
    const idArr = req.body;
    const { userId } = req.user;
    let arrFavouriteProduct = []

    const favourite = await Favourite.findOne({
      where: { userDatumId: userId }
    })

    idArr.forEach(id => arrFavouriteProduct.push({
      productId: id, favouriteDatumId: favourite.id
    }));

    await FavouriteProduct.bulkCreate(arrFavouriteProduct)

    const favourite_product = await FavouriteProduct.findAll({
      where: { favouriteDatumId: favourite.id }
    })

    res.json(favourite_product)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const getFavouriteProducts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;

    const favourite = await Favourite.findOne({
      where: { userDatumId: userId }
    })

    const favourite_product = await FavouriteProduct.findAll({
      where: { favouriteDatumId: favourite.id }
    })

    res.json(favourite_product)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const deleteFavouriteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    let products = []

    await FavouriteProduct.destroy({
      where: { productId: id }
    })

    const favourite = await Favourite.findOne({
      where: { userDatumId: userId }
    })

    const favourite_products = await FavouriteProduct.findAll({
      where: { favouriteDatumId: favourite.id }
    })

    for (const favourite_product of favourite_products) {
      const product = await Product.findOne({ where: { id: favourite_product.productId } })
      products.push(product)
    }

    res.json(products)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    let { limit, page, filters } = req.query;
    page = page || 1;
    limit = limit || 6;
    let offset = page * limit - limit
    let arrayProductId = [], product

    const favourite = await Favourite.findOne({
      where: { userDatumId: userId }
    })

    const favourite_products = await FavouriteProduct.findAll({
      where: { favouriteDatumId: favourite.id },
      attributes: ['productId'],
    })

    for (const obj of favourite_products) {
      arrayProductId.push(obj.productId)
    }
    if (arrayProductId.length === 0) {
      res.json({ count: 0 })
      return
    }

    const max = await Product.max('price', {
      where: { id: { [Op.or]: arrayProductId } }
    })
    const min = await Product.min('price', {
      where: { id: { [Op.or]: arrayProductId } }
    })

    if (filters) {
      product = await Product.findAndCountAll({
        where: {
          id: { [Op.or]: arrayProductId },
          price: { [Op.between]: [--filters.min, ++filters.max], }
        },
        order: [[`${filters.sort_name}`, `${filters.sort_type}`],],
        limit, offset,
        include: { model: Type }
      })
      product.filter = filters
    } else {
      product = await Product.findAndCountAll({
        where: { id: { [Op.or]: arrayProductId } },
        order: [['id', 'ASC']],
        limit, offset,
        include: { model: Type }
      })
      product.filter = { min, max }
    }

    res.json(product)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})