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

// Tree.prototype.findPlaceForNode = function(root , treeH , hCounter){
// 	if(treeH <= hCounter)
// 		return;
// 	else if(!root.getLeftSon() || !root.getRightSon())
// 		return root;
// 	else{
// 		return (
// 		this.findPlaceForNode(root.getLeftSon() , treeH , hCounter + 1)
// 		||
// 		this.findPlaceForNode(root.getRightSon() , treeH , hCounter + 1)
// 		)
// 	}
// }

// /*add node to the tree and away that the tree will be full binary tree*/
// Tree.prototype.addNode = function(node){
// 	var root = this.getRoot();
// 	//the tree is empty
// 	if(!root.getLeftSon() && !root.getRightSon()){
// 		root.setLeftSon(node);
// 		node.setFather(root);
// 		this.increaseTreeHeight();
// 	}
// 	else{
// 		var father = this.findPlaceForNode
// 		(root , this.getTreeHeight() , 0);
// 		if(father){//the tree is not full until this height
// 			if(!father.getLeftSon())
// 				father.setLeftSon(node);
// 			else
// 				father.setRightSon(node);
// 		}
// 		else{//the tree is full in this height
// 			father = this.getLeftLeaf();
// 			this.increaseTreeHeight();
// 			father.setLeftSon(node);
// 		}
// 		node.setFather(father);
// 	}

// }

/*print the tree in post order*/
Tree.prototype.printTree = function(root){
	if(!root)
		return;
	else{
		for(var i = 0 ; i < root.getChildren().length ; i++){
			this.printTree(root.getChildren()[i]);
		}
	    if(root != this.getRoot())
	    	this.printMatrix(root.getVessels());
			// console.log(
			// 	root.getCords()[0] + " " + 
			// 	root.getCords()[1] + " huristic " + 
			// 	root.getHuristicVal() + " father " + root.getFather().getCords()
			// );
		else
			console.log("root");
	}
}

/*
build minimax tree
*/
Tree.prototype.buildMiniMaxTree = function(root , isX , n){
	var vesMatrix;
	
	if(root != this.getRoot()){
		vesMatrix = root.VesselMatrix(root.getVessels());//copying the place of vessels
		var cords = root.getCords();
		root.addVessel(cords[0] , cords[1] , root);//adding the root to the vessel matrix
	}

	if(n <= 0)
		return;

		for(var j = 0 ; j < 3 ; j++){//loops for filling the board
			for(var k = 0 ; k < 3 ; k++){
				if(!root.thereIsVessel(j , k)){
					var child = new Node(isX , j , k , vesMatrix);
					root.addChildren(child);
					child.setFather(root);
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
		if(vessels[2 - i][2 - i].node){
			diag2.push(vessels[i][2 - i].node.isX());
		}
		else{
			diag2 = null;
			break;
		}
	}
	diag1Sign = diag1[0];
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
		console.log(leaf.getHuristicVal());
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

Tree.prototype.intializeMixTree = function(){
	var root = this.getRoot();
	this.buildMiniMaxTree(root , true , 9);
	this.updateLeafVal();
	this.updateTreeVal(root);
	// this.printTree(root);
}

Tree.prototype.printMatrix = function(matrix){
	var output = "";
	matrix.forEach(function(row){
		row.forEach(function(col){
			if(col.node.isX())
				output += "X ";
			else
				output += "O ";
		});
		output += "\n";
	});
	console.log(output);
}