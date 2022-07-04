// Package permettant de créer et vérifier un token d'authentificaton
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    //la fonction split pour récupérer tout après l'espace dans le header. Les erreurs générées ici s'afficheront dans le bloc catch ;
    const token = req.headers.authorization.split(" ")[1];
    //la fonction verify du package jsonwebtoken permet de vérifier la validité d'un token. Si celui-ci n'est pas valide, une erreur
    //sera générée ;
    req.token = jwt.verify(token, process.env.TOKENSECRET);

    /* req.auth = { userId };*/
    // Comparaison de l'id de l'utilisateur avec celui extrait du token

    next();
    // Exécution de l'authentification
  } catch {
    res.status(401).json({ error });
  }
};
