const Post = require("./post");
const User = require("./user");
const Comment = require("./comment");
const { db } = require("./connection");

const loadmodel = async () => {
  Post.belongsTo(User, { onDelete: "cascade" });
  Post.hasMany(Comment, { onDelete: "cascade" });
  Comment.belongsTo(User, { onDelete: "cascade" });
  db.sync({ alter: false });
};
module.exports = { loadmodel, Post, User, Comment };
