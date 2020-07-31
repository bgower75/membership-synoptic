const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')
const basicAuth = require('express-basic-auth')
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    name: 'sid', //session id
    resave: false,
    secret: `'${process.env.SESSION_SECRET}'`,
    saveUninitialized: false,
    cookie: {
        maxAge: Number(process.env.SESSION_TIMEOUT),
        sameSite: true,
        secure: process.env.NODE_ENV
    }
}))
// app.use(basicAuth({
//     member: { 'admin': 'supersecret' }
// }))
app.use(function(req, res, next){
    res.setTimeout(120000, function(){
        console.log('Request has timed out.');
            res.send(408);
        });

    next();
});
app.use ('/api', require('./router/membership-router'));

module.exports = app
