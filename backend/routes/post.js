const express = require("express");

// Permet de créer des routeurs séparés
//pour chaque route principale de l'application
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post.js");

// CREATE
router.post("/", auth, multer, postCtrl.createPost);
/*router.post("/:id/like", auth, postCtrl.likePost);*/
// READ
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
// UPDATE
router.put("/:id", auth, multer, postCtrl.modifyPost);
// DELETE
router.delete("/:id", auth, postCtrl.deletePost);

// Exportation des méthodes attribuées aux routes
module.exports = router;
