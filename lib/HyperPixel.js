var HyperPixel = function HyperPixel(width, height, color, x, y){
	//public properties
	this.width = width;
	this.height = height;	
	this.center = new Point(x,y);
	this.color = color;
	
	
	//public methods
	this.draw = function(){
		ctx.save();
		ctx.fillStyle = color;
		ctx.fillRect(this.center.x - this.width/2,
					this.center.y - this.height/2,
					this.width,this.height);
		ctx.restore();
	};
}