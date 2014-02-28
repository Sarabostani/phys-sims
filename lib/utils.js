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

/**********
* DOM UTILS
***********/

function element(id){
	return document.getElementById(id);
}

Element.prototype.html = function(text){
	this.innerHTML = text;
}
//Add event methods to DOM Elements
Element.prototype.onClick = function(funcPtr){
	this.addEventListener('click',funcPtr,false);
}
Element.prototype.onMouseDown = function(funcPtr){
	this.addEventListener('mousedown',funcPtr,false);
}
Element.prototype.onMouseUp = function(funcPtr){
	this.addEventListener('mouseup',funcPtr,false);
}
Element.prototype.onMouseMove = function(funcPtr){
	this.addEventListener('mousemove',funcPtr,false);
}
Element.prototype.onMouseOver = function(funcPtr){
	this.addEventListener('mouseOver',funcPtr,false);
}
Element.prototype.onMouseOut = function(funcPtr){
	this.addEventListener('mouseout',funcPtr,false);
}
Element.prototype.onChange = function(funcPtr){
	this.addEventListener('change',funcPtr,false);
}