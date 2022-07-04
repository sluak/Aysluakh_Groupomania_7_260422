const express = require("express");

// Permet de créer des routeurs séparés
//pour chaque route principale de l'application
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const commentCtrl = require("../controllers/comment.js");

// CREATE
router.post("/", auth, multer, commentCtrl.createComment);
// READ
router.get("/", auth, commentCtrl.getAllComments);
// UPDATE
// router.put("/:id", auth, commentCtrl.modifyComment);
// DELETE*/
router.delete("/:id", auth, commentCtrl.deleteComment);

// Exportation des méthodes attribuées aux routes
module.exports = router;
