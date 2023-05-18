import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  'severyanochka',
  'postgres',
  '12345',
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  }
)

export default sequelize;