var Player = function(name, x, y, birth){
	this.name = name;
	this.x = x;
	this.y = y;
	this.birth = birth;
	
	this.keys = new Array();
}

Player.prototype.draw = function(){
	if(this.pressing(Key.UP)){
		this.y -= settings.player_speed;
	}
	if(this.pressing(Key.DOWN)){
		this.y += settings.player_speed;
	}
	if(this.pressing(Key.LEFT)){
		this.x -= settings.player_speed;
	}
	if(this.pressing(Key.RIGHT)){
		this.x += settings.player_speed;
	}
	
	drawRect(this.x, this.y, settings.player_size, settings.player_size, "#fff");
	drawText(this.x + (settings.player_size / 2), this.y + (settings.player_size + 13), this.name, 13, "#000", 4, "#fff");
}

Player.prototype.addKey = function(key){
	if(!this.pressing(key)){
		this.keys.push(key);
	}
}

Player.prototype.removeKey = function(key){
	if(this.pressing(key)){
		this.keys.splice(this.keys.indexOf(key), 1);
	}
}

Player.prototype.pressing = function(key){
	if(this.keys.includes(key)){
		return true;
	}
	return false;
}

Player.prototype.moving = function(){
	return this.keys.length > 0;
}

Player.prototype.timeAlive = function(){
	var ms = Date.now() - this.birth;
	
	var mins = Math.floor(ms / 60000);
	var secs = ((ms % 60000) / 1000).toFixed(0);
	
	return (mins > 0 ? mins + "m " + secs + "s" : secs + "s");
}

Player.prototype.kill = function(){
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.birth = Date.now();
	
	if(this.name == me.name){
		broadcast(Messages.PLAYER_DIED, {name: this.name, birth: this.birth});
	}
	
	setLeaderboard();
}