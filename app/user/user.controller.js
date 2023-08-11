import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import path from 'path'
import { User, Basket, Favourite, BasketProduct, FavouriteProduct } from '../models/models.js';
import { generateToken } from './generate-token.js';
import jwt from 'jsonwebtoken'

const __dirname = path.resolve()
const quantityHashPass = 5;
const pathImg = 'app/static/img/img_users'

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
      res.json(token)
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
    let user_data = req.body;

    if (!user_data.phone || !user_data.password) {
      res.status(400)
      throw new Error('Некорректный телефон или пароль')
    }
    const isHaveUser = await User.findOne({
      where: { phone: user_data.phone }
    })

    if (isHaveUser) {
      res.status(400)
      throw new Error('Такой пользователь уже зарегестрирован')
    }

    const hashPassword = await bcrypt.hash(user_data.password, quantityHashPass)
    user_data.password = hashPassword
    const user = await User.create(user_data)

    const basket = await Basket.create({ userDatumId: user.id })
    const favourite = await Favourite.create({ userDatumId: user.id })
    const token = generateToken(user.id, user.phone, user.role)

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

export const updateProfile = asyncHandler(async (req, res) => {
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

export const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.files) {
      const { img } = req.files;
      img.mv(path.resolve(__dirname, pathImg, img.name))
      data.img = JSON.stringify([img.name]);
    }

    const user = await User.update(data, { where: { id } })

    res.json(user)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

export const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { old_password, new_password } = req.body
    let isValidOldPassword, isValidNewPassword

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { phone } = decoded

    const user = await User.findOne({
      where: { phone }
    })

    if (user) {
      isValidOldPassword = bcrypt.compareSync(old_password, user.password)
      isValidNewPassword = bcrypt.compareSync(new_password, user.password)
    }
    if (user && isValidOldPassword) {
      if (isValidNewPassword) {
        res.status(400)
        res.json({ message: 'Новый пароль совпадает со старым', name: 'new_password' })
      } else {
        const hashPassword = await bcrypt.hash(new_password, quantityHashPass)

        user.update({ password: hashPassword })
        res.json({ message: 'Вы успешно сменили пароль' })
      }
    } else {
      res.status(400)
      res.json({ message: 'Старый пароль не верный', name: 'old_password' })
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: { id }
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

export const deleteUsers = asyncHandler(async (req, res) => {
  const idArr = req.body;

  for (const id of idArr) {
    const user = await User.findOne({
      where: { id }
    })
    await User.destroy({ where: { id } })

    if (user.img) {
      if (fs.existsSync(path.resolve(__dirname, pathImg, user.img))) {
        fs.unlink(path.resolve(__dirname, pathImg, user.img), (err) => {
          if (err) throw new Error('Изображение не удалено', err)
        })
      }
    }
  }

  res.json({ message: "Пользователи удалены!" })
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

export const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id }
    })

    res.json(user)
  } catch (error) {
    res.status(400)
    throw new Error('Ошибка', error)
  }
})