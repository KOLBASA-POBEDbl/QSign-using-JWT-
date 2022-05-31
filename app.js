const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();

const config = require('./config');
const routes = require('./routes');
const verification = require('./verification');

const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Express
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

// Nunjucks
nunjucks.configure('site', {
    autoescape: true,
    express: app
});

// Routes
app.get('/', (req, res) => {
    //console.log(req.cookies.auth_token);
    if(req.cookies.auth_token && jwt.verify(req.cookies.auth_token, config.ACCESS_TOKEN_SECRET)) {
        var data = jwt.verify(req.cookies.auth_token, config.ACCESS_TOKEN_SECRET);
        var id = data.id;
        var name = data.name;
        var title = 'Signed in';
        var signed = true; //signed
        res.render('index.njk', {user: {id, name}, siteInfo: {title, signed}});
    } else {
        var title = 'Sign in';
        var signed = false; //signedn't
        res.render('index.njk', {siteInfo: {title, signed}});
    }
});
app.use('/api/users', routes.userAPI);
app.use('/api/login', routes.userLogin);

users = [];
connections = [];

io.on('connection', function(socket) {
    connections.push(socket);

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('dataChange', (pressF) => {
        io.emit('dataChange', pressF);
    })
});

server.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}!`));