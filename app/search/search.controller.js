import asyncHandler from 'express-async-handler'
import { Sequelize } from 'sequelize';
import { Product, Type } from '../models/models.js';

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    const products = await Product.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${search}%`
        }
      },
      include: { model: Type },
    });

    res.json(products);
  } catch (error) {
    res.status(400).json({ error: `Ошибка при поиске товаров: ${error}` });
  }
})