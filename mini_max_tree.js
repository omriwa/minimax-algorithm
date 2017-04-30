function Tree(){
	var _root = new Node(true) , _treeHeight = 0;

	//functions

	this.getRoot = function(){
		return _root;
	}

	this.setRoot = function(node){
		_root = node;
		return this;
	}

	this.getTreeHeight = function(){
		return _treeHeight;
	}

	this.increaseTreeHeight = function(){
		_treeHeight++;
		return this;
	}

}

/*get the most left leaf in the tree*/
Tree.prototype.getLeftLeaf = function(){
	var root = this.getRoot();
	while(root.getLeftSon()){
		root = root.getLeftSon();
	}
	return root;
}

/*print the tree in post order*/
Tree.prototype.printTree = function(root){
	if(!root)
		return;
	else{
		for(var i = 0 ; i < root.getChildren().length ; i++){
			this.printTree(root.getChildren()[i]);
		}
	    if(root != this.getRoot()){
			console.log(
				root.getCords()[0] + " " + 
				root.getCords()[1] + " huristic " + 
				root.getHuristicVal() + " father " + root.getFather().getCords()
				 + " huristic " + root.getFather().getHuristicVal()
			);
		}
		else
			console.log("root");
	}
}

/*
build minimax tree
*/
Tree.prototype.buildMiniMaxTree = function(root , isX , n){
	var vesMatrix = root.getVessels();
	
	

	if(n <= 0)
		return;

		for(var j = 0 ; j < 3 ; j++){//loops for filling the board
			for(var k = 0 ; k < 3 ; k++){
				if(!root.thereIsVessel(j , k)){
					var child = new Node(isX , j , k , vesMatrix);
					root.addChildren(child);
					child.setFather(root);
					child.addVessel(j , k , child);//adding the root to the vessel matrix
					child.setHuristicVal(this.checkIfWon(child));
					if(child.getHuristicVal() == 0)//if its not a winning move
						this.buildMiniMaxTree(child , !isX , n - 1);	
				}
			}
		}		

}
/*check if player won ,sign = true is X player else O player , checking by vertical, horizental and diagonal*/
Tree.prototype.checkIfWon = function(root){
	var vessels = root.getVessels() ,
		diag1Sign , diag2Sign , 
		diagWon = false , output = 0;
		this.printMatrix(vessels);
	//check horizental
	var sign , won = false;
	for(var i = 0 ; i < 3 ; i++){
		sign = vessels[i][0];
		if( vessels[i][0].node && vessels[i][1].node && vessels[i][2].node
			&&
			vessels[i][0].node.isX() == sign 
			&&
			vessels[i][1].node.isX() == sign
			&&
			vessels[i][2].node.isX() == sign
		  )
			won = true;
	}
	//check vertical
	for(var i = 0 ; i < 3 ; i++){
		sign = vessels[0][i];
		if( vessels[0][i].node && vessels[1][i].node && vessels[2][i].node
			&&
			vessels[0][i].node.isX() == sign 
			&&
			vessels[1][i].node.isX() == sign
			&&
			vessels[2][i].node.isX() == sign 
		  )
			won = true;
	}
	//check doiagonal
	var diag1 = [] , diag2 = [];
	for(var i = 0 ; i < 3 ; i++){
		if(vessels[i][i].node){
			diag1.push(vessels[i][i].node.isX());
		}
		else{
			diag1 = null;
			break;
		}
	}

	for(var i = 0 ; i < 3 ; i++){
		if(vessels[i][2 - i].node){
			diag2.push(vessels[i][2 - i].node.isX());
		}
		else{
			diag2 = null;
			break;
		}
	}
	
	if(diag1)
		diag1Sign = diag1[0];
	if(diag2)
		diag2Sign = diag2[0];

	if(
	 	   diag1 && diag1.length == 3
	   	   &&
		   diag1[0] == diag1Sign 
		   &&
		   diag1[1] == diag1Sign 
		   &&
		   diag1[2] == diag1Sign
	   )
	{	
		diagWon = true;
	}

	if(
	   	   diag2 && diag2.length == 3
	   	   &&
		   diag2[0] == diag2Sign 
		   &&
		   diag2[1] == diag2Sign 
		   &&
		   diag2[2] == diag2Sign
	   )
	{
		diagWon = true;
	}

	if(won || diagWon){
		
		if(diagWon){
			if(diag1Sign || diag2Sign)
				output = 1;
			else
				output = -1;
		}
		else{
			if(sign)
				output = 1;
			else
				output = -1;
		}
	}
	console.log(output);
	return output;
}

