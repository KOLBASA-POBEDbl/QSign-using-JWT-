const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dataBase = require('../dataBase');
const verification = require('../verification');
const config = require('../config');

router.post('/',  async (req, res) => {
    // User data validation
    const { error } = verification.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Checking the email
    const email = await dataBase.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [req.body.email]);
    if (email.rows.length != 0) return res.status(400).send('Email already exist');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    dataBase.query('INSERT INTO users (first_name, last_name, email, phone, password) values ($1, $2, $3, $4, $5) RETURNING *',
        [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.phone,
            hashedPassword
        ],
        (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                // Create and assign a tocken
                const token = jwt.sign({id: result.rows[0].id, name: result.rows[0].first_name}, config.ACCESS_TOKEN_SECRET);
                res.cookie('auth_token', token, {httpOnly: true}).status(200).json({mess: 'You are alive now!'});
            }
    });
});

router.get('/:id', /* tokenVerifier, */ async (req, res) => {
    const user = await dataBase.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [req.params.id]);
    if (user.rows.length == 0) return res.status(400).send('There is no user with this ID.');
    //res.send('Here it is!\n' + JSON.stringify(user.rows[0]));
    res.send(user.rows[0]);
});
router.post('/permission', verification.tokenVErifier, (req, res) => {
    res.send({OK: true});
})

router.put('/:id', verification.tokenVErifier, async (req, res) => {
    const user = await dataBase.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [req.params.id]);
    if (user.rows.length == 0) return res.status(400).send('There is no user with this ID.');
    // New data validation
    const { error } = verification.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Hash new password
    var hashedPassword;
    if (req.body.password != user.rows[0].password)
    {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(req.body.password, salt);
    } else {
        hashedPassword = req.body.password;
    }
    
    // Updating user
    dataBase.query('UPDATE users set first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *',
    [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.phone,
        hashedPassword,
        req.params.id
    ],
    (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('We did it!');
        }
    });
});

module.exports = router;