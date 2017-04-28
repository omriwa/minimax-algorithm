function Controller(){
	var
		_sign , 
		_circleSign = "O",
		_xSign = "X",
		_nodeGuiRoot = this.createDomNode(),
		_tree = new Tree(),
		_curNode;

		_tree.intializeMixTree();

	/*getters*/
	this.getTree = function(){
		return _tree;
	}

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

	this.getCurNode = function(){
		return _curNode;
	}

	/*setters*/
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

	this.addVessel = function(sign , x , i){
		_curNode[x][i] = sign;
		return this;
	}

	this.setCurNode = function(node){
		_curNode = node;
		return this;
	}
}

Controller.prototype.updateCurNode = function(node){
	if(!this.getCurNode())//first move
		this.setCurNode(node);
	else
		this.getCurNode().addVessel(node.getCords()[0] , node.getCords()[1] , node);

	node.addVessel(node.getCords()[0] , node.getCords()[1] , node);
	return this;
}

Controller.prototype.putSign = function(cell){
	var node;
	if(cell.textContent != this.getCircle() && cell.textContent != this.getX()){
		if(this.getSign())
			cell.textContent = this.getCircle();
		else
			cell.textContent = this.getX();
		
		node = this.getNode(cell);
		this.updateCurNode(node);
		this.changeSign();
		this.pcMakeMove();
	}
	return this;
}

Controller.prototype.getNode = function(cell){
	var cells = $("th") , x , y , sign , k = 0 , j = 0;

		for(var i = 0;i < cells.length ; i++ , j++){
			if(j > 0  && j % 3 == 0){
				j = 0;
				k++;
			}
			if(cells[i] == cell)
				break;
		}
		if(cell.textContent == this.getCircle())//check for sign
			sign = false;
		else
			sign = true;
		x = k;
		y = j;

		return new Node(sign , x , y);
}

Controller.prototype.changeSign = function(){
	this.setSign(!this.getSign());
	return this;
}

Controller.prototype.pcMakeMove = function(){
	var curMove = this.getCurNode() ,
	nextMove = this.getTree().getMaxMove(curMove.isX() , curMove);
	return nextMove;
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

Controller.startGame = function(){
	var end = false;
}


