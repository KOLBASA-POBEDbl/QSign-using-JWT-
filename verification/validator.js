const Joi = require('joi');

// Register validation
const registerValidation = data => {
    const schema = Joi.object({ 
        first_name: Joi.string().required(),
        last_name: Joi.string(),
        email: Joi.string().required().email(),
        phone: Joi.string(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

// Login validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()        
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;