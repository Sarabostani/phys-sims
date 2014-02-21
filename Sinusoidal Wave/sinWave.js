/****************************
* INITIALIZING VALUES AND VARIABLES
******************************/

function initialize(){
	
}

/*****************************
* ANIMATION START/STOP/RESET
******************************/
window.onload = function(){
	initialize();
	paint();
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

function paint(){
	ctx.fillStyle = '#aeb';
	ctx.fillRect(0,0,can.width,can.height);
}


/**************
* CALCULATIONS
***************/
