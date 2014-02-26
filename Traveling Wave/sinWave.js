/****************************
* INITIALIZING VALUES AND VARIABLES
******************************/
var wt = 0;
var dwt = 0.05;
var numPoints = 900;
var amplitude = 100;

var wavePoints = new Array();
var pointsToDraw = new Array();

var pixWidth = 3;

element('addPoint').addEventListener('click',function (){
	//choose a random index from wave points 
	var index = Math.round(wavePoints.length*Math.random());
	//add it to points to draw
	pointsToDraw.push(wavePoints[index]);
	//remove it from wave points
	wavePoints.splice(index,1);
});

element('paintAll').addEventListener('click',function(){
	for(var i = 0; i < wavePoints.length ; i++){
		pointsToDraw.push(wavePoints[i]);
	}
	element('addPoint').disabled = true;
	element('paintAll').disabled = true;
});

element('amplitude').addEventListener('change',function(){
	amplitude = element('amplitude').value;
});

element('speed').addEventListener('change',function(){
	dwt = element('speed').value/500;
});

element('resetBtn').addEventListener('click',reset);


function initialize(){
	var pointInterval = can.width/numPoints;
	
	wt = Math.PI/4;
	dwt = element('speed').value/500;
	for(var i = xPos = phase = 0; i < numPoints; i++){
		wavePoints.push({
			'point': new HyperPixel(pixWidth, pixWidth, 'red', xPos, can.height/2),
			'phase' : phase
		});		
		xPos += pointInterval;
		phase += 4*Math.PI/(can.width);
	}
	
	amplitude = element('amplitude').value;
	
}

/*****************************
* ANIMATION START/STOP/RESET
******************************/
window.onload = function(){
	
	initialize();
	startAnimation();
	//paint();
	
	/*var bgImg = can.toDataURL();
	
	element('bg').src = bgImg;*/
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
	location.reload();
}




/*******************
* MAIN PAINT FUNCTION
********************/
var horizontalGrid = 10;
var verticalGrid = 10;
var hrzInterval = Math.floor(can.height/horizontalGrid); //distance between h lines
var vrtclInterval = can.width/verticalGrid;
var i = 0;

var bgImg = element('bgImg');
function paint(){

	/* ctx.fillStyle = '#faf9fc';
	ctx.fillRect(0,0,can.width,can.height);
	drawGrid(); */
	ctx.drawImage(bgImg,0,0,can.width,can.height);
	
	if(pointsToDraw.length > 0){
		wt += dwt;
		/*wavePoints.forEach(function(w){
			w.point.center.y = amplitude*Math.sin(wt + w.phase) + can.height/2;
			w.point.draw();
		});*/
		pointsToDraw.forEach(function(w){
			w.point.center.y = amplitude*Math.sin(wt + w.phase) + can.height/2;
			w.point.draw();
		});
	}
	
	//element('phaseLabel').innerHTML = wt;
	
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
