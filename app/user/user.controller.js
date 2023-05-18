import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import path from 'path'
import { User, Basket, Favourite, BasketProduct, FavouriteProduct } from '../models/models.js';
import { generateToken } from './generate-token.js';

const __dirname = path.resolve()
const quantityHashPass = 5;

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { phone, password } = req.body;
    let isValidPassword;

    const user = await User.findOne({
      where: { phone }
    })

    if (user) isValidPassword = bcrypt.compareSync(password, user.password)

    if (user && isValidPassword) {
      const token = generateToken(user.id, user.phone, user.role)
      res.json({ token })
    } else {
      res.status(400)
      throw new Error('Телефон или пароль неверный')
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { phone, surname, name, password, date_birth, region, city, gender, email, card_discount, role } = req.body;

    if (!phone || !password) {
      res.status(400)
      throw new Error('Некорректный телефон или пароль')
    }
    const isHaveUser = await User.findOne({
      where: { phone }
    })

    if (isHaveUser) {
      res.status(400)
      throw new Error('Такой пользователь уже зарегестрирован')
    }

    const hashPassword = await bcrypt.hash(password, quantityHashPass)
    const user = await User.create({
      phone, surname, name,
      password: hashPassword,
      date_birth, region, city,
      gender, email, card_discount, role
    })

    const basket = await Basket.create({ userDatumId: user.id })
    const favourite = await Favourite.create({ userDatumId: user.id })
    const token = generateToken(user.id, phone, user.role)

    res.json({ user, token })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const profileUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user

    const user = await User.findOne({
      where: { id: userId }
    })

    res.json(user)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const updateUser = asyncHandler(async (req, res) => {
  try {
    const user_data = req.body;
    const { userId } = req.user;
    let token;

    if (req.files) {
      const { img } = req.files;
      img.mv(path.resolve(__dirname, 'app/static/img/img_users', img.name))
      user_data.img = img.name;
    }

    await User.update(user_data, {
      where: { id: userId }
    })

    const user = await User.findOne({
      where: { id: userId }
    })

    if (user_data.phone && user_data.phone !== user.phone) {
      token = generateToken(user.id, user_data.phone, user.role);
      res.json({ token, message: 'Профиль обновлен', user_data })
    }

    res.json({ message: 'Профиль обновлен' })
  } catch (error) {
    res.status(400)
    throw new Error('Ошибка', error)
  }
})

export const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body
    const { userId } = req.user;

    const user = await User.findOne({
      where: { id: userId }
    })

    const hashPassword = await bcrypt.hash(password, quantityHashPass)

    user.update({ password: hashPassword })

    res.json({ message: 'Не готов' })
  } catch (error) {
    res.status(400)
    throw new Error('Ошибка', error)
  }
})

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({
      where: { id: userId }
    })

    if (!user) {
      res.status(400)
      throw new Error('Пользователь не найден')
    }

    const basket = await basket.destroy({
      where: { userDatumId: user.id }
    })
    const favourite = await Favourite.destroy({
      where: { userDatumId: user.id }
    })
    const basketProduct = BasketProduct.destroy({
      where: { basketDatumId: user.id }
    })
    const favouriteProduct = FavouriteProduct.destroy({
      where: { favouriteId: user.id }
    })

    await user.destroy();

    res.json({ message: "Пользователь удален" })
  } catch (error) {
    res.status(400)
    throw new Error('Ошибка', error)
  }
})

export const getUsers = asyncHandler(async (req, res) => {
  try {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const user = await User.findAndCountAll({
      order: [
        ['id', 'ASC'],
      ], limit, offset
    })

    res.json(user)
  } catch (error) {
    res.status(400)
    throw new Error('Ошибка', error)
  }
})

export const getUserAdmin = asyncHandler(async (req, res) => {
  try {
    let { sorting, page, limit } = req.query;
    page = page || 1;
    limit = limit || 15;
    let offset = page * limit - limit

    const user = await User.findAndCountAll({
      order: [
        [sorting.data, sorting.type],
      ],
      limit, offset
    })

    res.json(user)
  } catch (error) {
    res.status(400)
    throw new Error('Продукт не найден', error)
  }
})