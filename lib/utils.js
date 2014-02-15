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



function drawPolygon(poly){
/*
example:
drawPolygon({
	color:'#49eabf', 
	points: [[200,100],[20,10],[80,44],[300,10],[200,100],[20,500]] 
	
});
*/
	if(poly == null){
		poly = {
			color: 'red',
			points: [[5,5],[11,1],[13,23],[2,60]]			
		}
	}
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(poly.points[0][0], poly.points[0][1]);
	for(var i = 0, j = 0; i < poly.points.length; i++){		
		ctx.lineTo(poly.points[i][j],poly.points[i][j+1]);		
	}
	ctx.closePath();
	ctx.fillStyle = poly.color;
	ctx.fill();
	ctx.restore();
}