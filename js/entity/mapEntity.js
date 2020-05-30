function mapEntity() {
	this.position = new V2(0,0);
	this.movement = new V2(0,0);
	this.width = 10;
	this.height = 10;
	this.color = 'red';
}

mapEntity.prototype.setScene = function( scene ) {
	this.scene = scene;
}

mapEntity.prototype.draw = function(ctx, viewport) {
	ctx.fillStyle = this.color;
	if( viewport.collision( new Rect( this.position, this.position.sum( new V2( this.width, this.height )))))
		ctx.fillRect(this.position.x-viewport.getX(), this.position.y-viewport.getY(), this.width, this.height);
}

mapEntity.prototype.getCenter = function() {
	return this.position.sum( new V2( this.width/2, this.height/2 ));
}

mapEntity.prototype.getHibox = function() {
	return  new Rect( this.position, this.position.sum( new V2( this.width, this.height )));
}


