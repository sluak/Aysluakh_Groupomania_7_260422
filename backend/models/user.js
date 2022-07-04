const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("./connection");
//for registered users
const User = db.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  job: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
