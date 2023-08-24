import asyncHandler from 'express-async-handler'
import { Sequelize } from 'sequelize';
import { Product, Type, Brand, Feedback, User, Аrticle } from '../models/models.js';

export const searchProducts = asyncHandler(async (req, res) => {
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

export const searchTypes = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    const type = await Type.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${search}%`
        }
      }
    });

    res.json(type);
  } catch (error) {
    res.status(400).json({ error: `Ошибка при поиске типов: ${error}` });
  }
})

export const searchBrands = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    const brand = await Brand.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${search}%`
        }
      }
    });

    res.json(brand);
  } catch (error) {
    res.status(400).json({ error: `Ошибка при поиске брендов: ${error}` });
  }
})

export const searchFeedbacks = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    const feedback = await Feedback.findAll({
      where: {
        feedback_user: {
          [Sequelize.Op.iLike]: `%${search}%`
        }
      }
    });

    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: `Ошибка при поиске отзывов: ${error}` });
  }
})

export const searchUsers = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    const users = await User.findAll({
      where: Sequelize.where(
        Sequelize.fn('concat', Sequelize.col('surname'), ' ', Sequelize.col('name')),
        {
          [Sequelize.Op.iLike]: `%${search}%`
        }
      )
    });

    res.json(users);
  } catch (error) {
    res.status(400).json({ error: `Ошибка при поиске пользователей: ${error}` });
  }
});


export const searchАrticles = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    const article = await Аrticle.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: `%${search}%`
        }
      }
    });

    res.json(article);
  } catch (error) {
    res.status(400).json({ error: `Ошибка при поиске статей: ${error}` });
  }
})