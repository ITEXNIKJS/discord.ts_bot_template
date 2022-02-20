import { Sequelize } from "sequelize-typescript";
import { User } from "../common/models";

export const sequelize = new Sequelize({
  host: process.env.db_host,
  port: 3306,
  database: process.env.db_name,
  dialect: "mysql",
  username: process.env.db_user,
  password: process.env.db_password,
  models: [User],
  logging: false,
});

sequelize
  .sync()
  .then((e) => {
    console.log(`[START LOG] Инициализирую базу данных`);
  })
  .catch((err) => {
    throw new Error(
      `[START LOG] Возникла ошибка при инициализации базы данных.`,
      err
    );
  });

const shemas = {
  userShema: User,
};

export default shemas;
