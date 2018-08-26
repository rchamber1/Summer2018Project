
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

/* Web3 and Loom dealio  */

// const Web3 = require('web3');
import Web3 from 'web3';
import {Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js';

const privateKey = CryptoUtils.generatePrivateKey();
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);

// Create the client
const client = new Client(
  'default',
  'ws://70.95.45.125:46657/subsocket',
  "ws://70.95.45.125:9999/queryws",
);

// The address for the caller of the function
const from = LocalAddress.fromPublicKey(publicKey).toString();

// Instantiate Web3 client using LoomProvider
const web3 = new Web3(new LoomProvider(client, privateKey));
console.log("CURRENT PROVIDER");
console.log(web3.currentProvider);

const ABI = require('./public/SimpleStore.json')['abi'];
console.log(ABI);

const contractAddress = '0x1a31b9b9d281d49001fe7f3f638000a739afc9c3';

// Instantiate the contact and let it be ready to use
const contract = new web3.eth.Contract(ABI, contractAddress, {from});
console.log("CONTRACT");
console.log(contract);

const loomContractAddress = client.getContractAddressAsync("SimpleStore")
console.log(loomContractAddress);

const tx = contract.methods.set(47).send();
console.log("TX");
console.log(tx);
const value = contract.methods.get().call();
console.log("VALUE");
console.log(value);

contract.events.NewValueSet({}, (err, event) => {
  if(err) {
    return console.error(err);
  }
  console.log('New value set', event.returnValues._value);
});

/* End of Web3 and Loom stuff */

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Hi, Ryan! Listening on port ' + app.get('port'));
});
