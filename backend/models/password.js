const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8) // Minimum de 8 caractères requis
  .is()
  .max(30) // Maximum de 30 caractères autorisés
  .has()
  .uppercase(1) // Doit contenir au moins une majuscule
  .has()
  .lowercase(1) // Doit contenir au moins une minuscule
  .has()
  .digits(1) // Doit contenir au moins un chiffre
  .has()
  .not()
  .spaces(); // Ne doit pas contenir d'espaces

module.exports = passwordSchema;
