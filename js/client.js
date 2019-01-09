
var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
  Client.socket.emit('click',{x:x,y:y});
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
        Game.movePlayer(data.id,data.x,data.y);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
             
            var pseudo = prompt('Quel est votre pseudo ?');
            Client.socket.emit('nouveau_client', pseudo);
            document.title = pseudo + ' - ' + document.title;

           
            Client.socket.on('message', function(data) {
                insereMessage(data.pseudo, data.message)
            })

            
            Client.socket.on('nouveau_client', function(pseudo) {
                $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
            })

            
            $('#formulaire_chat').submit(function () {
                var message = $('#message').val();
                Client.socket.emit('message', message); 
                insereMessage(pseudo, message); 
                $('#message').val('').focus(); 
                return false; 
            });
            
            
            function insereMessage(pseudo, message) {
                $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
            }
});