/*get all the leaf in the tree*/
Tree.prototype.getAllLeafs = function(){
	var leafs = [];
	(function getTreeLeafs(root , leafs){
		if(root.getChildren().length == 0)//is leaf
			return leafs.push(root);
		
		else//go down to the leafs
			for(var i = 0 ; i < root.getChildren().length ; i++){
				getTreeLeafs(root.getChildren()[i] , leafs);
			}
	})(this.getRoot() , leafs);
	return leafs
}

/*update huristic vals of the tree's leafs*/
Tree.prototype.updateLeafVal = function(){
	var leafs = this.getAllLeafs();

	leafs.forEach(function(leaf){
		leaf.setHuristicVal(Tree.prototype.checkIfWon(leaf));
	});
	
	return this;
}
/*update huristic val of all tree nodes*/
Tree.prototype.updateTreeVal = function(root){
	if(root.getChildren().length == 0)
		return;
	else{
		root.getChildren().forEach(function(child){
			Tree.prototype.updateTreeVal(child);
			child.getFather().addToHuristic(child.getHuristicVal());
		});
	}
}
/*build the minimax tree, intialize huristic vals*/
Tree.prototype.intializeMixTree = function(){
	var root = this.getRoot();
	this.buildMiniMaxTree(root , true , 7);
	// this.updateLeafVal();
	// this.updateTreeVal(root);
	// console.log("print tree \n");
	// this.printTree(root);
}
/*print the vessels matrix as the board of tic tac toe*/
Tree.prototype.printMatrix = function(matrix){
	var output = "";
	matrix.forEach(function(row){
		row.forEach(function(col){
			if(col.node){//vessel exists
				if(col.node.isX())
					output += "X ";
				else
					output += "O ";
			}
			else
				output += "E ";
		});
		output += "\n";
	});
	console.log(output);
}
/**/
Tree.prototype.getMaxMove = function(sign , curMove){
	var root = this.getRoot(),
		findCurMove = function(r , cur){
						if(r.getChildren().length == 0)
							return;
						else if(Tree.prototype.isEqualMove(r , cur))
							return r;
						else
							r.getChildren().forEach(function(child){
								findCurMove(child , cur);
							});

					  }
	this.printMatrix(curMove.getVessels());
	var curInTree = findCurMove(root , curMove);
	this.printMatrix(curInTree.getVessels());
	curInTree.getChildren().forEach(function(child){
		if(sign && child.getHuristicVal() == 1)//X player
			return child;
		else if(!sign && child.getHuristicVal() == -1)//y Player
			return child;
	});
	curInTree.getChildren().forEach(function(child){//if there is no wining move
		if(child.getHuristicVal() == 0)
			return child;
	});




}
/*check if to moves are equal by the vessels*/
Tree.prototype.isEqualMove = function(m1 , m2){
	for(var i = 0 ; i < m1.getVessels().length ; i++)
		for(var j = 0 ; j < m1.getVessels().length ; j++){
			if(!m1.getVessels()[i][j].node && m2.getVessels()[i][j].node)//if the curboard has vessels that the search board doesnt have 
				return false;

			else if(m1.getVessels()[i][j].node && m2.getVessels()[i][j].node)
					if(!(m1.getVessels()[i][j].node.isX() && m2.getVessels()[i][j].node.isX()))
						return false;
			else
				continue;
		}
	return true;
}
