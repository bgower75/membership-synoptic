const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.setTimeout(120000, function(){
        console.log('Request has timed out.');
            res.send(408);
        });

    next();
});
app.use ('/api', require('./router/membership-router'));

module.exports = app
