var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var fs = require('fs');
var bodyParser = require('body-parser');

module.exports = function(io) {
  //add body parsing for post requests..
  router.use(bodyParser.urlencoded({extended:false}));
  router.use(bodyParser.json());

  router.get('/', function(req, res, next) {
    var tweets = tweetBank.list();
    res.render('index', {title: 'twitter.js', tweets: tweets, showForm:true});
  });

  router.get('/users/:name', function(req, res, next) {
    var name = req.params.name;
    var tweets = tweetBank.find({name: name});
    res.render('index', {title: 'Twitter.js - Posts by ' + name, tweets: tweets, showForm:true, name: name});
  });

  router.get('/users/:name/tweets/:id', function(req, res, next) {
      var name = req.params.name;
      var id = req.params.id;
      var tweet = tweetBank.find({name: name, id: parseInt(id)});
      res.render('index', {title:'Twitter.js - Post by ' + name, tweets: tweet});
  });

  router.post('/submit', function(req, res) {
      var name = req.body.name;
      var text = req.body.text;
      tweetBank.add(name, text);
      var newTweet = tweetBank.find({name: name, text: text})[0];
      io.sockets.emit('new_tweet', newTweet);
      res.redirect("/");
  });
  
  return router;
}