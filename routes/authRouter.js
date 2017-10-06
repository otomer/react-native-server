var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/test', function (req, res) {
  res.send("Testing auth routing");
})

//POST route for updating data
router.post('/', function (req, res, next) {

  if (req.body.password !== req.body.passwordConf) {
    var errorMessage = "Passwords do not match";
    var err = new Error(errorMessage);
    //err.status = 400;
    //res.send("passwords dont match");
    //return next(err);
    // err.code = 400;
    err.status = 400;
    res.status(400);
    return next(err);
    // res.status(400)
    // return res.send(errorMessage);
    //return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
    console.log("User creation flow");

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        console.log("User created. User ID = ", user._id);

        return res.redirect('/auth/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    console.log("Authentication flow");
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/auth/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  console.log("Checking session for UserId: " + req.session.userId);
  
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var errMessage = 'Not authorized! Go back!';
          var err = new Error(errMessage);
          err.status = 400;
          //return next(err);

          res.status(400);
          return res.send('<h2>' + errMessage + '</h2>' + '<br><a type="button" href="/auth">Login</a>')

        } else {
          console.log("Authenticated.")
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<h2>UserId: </h2>' + user._id + '<br><a type="button" href="/auth/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/auth');
      }
    });
  }
});

module.exports = router;