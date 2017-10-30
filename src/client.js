var Client = {};
Client.socket = io.connect();

Client.newGame = function(){
    Client.socket.emit('newplayer');
};

Client.socket.on('getPlayers',function(data){
    console.log("All players", data);
});
