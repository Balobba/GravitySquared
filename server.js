var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/assets',express.static(__dirname + '/assets'));
app.use('/fonts',express.static(__dirname + '/fonts'));
app.use('/lib',express.static(__dirname + '/lib'));
app.use('/src',express.static(__dirname + '/src'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

var currentPlayers = {};

io.on('connection',function(socket){
    socket.on('newGame',function(){
        currentPlayer();
    });
});
