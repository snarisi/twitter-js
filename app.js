var express = require("express");
var app = express();
var port = 3000;
var swig = require('swig');

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
    console.log("response obj: ", res);
    console.log(req.method, req.url);
    next();
});

var people = [{name:"Full"},{name:"Stacker"},{name:"Son"}];

app.get('/', function(req, res, next) {
    res.render("index", {title:"Hall of Fame", people : people});
});


app.listen(port, function() {
    console.log("server listening on port " + port);
});
