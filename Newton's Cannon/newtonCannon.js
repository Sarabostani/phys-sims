
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

var earthImg = document.getElementById("earth");
var mountain = document.getElementById("mountain");

//var label = document.getElementById("alpha");

var trace = new Array();

var animating = false;
var reqAnimID = null;

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


document.getElementById('zoomin').addEventListener('click',zoomIn);
document.getElementById('zoomout').addEventListener('click',zoomOut);
var speed = document.getElementById('speed');
speed.addEventListener('change',adjustSpeed);
var speedLabel = document.getElementById('speedLabel');

document.getElementById('start').addEventListener('click',start);
document.getElementById('stop').addEventListener('click',stopAnimation);
document.getElementById('reset').addEventListener('click',reset);


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
	ball.vx = document.getElementById("speed").value/50;
	speedLabel.innerHTML = 'Speed = ' + speed.value + ' m/s';
}


/*******************
* MAIN PAINT FUNCTION
********************/
function paint(){
	var grad = ctx.createLinearGradient(can.width/2, 0, can.width/2, can.height);
	// light blue
	grad.addColorStop(0, '#ceedff');
	// dark blue
	grad.addColorStop(1, '#fff');
	ctx.fillStyle = '#ceedff';
	ctx.fillStyle = grad;
	ctx.fillRect(0,0,can.width, can.height);
	
	//ctx.clearRect(0,0,can.width,can.height);
	//drawing the earth. Images are drawn from upper left corner
	
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
* HANDLING ZOOM
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