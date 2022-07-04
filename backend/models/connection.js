const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.dialect,
  }
);
const connect = async () => {
  try {
    await db.authenticate();
    console.log("DataBase connected");
  } catch (error) {
    console.log("DataBase error", error);
  }
};

module.exports = { db, connect };
