const { Post, User, Comment } = require("../models/index");
// logique métier des fonctions post
const jwt = require("jsonwebtoken");

// import du package filesystem
const fs = require("fs");
const { post } = require("../routes/post");
require("dotenv").config();
// fonctions métiers pour les post
// on va exporter les différentes fonctions metiers
// utilisation des methodes pour envoi et retour de la reponse au format json et de next pour renvoi à la prochaine fonction

// création d'un post
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  let post = {
    content: postObject.content,
    UserId: req.token.userId,
  };

  if (req.file) {
    post.media = `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`;
  }
  Post.create({
    ...post,
  })
    .then((post) => res.status(201).json({ post }))
    .catch((error) =>
      res.status(400).json({ message: "erreur création bdd", error })
    );
};

// Modification d'un post

exports.modifyPost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })

    .then((post) => {
      if (post.UserId == req.token.userId || req.token.isAdmin) {
        const postObject = JSON.parse(req.body.post)
        post.content = postObject.content;
        post.media = req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : null;
        post
          .save()
          .then((post) => res.status(201).json({ post }))
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

// Suppression d'un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.UserId == req.token.userId || req.token.isAdmin) {
        if (post.image) {
          const filename = post.image.split("/images/")[1]; // on récupère le nom du fichier à supprimer
          fs.unlink(`images/${filename}`, () => {
            // on utilise la fonction unlink du package fs pour supprimer le fichier
            post
              .destroy({ where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: "Post supprimé" }))
              .catch((error) =>
                res.status(400).json({ error: "Pb suppression post" })
              );
          });
        }
        post
          .destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé" }))
          .catch((error) =>
            res.status(400).json({ error: "Pb suppression post" })
          );
      } else {
        res
          .status(401)
          .json({ error: "Vous n'avez pas le droit de supprimer" });
      }
    })
    .catch((error) => res.status(500).json({ error: "pb base de données" }));
};

// Renvoie un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

// Renvoie tous les post
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username", "picture"],
      },
      {
        model: Comment,
        include: { model: User, attributes: ["username", "picture"] },
      },
    ],
    order: [["CreatedAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ error }));
};
