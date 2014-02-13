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

var exp = 0.75;
zdir = { 'in':1, 'out': -1}
function zoomToPoint(p, factor, dir){
	
	factor = Math.pow(factor, zdir[dir]*exp);
	ctx.translate(p.x, p.y);
	ctx.scale(factor,factor);
	ctx.translate(-p.x,-p.y);
	paint();	
	
}

function distance(p1,p2){
	// d = sqrt( (x2-x1)^2 + (y2-y1)^2 )
	return Math.sqrt(Math.pow(p2.x-p1.x,2) + Math.pow(p2.y-p1.y,2));
}

//since y axis is pointing down, alpha changes clockwise
function angleBetween(p1, p2){
	//return Math.asin( (p1.y - p2.y )/distance(p1,p2) ) / Math.acos( (p1.x - p2.x) /distance(p1,p2) );
	return Math.atan2( Math.abs(p1.y - p2.y ), Math.abs(p1.x - p2.x) );
}

/* x1 = 200; y1 = 10; x2 = 100; y2 = 100;
Math.atan( (y2 - y1) , (x2 - x1) )*180/Math.PI; */