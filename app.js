var express = require("express");
var fs = require('fs');
var tweetBank = require('./tweetBank');
var routes = require('./routes/');
var app = express();
var port = 3000;
var swig = require('swig');
var socketio = require("socket.io");


var server = app.listen(port, function() {
    console.log("server listening on port " + port);
});

var io = socketio.listen(server);

swig.setDefaults({ cache: false }); // for in development

// Registers the given template engine callback as ext.
// By default, Express will require() the engine based on the file extension.
//  For example, if you try to render a “foo.jade” file,
//   Express invokes the following internally,
//   and caches the require() on subsequent calls
//   to increase performance.
app.engine('html', swig.renderFile);
//Sets engine to use html by default
app.set('view engine', 'html');
//sets directory for views
app.set('views', __dirname + '/views');

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use('/', routes(io));

app.use(function(req, res, next) {
  fs.readFile('./public/' + req.url, function(err, data) {
    if (err) next(err);
    res.setHeader('Content-Type', 'text/css');
    res.send(data);
  });
});

app.use(function(err, req, res, next) {
  console.error(err);
});
