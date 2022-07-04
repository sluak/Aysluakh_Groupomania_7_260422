const { Post, User, Comment } = require("../models/index");
// Inscription d'un nouvel utilisateur
// logique métier des fonctions utilisateur
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");
require("dotenv").config();

// Inscription d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  //La méthode  hash()  de bcrypt crée un hash crypté des mots de passe de nos utilisateurs
  //pour les enregistrer de manière sécurisée dans la base de données.
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) =>
          res.status(400).json({
            message: "Utilisateur déjà enregistré",
            error: error,
          })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};
// Connexion de l'utilisateur
exports.login = (req, res, next) => {
  //vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données :
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //La méthode Compare de bcrypt compare un string avec un hash pour
      // vérifier si un mot de passe entré par l'utilisateur correspond à un hash sécurisé enregistré en base de données.
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            //la fonction sign de jsonwebtoken pour encoder un nouveau token;
            // une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour encoder notre token
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.TOKENSECRET,
              {
                // L'utilisateur devra se reconnecter au bout de 24 heures
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllUsers = (req, res, next) => {
  User.findAll({
    order: [["username", "ASC"]],
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json({
        user,
      });
    })
    .catch((error) => res.status(500).json({ error: "erreur bdd" }));
};

exports.modifyUser = (req, res, next) => {
  User.findOne({ where: { id: req.token.userId } })
    .then((user) => {
      const body = JSON.parse(req.body.user)
      user.email = body.email;
      user.username = body.username;
      user.job = body.job;
      user.bio = body.bio;
      user.UserId = req.token.userId;
      if (req.file) {
        user.picture = `${req.protocol}://${req.get("host")}/images/${req.file.filename
          }`;
      }

      user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) =>
          res.status(400).json({ message: "erreur création bdd" })
        );
    })
    .catch((error) => {
      res.status(500).json({ error: "pb base de données" });
    });
};




exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.token.userId } })
    .then((user) => {
      if (user.picture) {
        const filename = user.picture.split("/images/")[1]; // on récupère le nom du fichier à supprimer
        console.log(user.picture);
        fs.unlink(`images/${filename}`, () => {
          // on utilise la fonction unlink du package fs pour supprimer le fichier
          user
            .destroy({ where: { id: req.token.userId } })
            .then(() => res.status(200).json({ message: "Compte supprimé" }))
            .catch((error) =>
              res.status(400).json({ error: "Pb suppression compte" })
            );
        });
      } else {
        user
          .destroy({ where: { id: req.token.userId } })
          .then(() => res.status(200).json({ message: "Compte supprimé" }))
          .catch((error) =>
            res.status(400).json({ error: "Pb suppression compte" })
          );
      }
    })
    .catch((error) => res.status(500).json({ error: "pb base de données" }));
};

// exports.deleteUser = (req, res, next) => {
//   User.findOne({ where: { id: req.params.id } })
//     .then((user) => {
//       if (user.picture) {
//         const filename = user.picture.split("/images/")[1]; // on récupère le nom du fichier à supprimer
//         console.log(user.picture);
//         fs.unlink(`images/${filename}`, () => {
//           // on utilise la fonction unlink du package fs pour supprimer le fichier
//           user
//             .destroy({ where: { id: req.params.id } })
//             .then(() => res.status(200).json({ message: "Compte supprimé" }))
//             .catch((error) =>
//               res.status(400).json({ error: "Pb suppression compte" })
//             );
//         });
//       } else {
//         user
//           .destroy({ where: { id: req.params.id } })
//           .then(() => res.status(200).json({ message: "Compte supprimé" }))
//           .catch((error) =>
//             res.status(400).json({ error: "Pb suppression compte" })
//           );
//       }
//     })
//     .catch((error) => res.status(500).json({ error: "pb base de données" }));
// };
