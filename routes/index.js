var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var fs = require('fs');

router.get('/', function(req, res, next) {
  var tweets = tweetBank.list();
  res.render('index', {title: 'twitter.js', tweets: tweets});
});

router.use(function(req, res, next) {
  fs.readFile('./public/' + req.url, function(err, data) {
    if (err) next(err);
    res.setHeader('Content-Type', 'text/css');
    res.send(data);
  });  
});

module.exports = router;