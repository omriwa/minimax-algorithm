function Tree(){
	var _root = new Node(null) , _treeHeight = 0;

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
			console.log(root.getCords()[0] + " " + 
			root.getCords()[1] + " huristic " + 
			root.getHuristicVal() + "father " + root.getFather().getCords()[0] +
			" " + root.getFather().getCords()[1]);
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
					let huristicVal;
					if(isX)
						huristicVal = 1;
					else
						huristicVal = -1;

					var child = new Node(isX , j , k , vesMatrix , huristicVal);
					root.addChildren(child);
					child.setFather(root);		
				}
			}
		}

		for(var i = 0 ; i < root.getChildren().length ; i++)
			this.buildMiniMaxTree(root.getChildren()[i] , !isX , n - 1);	

}

Tree.prototype.checkIfWon = function(root){
	var vessels = root.getVessels();
	//check horizental
	for(var i = 0 ; i < 3 ; i++){
		if( vessels[i][0].node && vessels[i][1].node && vessels[i][2].node
			&&
			vessels[i][0].node.isX() == root.isX() 
			&&
			vessels[i][1].node.isX() == root.isX()
			&&
			vessels[i][2].node.isX() == root.isX() 
		  )
			return true;
	}
	//check vertical
	for(var i = 0 ; i < 3 ; i++){
		if( vessels[0][i].node && vessels[1][i].node && vessels[2][i].node
			&&
			vessels[0][i].node.isX() == root.isX() 
			&&
			vessels[1][i].node.isX() == root.isX()
			&&
			vessels[2][i].node.isX() == root.isX() 
		  )
			return true;
	}
	//check doiagonal
	var diag1 = [] , diag2 = [];
	for(var i = 0 , j = 0 ; i < 3 ; i++ , j++){
		if(vessels[i][j].node){
			diag1.push(vessels[i][j].node.isX());
		}
		else{
			diag1 = null;
			break;
		}
		if(vessels[2 - i][2 - j].node){
			diag2.push(vessels[2 - i][2 - j].node.isX());
		}
		else{
			diag2 = null;
			break;
		}
	}
	if(
	   (   diag1 && diag1.length == 3
	   	   &&
		   diag1[0] == root.isX() 
		   &&
		   diag1[1] == root.isX() 
		   &&
		   diag1[2] == root.isX()
	   )
	   ||
	   (
	   	   diag2 && diag2.length == 3
	   	   &&
		   diag2[0] == root.isX() 
		   &&
		   diag2[1] == root.isX() 
		   &&
		   diag2[2] == root.isX()
	   )
	  )
		return true;
	return false;
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

/*check if there is tie*/
Tree.prototype.checkIfTie = function(leaf){
	var count = 0  , row = leaf.getVessels();

	row.forEach(function(col){
		col.forEach(function(vessel){
			if(vessel.vessel)
				count++;
		});
	});
	if(count >= 7)
		return true;
	else
		return false;
}

Tree.prototype.updateHuristicVal = function(){
	var roots = this.getRoot().getChildren();
	var updateTree = function(root){
		if(root.getChildren().length == 0)
			return;
		else{
			let children = root.getChildren() , sum = 0;
			children.forEach(function(child){
				// updateTree(child);
				sum += child.getHuristicVal();
			});
			root.setHuristicVal(sum);
		}
	}

	roots.forEach(function(root){
		updateTree(root);
	});
}