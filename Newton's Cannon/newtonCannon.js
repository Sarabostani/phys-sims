
/****************************
* INITIALIZING VALUES AND VARIABLES
******************************/

var earth = {
	radius : 200,
	center : new Point(450,250),
	draw : function(){
			var x = this.center.x;
			var y = this.center.y;
			ctx.save();
			/*var grad = ctx.createRadialGradient(x, y, this.radius/5,x, y, this.radius*2);
			// light green
			grad.addColorStop(0, '#7eb551');
			// dark green
			grad.addColorStop(1, '#61aa3a');			
			ctx.fillStyle = grad;*/
			ctx.fillStyle = '#55c153';
			ctx.beginPath();
			ctx.arc(this.center.x,this.center.y,this.radius, 0 , 2*Math.PI);
			ctx.fill();
			
			ctx.restore();	
			
		}
};

var ball = new Ball('black', 2);
var angle = 0;

var earthImg = element("earth");
var mountain = element("mountain");
var trace = new Array();

var animating = false;
var reqAnimID = null;

can.style.background = 'linear-gradient( 0deg, white, #c9ebff )';

function initValues(){

	ball.x = earth.center.x; 
	ball.y = earth.center.y - earth.radius - ball.radius - 16;

	ball.vx = 2.6;	
	ball.vy = 0;
	ball.ax = 0;
	ball.ay = 0;
	//ball.radius = 2;
	trace = new Array();
	animating = false;
	adjustBallAcceleration();
	reqAnimID = null;
}


element('zoomin').addEventListener('click',zoomIn);
element('zoomout').addEventListener('click',zoomOut);
var speed = element('speed');
speed.addEventListener('change',adjustSpeed);
var speedLabel = element('speedLabel');

element('start').addEventListener('click',start);
element('stop').addEventListener('click',stopAnimation);
element('reset').addEventListener('click',reset);

var mouseDown = false;
/* can.addEventListener("mousedown",function(){mouseDown = true;});
can.addEventListener("mouseup",function(){mouseDown = false;});
can.addEventListener("mousemove", moveCanvas); */


/*****************************
* ANIMATION START/STOP/RESET
******************************/
var collision = false;

window.onload = function(){
	initValues();
	adjustSpeed();
	paint();
	//console.log(distance(ball.center,earth.center));
};


function start(){
	if(!animating && !collision){
		animating = true;
		speed.disabled = true;
		collision = false;
		startAnimation();
	}
	else{
		reset();		
		animating = true;
		speed.disabled = true;
		collision = false;
		startAnimation();
	}
		
}
function startAnimation(){
	reqAnimID = reqAnimFrame(startAnimation);	
	paint();
}

function stopAnimation(){
	if(animating){
		cancelAnim(reqAnimID);
		animating = false;
		console.log('stopped , #of points = ' + trace.length);
	}
	
}

function reset(){
	stopAnimation();
	initValues();
	speed.disabled = false;
	collision = false;
	adjustSpeed();
	paint();
}

function adjustSpeed(){
	ball.vx = element("speed").value/50;
	speedLabel.innerHTML = 'Speed = ' + speed.value + ' m/s';
}


/*******************
* MAIN PAINT FUNCTION
********************/
function paint(){
	ctx.clearRect(0,0, can.width,can.height);
	ctx.drawImage(mountain, can.width/2 - mountain.width + 5, earth.center.y - earth.radius - 16,20,20);
	
	trace.forEach(function(pt){
		ctx.save();
		ctx.fillStyle = 'red';
		ctx.fillRect(pt.x,pt.y,1,1);
		ctx.restore();
	});
	
	if(zoomLimit < 7)
		ctx.drawImage(earthImg,earth.center.x - earth.radius,earth.center.y - earth.radius, earth.radius*2, earth.radius*2);
	else
		earth.draw();
	
	ball.draw();
	
	if(animating){
		adjustBallAcceleration();		
		ball.updatePosition();	
		trace.push(new Point(ball.x,ball.y));
	}
	
	
	if((distance(ball.center,earth.center) < earth.radius || ball.outOfCanvas() ) && animating == true){
		stopAnimation();
		collision = true;
		speed.disabled = false;
	}
}

/********************
* ZOOM AND TRANSLATE
*********************/
var zoomPoint = new Point(earth.center.x, earth.center.y - earth.radius - 4);
var scaleFactor = 1.6;
var zoomLimit = 1;

function zoomIn(){
	if(zoomLimit < 13){		
		++zoomLimit;
		zoomToPoint(zoomPoint,scaleFactor,'in');
		ball.radius -= scaleFactor / 12;
		
		//console.log(zoomLimit);
	}
}
function zoomOut(){
	if(zoomLimit > 1){
		--zoomLimit;
		zoomToPoint(zoomPoint,scaleFactor,'out');
		
		ball.radius += scaleFactor / 12;
		//console.log(zoomLimit);
		
	}
}

function moveCanvas(event){
	if(mouseDown && zoomLimit > 2){
		element('leftControls').children[2].innerHTML = event.clientX;
		ctx.translate(event.clientX - can.width/2, event.clientY - can.height/2);
		paint();
		ctx.translate(-(event.clientX - can.width/2), -(event.clientY - can.height/2));
	}
}

/**************
* CALCULATIONS
***************/
// F = GmM/r^2
var GM = 0.02;
var D = 0;
function adjustBallAcceleration(){
	D = distance(earth.center,ball.center);
	// ax = cos(alpha)*a; ay = sin(alpha)*a;
	ball.ax = (earth.center.x - ball.center.x)/D*GM;
	ball.ay = (earth.center.y - ball.center.y)/D*GM;
	//acceleration = acceleration/(D*D);
}






/********
* Mouse scroll not used
*********/
/*
lowZoom = 0;
highZoom = 30;
var delta = 1.0;
function handleScroll(evt){

	delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
	
	if(delta < 0 && zoomLimit > lowZoom)
		--zoomLimit;
	else if(delta > 0 && zoomLimit < highZoom)
		++zoomLimit;
	
	if( zoomLimit > lowZoom && zoomLimit < highZoom){
		if (delta) zoomToPoint(delta, point);
		paint();
	}
}*/