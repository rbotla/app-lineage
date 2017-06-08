const express = require('express');

const bodyParser= require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

app.use('/api', require('./routes'));

app.listen(3001);
console.log('Listening on port 3001...');