import 'colors'
import express from "express";
import sequelize from "./sequelize.js";
import dotenv from 'dotenv'
import cors from "cors";
import fileUpload from "express-fileupload";
import path from 'path'


import { errorHandler } from "./app/middleware/error.middleware.js";
import indexRouters from "./app/index.routes.js";

dotenv.config()

const PORT = process.env.PORT || 9000;
const app = express();
const __dirname = path.resolve()

app.use(cors()) // для отправки запросов с браузера
app.use(express.json())

app.use('/img/img_products',
  express.static(path.resolve(__dirname,
    'app/static/img/img_products')))
app.use('/img/img_users',
  express.static(path.resolve(__dirname,
    'app/static/img/img_users')))
app.use('/img/img_posts',
  express.static(path.resolve(__dirname,
    'app/static/img/img_posts')))
app.use('/img/img_brands',
  express.static(path.resolve(__dirname,
    'app/static/img/img_brands')))
app.use('/img/img_types',
  express.static(path.resolve(__dirname,
    'app/static/img/img_types')))

app.use(fileUpload({}))
app.use('/api', indexRouters)

// Обработка ошибки
app.use(errorHandler)

const main = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(PORT, () => console.log(`🚀 server start http://localhost:${PORT}`.blue.bold))
  } catch (error) {
    console.log(error)
  }
}

main();