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

/*function zoomToPoint(clicks, p){

	factor = Math.pow(scaleFactor,clicks);	
	ctx.translate(p.x, p.y);
	ctx.scale(factor,factor);
	ctx.translate(-p.x,-p.y);	
}*/

var exp = 0.75;
zdir = { 'in':1, 'out': -1}
function zoomToPoint(p, factor, dir){
	
	factor = Math.pow(factor, zdir[dir]*exp);
	ctx.translate(p.x, p.y);
	ctx.scale(factor,factor);
	ctx.translate(-p.x,-p.y);
	paint();	
}
