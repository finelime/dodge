var lastBoard = 0;

window.requestAnimationFrame(draw);

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < balls.length; i++){
		balls[i].draw();
	}
	for(var i = 0; i < users.length; i++){
		users[i].draw();
	}
	
	if(me.moving()){
		broadcast(Messages.MOVE, {name: me.name, x: me.x, y: me.y});
	}
	
	var now = Date.now();
	if(now - lastBoard > 1000){
		setLeaderboard();
		lastBoard = now;
	}
	
	window.requestAnimationFrame(draw);
}