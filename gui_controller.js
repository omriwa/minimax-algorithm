function Controller(){
	var
		_sign , 
		_circleSign = "O",
		_xSign = "X";

	this.getSign = function(){
		return _sign;
	}

	this.getCircle = function(){
		return _circleSign;
	}

	this.getX = function(){
		return _xSign;
	}

	this.setSign = function(sign){
		_sign = sign;
		return this;
	}

	this.setX = function(sign){
		_xSign = sign;
		return this;
	}

	this.setCircle = function(sign){
		_circleSign = sign;
		return this;
	}
}

Controller.prototype.putSign = function(cell){
	if(cell.textContent != this.getCircle() && cell.textContent != this.getX()){
		if(this.getSign())
			cell.textContent = this.getCircle();
		else
			cell.textContent = this.getX();
		this.changeSign();
		this.pcMakeMove();
	}
	return this;
}

Controller.prototype.changeSign = function(){
	this.setSign(!this.getSign());
	return this;
}

Controller.prototype.pcMakeMove = function(){
	var cell , cellNum = corX +  (corY * 3);
	cell = $("th")[cellNum];
	this.putSign(cell);
}

Controller.prototype.isGameEnd = function(){
	$("th").each(function(cell){
		if(cell.textContent != 'O' && cell.textContent == 'X')
			return false;
	});
	return true;
}

Controller.prototype.createDomNode = function(){
	var node = document.createElement("DIV");
	node.className += "node";
	return node;
}