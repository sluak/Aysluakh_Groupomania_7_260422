const { Post, User, Comment } = require("../models/index");

// imports
const jwt = require("jsonwebtoken");
require("dotenv").config();
// logique métier des fonctions comment

// Création d'un commentaire
exports.createComment = (req, res, next) => {
  Post.findOne({ where: { id: req.body.postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Commentaire introuvable !" });
      }
      Comment.create({
        comment: req.body.content,
        PostId: req.body.postId,
        UserId: req.token.userId,
      })
        .then((comment) => res.status(201).json({ comment }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ message: "erreur" }));
};

// Modification d'un commentaire
exports.modifyComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (comment.UserId == req.token.userId || req.token.isAdmin) {
        const commentObject = JSON.parse(req.body.comment)
        comment.comment = commentObject.comment;
        comment
          .save()
          .then((comment) => res.status(201).json({ comment }))
          .catch((error) =>
            res.status(400).json({ message: "erreur création bdd" })
          );
      } else {
        res
          .status(401)
          .json({ error: "Vous n'avez pas le droit de supprimer" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "pb base de données" });
    });
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (comment.UserId == req.token.userId || req.token.isAdmin) {
        Comment.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
          .catch((error) =>
            res.status(400).json({ error: "Pb suppression Commentaire" })
          );
      } else {
        res.status(401).json({ error: "Vous n'avez pas le droit de supprimer" });
      }
    })
    .catch((error) => res.status(500).json({ error: "pb base de données" }));
};

// Renvoie tous les comments
exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    include: [
      {
        model: User,
        attributes: ["username", "picture"],
      },
    ],
    order: [["CreatedAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ error }));
};
