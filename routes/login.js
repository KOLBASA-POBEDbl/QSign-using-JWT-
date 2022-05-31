const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dataBase = require('../dataBase');
const validation = require('../verification');
const config = require('../config');

router.post('/', async (req, res) => {    
    if (req.cookies.auth_token) return res.status(400).send('TF are you doing?');
    // User data validation
    const { error } = validation.loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking the email
    const user = await dataBase.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [req.body.email]);
    if (user.rows.length == 0) return res.status(400).send('XD\nTry harder!');
    // Checking the password
    const validPassord = await bcrypt.compare(req.body.password, user.rows[0].password);
    if (!validPassord) return res.status(400).send('XD\nYou are dead!');

    // Create and assign a tocken
    const token = jwt.sign({id: user.rows[0].id, name: user.rows[0].first_name}, config.ACCESS_TOKEN_SECRET);
    res.cookie('auth_token', token, {httpOnly: true}).status(200).json({mess: 'You are alive now!'});
});

router.get('/logout', validation.tokenVErifier, (req, res) => {
    return res.clearCookie('auth_token').status(200).redirect('/');
  });

module.exports = router;