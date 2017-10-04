var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const port = process.env.PORT || 3000;
var dateFormat = require('dateformat');

 app.listen(port);

console.log('Server is listening on port: ' + port)