const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const token = req.cookies.auth_token;
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}