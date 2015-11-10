var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var fs = require('fs');

router.get('/', function(req, res, next) {
  var tweets = tweetBank.list();
  res.render('index', {title: 'twitter.js', tweets: tweets});
});

router.get('/users/:name', function(req, res, next) {
  var name = req.params.name;
  var tweets = tweetBank.find({name: name});
  res.render('index', {title: 'Twitter.js - Posts by ' + name, tweets: tweets});
});

module.exports = router;