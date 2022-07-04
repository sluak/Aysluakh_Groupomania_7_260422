// multer un package qui nous permet de gérer
//les fichiers entrants dans les requêtes HTTP
const multer = require("multer");
// Extensions autorisées de fichier
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};
// Configuration de multer: contient la logique
//indiquant où enregistrer le fichier entrant
const storage = multer.diskStorage({
  // la fonction destination indique à multer
  //d'enregistrer les fichiers dans le dossier images ;
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // la fonction filename indique à multer d'utiliser le nom d'origine,
    //de remplacer les espaces par des underscores
    // et d'ajouter un timestamp
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
// Export de l'élément multer configuré / .single() indique
//la gestion uniquement des images téléchargées
module.exports = multer({ storage: storage }).single("image");
