/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , search = require('./routes/search')
  , cons = require('consolidate')
  , ejs = require('ejs')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.engine('html', cons.ejs);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/search', search.search);
app.get('/transp', search.transparency);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
