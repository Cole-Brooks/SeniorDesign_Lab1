
// Variable for http
var http = require('http');
// Variable for express
var express = require('express');
// Create express object
var app = express();
// Variable for server to allow http requests
var server = http.createServer(app);
// Variable for socket io to transfer data over using socket
var socketIo = require('socket.io')(server);
var bodyParser = require('body-parser');
var path = require("path");
// Variable for server to allow http requests
var server = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Constant for port and IPs
const port = 3000;
const hostname = '127.0.0.1';

// WebSocket setup
const WebSocket = require('ws');
const websocketServer = new WebSocket.Server({ server });

// Add template engine to allow the server to updates pages without requests
app.set('view engine', 'ejs');
// Add static files CSS
app.use(express.static(__dirname + '/public'));
// Create a route to a web page
app.get('/', function(req, res) {
    res.render('index');
});


// Establishing connection with websocket
websocketServer.on('connection',function(ws,req){
      // when server receives messsage from client trigger function with argument message
      ws.on('message',function(message){
      console.log("Connection established");
      console.log("Received: "+message);
      });

      // Close socket when client disconnects
      ws.on('close', function(){
            console.log("lost one client");


});

// Close socket when client disconnects
websocketServer.on('close', function(){
     console.log("lost one client");

});

// Listen to request to the server
server.listen(port, function(socket) {
      console.log('Server listening on port 3000...');
});
