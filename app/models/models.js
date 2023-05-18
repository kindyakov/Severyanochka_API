import sequelize from "../../sequelize.js";
import { DataTypes } from "sequelize";

// date_create: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// date_update: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

const User = sequelize.define('user_data', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false, },
  surname: { type: DataTypes.STRING, allowNull: false, },
  name: { type: DataTypes.STRING, allowNull: false, },
  password: { type: DataTypes.STRING, allowNull: false, },
  date_birth: { type: DataTypes.STRING, allowNull: false, },
  region: { type: DataTypes.STRING, allowNull: false, },
  city: { type: DataTypes.STRING, allowNull: false, },
  gender: { type: DataTypes.STRING, allowNull: false, },
  email: { type: DataTypes.STRING, unique: true },
  card_discount: { type: DataTypes.STRING, unique: true },
  img: { type: DataTypes.STRING, },
  role: { type: DataTypes.STRING, defaultValue: 'user' }
})

const Basket = sequelize.define('basket_data', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
})

const BasketProduct = sequelize.define('basket_product', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
})

const Favourite = sequelize.define('favourite_data', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
})

const FavouriteProduct = sequelize.define('favourite_product', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
})

const Type = sequelize.define('type', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, },
})

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, },
})

const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
})

const Product = sequelize.define('product', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  price_card: { type: DataTypes.DECIMAL },
  img: { type: DataTypes.STRING, allowNull: false },
  discount: { type: DataTypes.INTEGER },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
})

const Characteristic = sequelize.define('characteristic_product', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
})

const Rating = sequelize.define('rating_product', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false }
})

const Feedback = sequelize.define('feedback_product', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name_user: { type: DataTypes.STRING, allowNull: false },
  feedback_user: { type: DataTypes.STRING, allowNull: false }
})

// ТИПЫ связей ===========================

// Связи Пользователя

User.hasOne(Basket) // 1 к 1
Basket.belongsTo(User)

User.hasOne(Favourite) // 1 к 1
Favourite.belongsTo(User)

User.hasMany(Rating) // 1 ко многим
Rating.belongsTo(User)

User.hasMany(Feedback) // 1 ко многим
Feedback.belongsTo(User)

// Связи Корзины

Basket.hasMany(BasketProduct) // 1 ко многим
BasketProduct.belongsTo(Basket)

// Связи Избранных

Favourite.hasMany(FavouriteProduct) // 1 ко многим
FavouriteProduct.belongsTo(Favourite)

// Связи Категорий и бренда продукта

Type.hasMany(Product) // 1 ко многим
Product.belongsTo(Type)

Type.belongsToMany(Brand, { through: TypeBrand }) // много ко многим

Brand.belongsToMany(Type, { through: TypeBrand }) // много ко многим

Brand.hasMany(Product) // 1 ко многим
Product.belongsTo(Brand)

// Связи продукта

Product.hasMany(Rating) // 1 ко многим
Rating.belongsTo(Product)

Product.hasMany(Characteristic, { as: 'characteristic' }) // 1 ко многим
Characteristic.belongsTo(Product)

Product.hasMany(Feedback, { as: 'feedback' }) // 1 ко многим
Feedback.belongsTo(Product)

Product.hasMany(BasketProduct) // 1 ко многим
BasketProduct.belongsTo(Product)

Product.hasMany(FavouriteProduct) // 1 ко многим
FavouriteProduct.belongsTo(Product)

export {
  User,
  Basket,
  BasketProduct,
  Favourite,
  FavouriteProduct,
  Type,
  Brand,
  TypeBrand,
  Product,
  Characteristic,
  Rating,
  Feedback
}