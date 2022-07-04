// Framework Express simplifie ces tâches, en nous permettant de déployer nos API beaucoup plus rapidement
// Pour créer une application Express on utilise la méthode  express()
const express = require("express");
const app = express();
// Récupération des requêtes du body au format JSON
app.use(express.json());



// Permet la gestion des requêtes vers le dossier /images
const path = require("path");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");

// Sécurisation des en-têtes http: Préventions contre les attaques XSS
const helmet = require("helmet");

app.use(helmet());

// app.use(): permet d'attribuer un middleware à une route spécifique de l'application
app.use((req, res, next) => {
  // Permet l'accès à notre API depuis n'importe quelle origine "*"
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

  // Permet l'ajout les headers mentionnés aux requêtes envoyées vers l'API

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // Permet l'envoi des requêtes avec les méthodes mentionnées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
// Gestion des fichiers images de manière statique
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/post", postRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;

const { db, connect } = require("./models/connection");
const { loadmodel } = require("./models/index");
connect();
loadmodel();
