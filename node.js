//node constructor
function Node(sign , x , y , vessels , val){
	var
		_sign = sign,
		_father,
		_lSon,
		_rSon,
		_corX = x,
		_corY = y,
		_children = [],
		_vessels = this.getMatrixVessel(vessels),
		_huristic = val;

		//geters

		//get sign if true is x else o
		this.isX = function(){
			return _sign;
		}
		//get father
		this.getFather = function(){
			return _father;
		}
		//get left son
		this.getLeftSon = function(){
			return _lSon;
		}
		//get right son
		this.getRightSon = function(){
			return _rSon;
		}

		//get the children
		this.getChildren = function(){
			return _children;
		}

		this.getCords = function(){
			return [_corX , _corY];
		}

		this.getVessels = function(){
			return _vessels;
		}

		//check if there is vessel in the cell
		this.thereIsVessel = function(corX , corY){
			return _vessels[corX][corY].vessel;
		}

		this.getHuristicVal = function(){
			return _huristic;
		}

		//setters

		this.setSign = function(sign){
			_sign = sign;
		}

		//set father
		this.setFather = function(node){
			_father = node;
			return this;
		}
		//set left son
		this.setLeftSon = function(node){
			_lSon = node;
			return this;
		}
		//set right son
		this.setRightSon = function(node){
			_rSon = node;
			return this;
		}
		//add children
		this.addChildren = function(newNode){
			_children.push(newNode);
			return this;
		}

		//add vessel
		this.addVessel = function(corX , corY , newNode){
			_vessels[corX][corY].vessel = true;
			_vessels[corX][corY].node = newNode;
			return this;
		}

		this.setHuristicVal = function(val){
			_huristic = val;
		}
		
}

Node.prototype.getMatrixVessel = function(vessels){
	var matrix = [];
		for(var i = 0 ; i < 3 ; i++){
			matrix[i] = [];
			for(var j = 0 ; j < 3 ; j++){
				if(!vessels)
					matrix[i].push({vessel : false});
				else
					matrix[i].push(vessels[i][j]);
			}
		}
	return matrix;
}

// this.prototype.checkIfWon = function(){
// 	var matrixLength = this.getVessels().length ,
// 	 	matrix = this.getVessels();

// 	for(var i = 0 ; i < matrixLength ; i++)
// 		for(var j = 0 ; j < matrixLength ; j++){
// 			if(matrix.)
// 			for(var k = 0 ; k < matrixLength ; k++){

// 			}
// 		}
// }


