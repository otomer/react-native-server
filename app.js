var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const port = process.env.PORT || 3000;
var dateFormat = require('dateformat');


app.use(bodyParser.json());

// http://johnzhang.io/options-request-in-express

Msg = require('./models/msgs')

// Your own super cool function
var logger = function (req, res, next) {
    console.log("GOT REQUEST !");
    next(); // Passing the request to the next handler in the stack.
}

//Middleware
var requestMiddleWare = function (req, res, next) {
    var d = dateFormat(Date.now(), "dd/mm/yyyy H:MM:ss TT");
    console.log(d + ": " + req.method + " " + req.url);
    next();
}

app.use(requestMiddleWare)

// Connect to mongoose
mongoose.connect('mongodb://admin:admin@ds044689.mlab.com:44689/appdb', {
    useMongoClient: true
});

app.get('/', function (req, res) {
    var serverResponse = {
        "node express version": require('express/package').version,
        "listening on port": port
    };
    res.send(serverResponse);
})

app.get('/api/msgs', function (req, res) {
    Msg.getMsgs(function (err, msgs) {
        if (err) {
            throw err;
        } else {
            res.json(msgs);
        }
    })
})

app.post('/api/msgs', function (req, res) {
    var msg = req.body;
    Msg.addMsg(msg, function (err, msg) {
        if (err) {
            throw err;
        } else {
            res.json(msg);
        }
    })
})

app.put('/api/msgs/:_id', function (req, res) {
    var id = req.params._id;
    var msg = req.body;
    Msg.updateMsg(id, msg, {}, function (err, msg) {
        if (err) {
            throw err;
        } else {
            res.json(msg);
        }
    })
})

app.get('/api/msgs/:_id', function (req, res) {
    Msg.getMsgById(req.params._id, function (err, msg) {
        if (err) {
            throw err;
        } else {
            res.json(msg);
        }
    })
})

app.listen(port);

console.log('Server is listening on port: ' + port)