function Controller(){
	var
		_sign , 
		_circleSign = "O",
		_xSign = "X",
		_nodeGuiRoot = this.createDomNode();

	this.getSign = function(){
		return _sign;
	}

	this.getGuiRoot = function(){
		return _nodeGuiRoot;
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

Controller.prototype.addDomNode = function(level){
	var node = this.createDomNode();
	level.append(node);
	return this;
}

Controller.prototype.createDomLevel = function(){
	var level = document.createElement("DIV");
	level.className += "nodelevel";
	$("#treeplace").append(level);
	return level;
}


Controller.prototype.buildMiniMaxDomT = function(root){
	if(root.getChildren().length == 0){
		return;
	}
	else{
		let level = this.createDomLevel();
		root.getChildren().forEach(function(child){
			Controller.prototype.addDomNode(level);
		});

		root.getChildren().forEach(function(child){
			Controller.prototype.buildMiniMaxDomT(child);
		});

	}
}


