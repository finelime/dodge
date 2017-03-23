var Ball = function(x, y, vx, vy){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	
	this.id = Math.floor(Math.random() * 10000);
	this.birth = Date.now();
}

Ball.prototype.kill = function(){
	return (Date.now() - this.birth > 15000);
}

Ball.prototype.collision = function(){
	var rect = {
		x: me.x,
		y: me.y,
		w: settings.player_size,
		h: settings.player_size
	};
	var circle = {
		x: this.x,
		y: this.y,
		r: settings.ball_size
	};
	if(circleHittingRectangle(circle, rect)){
		return true;
	}
	return false;
}

Ball.prototype.draw = function(){
	this.x += this.vx;
	this.y += this.vy;
	if(!this.kill()){
		drawCircle(this.x, this.y, settings.ball_size, "#DE9400");
		
		if(this.collision()){
			me.kill();
		}
	}else{
		removeBall(this.id);
	}
}