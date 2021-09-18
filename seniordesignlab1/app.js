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
// Button for testing purposes
var buttonValue = 0;
// To use for serial port
var SerialPort = require('serialport');

// Your serial port from arduino
const arduinoport = '/dev/cu/usbmodem14601'
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({delimiter: '\r\n'});

// Constant for port and IPs
const port = 3000;
const hostname = '127.0.0.1';

var serialport = new SerialPort(arduinoport,{
       baudRates: 9600,
       detaBits: 8,
       parity: 'none',
       stopBites: 1,
       flowControl: false});


serialport.pipe(parser)

// testing with variables
var title = "Some buttons"
var buttons = ['pushbutton','screenbutton'];

// Add template engine to allow the server to updates pages without requests
app.set('view engine', 'ejs');
// Add static files CSS
app.use(express.static(__dirname + '/public'));
// Create a route to a web page
app.get('/', function(req, res) {
    res.render('index');
});



// Using serial port to transfer data
serialport.on('open',function(){
      console.log('Serial port opened');
});

// Establish connection using Socket io
socketIo.on('connection', function(socket){
        console.log('Connection using socket io established...');

        // Using serial port
        serialport.on('data', function(data){
            data = data.trim();
            // Broadcast data to the front end using socket io
            socket.emit('data', data);
        });

        // broadcast data to the client
        //socketIo.emit('Data Value', buttonValue);
        // Listen for data from the client
        //socket.on('Data Value', function(msg){
        //buttonValue = 1 -buttonValue;
       // socketIo.emit('Data Value', buttonValue);
       // console.log('Data Received from client', msg);
        //});
        socket.on('disconnect', function() {
        console.log('Server has disconnected...');
        });
});
// Listen to request to the server
server.listen(port, function(socket) {
      console.log('Server listening on port 3000...');
});

