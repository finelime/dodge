var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var users = new Array();
var balls = new Array();

var settings = {
	player_size: 30,
	player_speed: 3.3,
	ball_size: 15
};

var Key = {
	UP: "up",
	DOWN: "down",
	LEFT: "left",
	RIGHT: "right"
};

var KeyCodes = {
	38: Key.UP,
	87: Key.UP,
	40: Key.DOWN,
	83: Key.DOWN,
	37: Key.LEFT,
	65: Key.LEFT,
	39: Key.RIGHT,
	68: Key.RIGHT
};

Array.prototype.sortPlayers = function(){
	this.sort(function(a, b){
		if(a.birth < b.birth){
			return -1;
		}else if(a.birth > b.birth){
			return 1;
		}
		return 0;
	});
};

function drawCircle(x, y, radius, color){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
}

function drawRect(x, y, width, height, color){
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
}

function drawText(x, y, text, size, stroke, width, color){
	ctx.font = size + "px profont";
	ctx.textAlign = "center";
	if(width > 0){
		ctx.strokeStyle = stroke;
		ctx.lineWidth = width;
		ctx.strokeText(text, x, y);
	}
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}

function circleHittingRectangle(circle, rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

function randName(){
	return Math.random().toString(36).substr(2, 5);
}

function getPlayer(name){
	for(var i = 0; i < users.length; i++){
		var player = users[i];
		if(player.name == name){
			return player;
		}
	}
}

function removePlayer(player){
	for(var i = 0; i < users.length; i++){
		var p = users[i];
		if(p.name == player.name){
			users.splice(i, 1);
			break;
		}
	}
}

function removeBall(id){
	for(var i = 0; i < balls.length; i++){
		var ball = balls[i];
		if(ball.id == id){
			balls.splice(i, 1);
			break;
		}
	}
}

function setLeaderboard(){
	$("#leaderboard").html("");
	users.sortPlayers();
	for(var i = 0; i < users.length; i++){
		var player = users[i];
		$("#leaderboard").append("<br>" + (player.name == me.name ? "<span class='me'>" : "") + player.name + (player.name == me.name ? "</span>" : "") + " <span class='time'>(" + player.timeAlive() + ")</span>");
	}
}