
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

// TODO: Figure out how to use web3js in 'public/js/custom.js' for async await calls
var web3js;
var privateKey;
var publicKey;

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
  app.locals.web3 = web3js;

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
  // TODO: Get rid of the host here. There should be no commiting of secrets to code,
  //       especially a public repo like this. Needs to be injected through a config file.
  // TODO: INSTANTIATE THE PERSONA CONTRACT
  personaContract.registerContractEvents();
  startApp();
})
