const express = require("express");

// Permet de créer des routeurs séparés pour chaque route principale de l'application
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

const checkPassword = require("../middleware/password-validator");
const checkEmail = require("../middleware/email-validator");
const multer = require("../middleware/multer-config");
// READ
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
// CREATE
router.post("/signup", checkEmail, checkPassword, userCtrl.signup);
router.post("/login", userCtrl.login);
// UPDATE
router.put("/", auth, multer, userCtrl.modifyUser);
// DELETE
router.delete("/", auth, userCtrl.deleteUser);

module.exports = router;
