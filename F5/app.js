'use strict';

const express = require('express');

const app = express();
const{Server} = require('socket.io');

app.use('/silverfisk', express.static(__dirname + '/clientscripts'));

const httpServer = app.listen(3000, function(){
    console.log("Servern kör på port 3000");
});

const io = new Server(httpServer);

app.get('/', function(request, response){

    response.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', function(request, response){
    response.sendFile(__dirname + '/favicon.ico');
});

io.on('connection', function(socket){

    console.log("En klient har anslutits via socket");

    socket.on('silver', function(data){
        //console.log("Tjo!");

        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random()* 255);
        let b = Math.floor(Math.random() * 255);

        io.emit('color', { 'red': r, 'green': g, 'blue': b});
        
    });

});