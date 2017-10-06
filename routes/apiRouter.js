var express = require('express');
var router = express.Router();
var Msg = require('../models/msgs');

//GET route for testing routing
router.get('/test', function (req, res) {
    res.send("Testing api routing"); 
})

//GET route for retrieving messages
router.get('/msgs', function (req, res) {
    Msg.getMsgs(function (err, msgs) {
        if (err) {
            throw err;
        } else {
            res.json(msgs);
        }
    }) 
})

//GET route for retrieving specific message
router.get('/msgs/:_id', function (req, res) {
    Msg.getMsgById(req.params._id, function (err, msg) {
        if (err) {
            throw err;
        } else {
            res.json(msg);
        }
    })
})

//POST route for inserting message
router.post('/msgs', function (req, res) {
    var msg = req.body;
    Msg.addMsg(msg, function (err, msg) {
        if (err) {
            throw err;
        } else {
            res.json(msg);
        }
    })
})

//PUT route for updating a message
router.put('/msgs/:_id', function (req, res) {
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
 
module.exports = router;