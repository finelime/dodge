var socket = io();

var me = new Player(randName(), canvas.width / 2, canvas.height / 2, Date.now());
users.push(me);

broadcast(Messages.JOIN, {info: {name: me.name, birth: me.birth}});

socket.on('msg', function(data){
	if(data.type == Messages.PLAYERS){
		var players = data.players;
		for(var i = 0; i < players.length; i++){
			var player = players[i].info;
			if(player.name){
				users.push(new Player(player.name, canvas.width / 2, canvas.height / 2, player.birth));
			}
		}
	}else if(data.type == Messages.JOIN){
		var player = data.player;
		if(player.name != me.name){
			users.push(new Player(player.name, canvas.width / 2, canvas.height / 2, player.birth));
		}
	}else if(data.type == Messages.LEAVE){
		var player = data.player;
		removePlayer(player);
	}else if(data.type == Messages.MOVE){
		var player = getPlayer(data.name);
		player.x = data.x;
		player.y = data.y;
	}else if(data.type == Messages.ADD_BALLS){
		for(var i = 0; i < data.balls.length; i++){
			var b = data.balls[i];
			balls.push(new Ball(b.x, b.y, b.vx, b.vy));
		}
	}else if(data.type == Messages.PLAYER_DIED){
		var player = getPlayer(data.name);
		if(player && player.name != me.name){
			getPlayer(data.name).kill();
		}
	}
});

function broadcast(type, data){
	data["type"] = type;
	socket.emit("msg", data);
}