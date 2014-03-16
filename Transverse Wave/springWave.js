/****************************
* INITIALIZING VALUES AND VARIABLES
******************************/

//variables for ball object array
var radius = 10;
var size = (can.width/(radius*2)) - 2;
var ballArr = new Array();

//used with html buttons/checkboxes/etc.
var drawLines = true;
var drawBalls = true;
var oscillate = false;
var freq = 0.43;
var rad = 0;

var reqAnimID = null;

//variables for moving a ball with the mouse
var mouseX=0, mouseY=0;
var mouseDown = false;
var ballNum=0;

//taken from "Spring Ball"
var k = 0.066; //spring constant
var b = 0.080; //damping constant

//setup an array of Ball objects, with length of variable "size"
for( var i=1; i <= size; i++)
{
	var temp = new Ball("#ff88aa",radius);
	temp.x = ((temp.radius*2)*i)+radius;
	temp.y = can.height/2;
	ballArr.push(temp);
}

function initialize(){

}

/*****************************
* ANIMATION START/STOP/RESET
******************************/
window.onload = function(){
	initialize();
	startAnimation();
}

function start(){
	
}

function startAnimation(){
	reqAnimID = reqAnimFrame(startAnimation);	
	
	events();
	update();
	paint();
}

function stop(){
	cancelAnim(reqAnimID);
}

function reset(){
	
}


/*******************
* MAIN PAINT FUNCTION
********************/
function paint(){
	ctx.clearRect(0,0, can.width,can.height);
	
	//draws lines in between ball objects
	if(drawLines)
		for(var i=0; i < size - 1; i++)
		{
			ctx.beginPath(); 
			ctx.moveTo(ballArr[i].x, ballArr[i].y); 
			ctx.lineTo(ballArr[i+1].x, ballArr[i+1].y); 
			ctx.stroke();
		}
	
	if(drawBalls)
		for(var i=0; i < size; i++)
			ballArr[i].draw();
}


/**************
* CALCULATIONS
***************/
function update()
{
	if(mouseDown && ballNum >= 0) ballArr[ballNum].y = mouseY; //moves a selected Ball object with the mouse
	applyPhysOnBall(); //applies physics( magic ) to the array of ball objects
	if(oscillate)
		if(rad < 2*Math.PI) rad += freq;
		else rad = 0;
	else
		rad = 0;
		
}
function trackMouse()
{
	//ballNum = -1;
	
	//check for collisions with objects in ballArr
	//if collision is found, return and track mouse
	for(var i=0; i < size; i++)
	{
		if(mouseX > ballArr[i].x - radius && mouseX < ballArr[i].x + radius && mouseY > ballArr[i].y - radius && mouseY < ballArr[i].y + radius)
		{
			ballNum = i;
			return;
		}
	}

}

function applyPhysOnBall()
{
	//This is bit jerry rigged, but it does something, so...
	//these following structures could probably use some cleanup
	for(var i=0; i < size; i++)
	{
		dy = can.height/2 - ballArr[i].y;
		
		ballArr[i].vy *= (k/b);
		ballArr[i].ay = k*dy;
		
		ballArr[i].updatePosition();
	}
	if(oscillate)
	{
		ballArr[ballNum].y = Math.sin(rad)*can.height/2 + can.height/2;
	}
	//applies physics to the left of the selected ball
	for(var i=0; i < ballNum; i++)
	{
		dy = ballArr[i+1].y - ballArr[i].y;
	
		ballArr[i].vy *= (k/b);
		ballArr[i].ay = k*dy;

		ballArr[i].updatePosition();
	}
	//applies physics to the right of the selected ball
	for(var i=ballNum+1; i < size; i++)
	{
		if(i==size-1) dy = ballArr[i-1].y - ballArr[i].y;
		else dy = ballArr[i-1].y - ballArr[i].y;
	
		ballArr[i].vy *= (k/b);
		ballArr[i].ay = k*dy;

		ballArr[i].updatePosition();
	}
	
}

/**************
* EVENTS
***************/

//I stole this from "Spring Ball"
can.addEventListener("mousemove", function(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
});
can.addEventListener("mousedown", function(e){
	//trackMouse();
	mouseDown = true;
	trackMouse(); //find collisions between mouse pointer and a Ball object
	console.log("down");
});
can.addEventListener("mouseup", function(e){
	//trackMouse();
	mouseDown = false;
	console.log("up");
});

//checkboxes and scroll
element('frequency').onChange(function(){
	freq = element('frequency').value/100;
});

element('oscillate').onChange(function(){
	oscillate = element('oscillate').checked;
});

element('drawBalls').onChange(function(){
	drawBalls =  element('drawBalls').checked;

});

element('drawLines').onChange(function(){
	drawLines =  element('drawLines').checked;

});

function events()
{
	
}
