const validator = require('./validator');
const tokenVErifier = require('./tokenVerifier');

module.exports.registerValidation = validator.registerValidation;
module.exports.loginValidation = validator.loginValidation;
module.exports.tokenVErifier = tokenVErifier;