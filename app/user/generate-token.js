import jwt from 'jsonwebtoken'

export const generateToken = (userId, phone, role) =>
  jwt.sign(
    {
      userId,
      phone,
      role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  )
