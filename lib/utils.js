var reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
					
var cancelAnim = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
					window.msCancelAnimationFrame ;
					
var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

function Point(x,y){
	this.x = x;
	this.y = y;
}

//zooms into or out from point p on canvas
function zoom(ctx, p, factor, direction){
	if(direction == 'in'){
		//can.scale(
	}
	
	else if(direction == 'out'){
	}
	
	else
		return false;
}