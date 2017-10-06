var express = require('express');
var router = express.Router();
var Msg = require('../models/msgs');
var User = require('../models/user');


//GET route for testing routing
router.get('/test', function (req, res) {
    res.send("Testing admin routing");
})


//DELETE route for deleting all msgs
router.delete('/msgs', function (req, res) {
    Msg.removeMsgs(function (err, msg) {
        if (err) {
            throw err;
        } else {
            res.json(msg);
        }
    })
})

//DELETE route for deleting all users
router.delete('/users', function (req, res) {
    User.remove(function (err, msg) {
        if (err) {
            throw err;
        } else {
            res.json(msg);
        }
    })
})

module.exports = router;