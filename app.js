import PersonaContract from './public/json/PersonaContract.json'

/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var personaContract;

/* Web3 and Loom dealio  */

function startApp() {
  var index = require('./routes/index');
  // Example route
  // var user = require('./routes/user');

  var app = express();

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.engine('handlebars', handlebars());
  app.set('view engine', 'handlebars');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('IxD secret key'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  app.get('/', index.view);
  // Example route
  // app.get('/users', user.list);

  startServer();
}

function startServer() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Hi, User! Listening on port ' + app.get('port'));
  });
}

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.log('Cannot use current web3 provider. Initializing Loom Provider...');
  }

  personaConstract = new PersonaContract();
  await personaContract.initialize();
  personaContract.registerContractEvents();
  startApp();
})
