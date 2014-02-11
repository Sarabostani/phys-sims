function Ball(color,radius){
	this.color = color;
	this.radius = radius;
	this.x = radius;
	this.y = radius;
	this.vx = 0.0 , this.vy = 0.0;
	this.ax = 0.0 , this.ay = 0.0;
	this.rect = {
		'x':this.x - this.radius,
		'y':this.y - this.radius,
		'width':this.radius*2
		};
	
	Ball.prototype.draw = function(){
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.fill();
		ctx.restore();
	}
	
	Ball.prototype.updatePosition = function(){
		this.x += this.vx , this.y += this.vy,
		this.vx += this.ax, this.vy += this.ay;
		
		this.rect.x = this.x - this.radius,
		this.rect.y = this.y - this.radius,
		this.rect.width = this.radius*2;
	}
	
	Ball.prototype.mOver = function(x,y){
		return (x > this.rect.x && x < this.rect.x + this.rect.width && 
				y > this.rect.y && y < this.rect.y + this.rect.width);
	}
}