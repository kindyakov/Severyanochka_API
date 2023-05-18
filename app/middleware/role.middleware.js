import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const roleProtect = (role) => {
  return asyncHandler(async (req, res, next) => {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      if (req.headers.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) return res.status(401).json({ message: "Вы не авторизованны" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== role) {
          return res.status(403).json({ message: 'Нет доступа' })
        }

        req.user = decoded
        next()
      } else {
        res.status(401)
        throw new Error('Не авторизован, токен не валидный')
      }
    } catch (error) {
      res.status(400)
      throw new Error(error)
    }
  })
}
