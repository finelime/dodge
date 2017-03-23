document.onkeydown = function(event) {
	if(!event){
		event = window.event;
	}
	var code = event.keyCode;
	if(event.charCode && code == 0){
		code = event.charCode;
	}

	//console.log(code);
	
	var key = KeyCodes[code];
	if(key){
		me.addKey(key);
	}
}

document.onkeyup = function(event) {
	if(!event){
		event = window.event;
	}
	var code = event.keyCode;
	if(event.charCode && code == 0){
		code = event.charCode;
	}
	
	var key = KeyCodes[code];
	if(key){
		me.removeKey(key);
	}
}