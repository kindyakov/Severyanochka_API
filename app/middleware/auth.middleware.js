import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const protect = asyncHandler(async (req, res, next) => {
	if (req.method === "OPTIONS") {
		next()
	}
	try {
		if (req.headers.authorization?.startsWith('Bearer')) {
			const token = req.headers.authorization.split(' ')[1]

			if (!token) return res.json(401).json({ message: "Вы не авторизованны" })

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

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
