import express from 'express'
import userRoutes from "./user/user.routes.js";
import basketRoutes from "./basket_product/basket_ptoduct.routes.js";
import favouriteRoutes from "./favourite_product/favourite_product.routes.js";
import productRoutes from './product/product.routes.js'
import typeRoutes from './type/type.routes.js'
import brandRoutes from './brand/brand.routes.js'
import feedbackRoutes from './feedback/feedback.routes.js'
import orderRoutes from './order/order.routes.js'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/basket', basketRoutes)
router.use('/favourite', favouriteRoutes)
router.use('/product', productRoutes)
router.use('/type', typeRoutes)
router.use('/brand', brandRoutes)
router.use('/feedback', feedbackRoutes)
router.use('/order', orderRoutes)

export default router