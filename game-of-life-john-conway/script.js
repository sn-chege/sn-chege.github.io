function make2DArray(cols, rows){
	let arr = new Array(cols);
	for(i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}


let grid;
let cols;
let rows;
let resolution = 40;


function setup(){
	createCanvas(600,600);
	cols= width/40;
	rows= height/40;

	grid = make2DArray(rows,cols);

	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			grid[i][j] = floor(random(2));
		}	
	}
	//console.table(grid);

}

function draw(){
	
	background(0);

	//Compute Next Based on grid
	let next = make2DArray(cols,rows);
	
	
	for(let i = 0; i < cols; i++){
		
		for(let j = 0; j < rows; j++){
						let state = grid[i][j];

			if( i == 0 || i == cols - 1 || j ==0 || j == rows -1){
				//Handle Edged Neighbours
				next[i][j]=state;
			}else{
				//Count Live Neighbours
				let sum = 0;
				let neighbours = countNeighbors(grid,i,j);

				if(state==0 && neighbours ==3){
					next[i][j]=1;
				}else if(state==1 && (neighbours < 2 || neighbours > 3)){
					next[i][j]=0
				}else{
					next[i][j] = state;
				}
			}			
		}	
	}

	grid = next;


	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			let x = i * resolution;
			let y = j * resolution;
			if(grid[i][j] == 1){
				fill(255);
				rect( x, y ,resolution ,resolution );
			}
		}	
	}
}


function countNeighbors(grid, x,y){
	let sum = 0;
	for(let i = -1; i<2; i++){
		for( let j = -1; j < 2; j++){
			sum+=grid[x+i][y+j];
		}
	}
	sum -=grid[x][y];
	return sum;
}







// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   if (mouseIsPressed) {
//     fill(0);
//   } else {
//     fill(255);
//   }
//   ellipse(mouseX, mouseY, 80, 80);
// }


