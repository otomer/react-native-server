var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');

var db = require('./config/db');
db.setup();

//Requests handling (http://johnzhang.io/options-request-in-express)
//Parse incoming requests
app.use(bodyParser.json());

//Middleware
var requestMiddleWare = function (req, res, next) {
    var d = dateFormat(Date.now(), "dd/mm/yyyy H:MM:ss TT");
    console.log(d + ": " + req.method + " " + req.url);
    next();  // Passing the request to the next handler in the stack.
}

app.use(requestMiddleWare)

// include routes
app.use('/auth', require('./routes/authRouter'));
app.use('/api', require('./routes/apiRouter'));

app.get('/', function (req, res) {
    res.send({
        "node express version": require('express/package').version,
        "listening on port": port
    });
})

app.listen(port);

console.log('Server is listening on port: ' + port)