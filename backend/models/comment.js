const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("./connection");

const Comment = db.define("Comment", {
  comment: {
    type: DataTypes.TEXT,
  },
});

module.exports = Comment;
