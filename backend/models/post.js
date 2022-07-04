const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("./connection");

const Post = db.define("Post", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  media: {
    type: DataTypes.STRING,
  },
});

module.exports = Post;
