const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({path: root('.env')});

module.exports = {
    PORT: process.env.PORT || 8000,
    DBPORT: process.env.DBPORT || 5432,
    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER || 'postgres',
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};
