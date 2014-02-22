/****************************
* INITIALIZING VALUES AND VARIABLES
******************************/
var wt = 0;

var hp = new HyperPixel(3,3,'red');
var wave = new Array();

function initialize(){
	hp.center.x = can.width/2 + vrtclInterval;
	hp.center.y = can.height/3;
	wt = Math.PI/4;
	
	wave.push(new HyperPixel(3,3,'red'));
}

/*****************************
* ANIMATION START/STOP/RESET
******************************/
window.onload = function(){
	initialize();
	startAnimation();
	//paint();
}

var reqAnimID = null;

function start(){
	
}

function startAnimation(){
	reqAnimID = reqAnimFrame(startAnimation);	
	paint();
}

function stop(){
	
}

function reset(){
	
}


/*******************
* MAIN PAINT FUNCTION
********************/
var horizontalGrid = 4;
var verticalGrid = 10;
var hrzInterval = Math.floor(can.height/horizontalGrid); //distance between h lines
var vrtclInterval = can.width/verticalGrid;

function paint(){

	ctx.fillStyle = '#faf9fc';
	ctx.fillRect(0,0,can.width,can.height);
	drawGrid();
	
	//hp.center.x += 200*Math.sin(hp.center.x);
	wt += 0.05;
	hp.center.y = 100*Math.sin(wt) + can.height/2;
	hp.draw();
	
	
}

function drawGrid(){
//draw the grid
	
	ctx.strokeStyle = '#ddd';
	ctx.lineWidth = 0.5;
	
	for(i = 1; i <= verticalGrid; i++){
		if(i == verticalGrid/2)
			continue;
		ctx.beginPath();
		ctx.moveTo(vrtclInterval*i, 0);
		ctx.lineTo(vrtclInterval*i, can.height);
		ctx.stroke();
		ctx.closePath();
		
	}
	
	for(i = 1; i <= horizontalGrid; i++){
		if(i == horizontalGrid/2)
			continue;
		ctx.beginPath();
		ctx.moveTo(0, hrzInterval*i);
		ctx.lineTo(can.width, hrzInterval*i);
		ctx.stroke();
		ctx.closePath();
		
	}	
	
	ctx.strokeStyle='#888';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(can.width/2,0);
	ctx.lineTo(can.width/2,can.height);
	ctx.moveTo(0,can.height/2);
	ctx.lineTo(can.width, can.height/2);
	ctx.stroke();
	ctx.closePath();
}


/**************
* CALCULATIONS
***************/
