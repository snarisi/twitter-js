var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var fs = require('fs');

router.get('/', function(req, res, next) {
  var tweets = tweetBank.list();
  res.render('index', {title: 'twitter.js', tweets: tweets});
});

module.exports = router;