function viewport( subject, width, height, map ) {
	this.subject = subject;
	this.width = width;
	this.height = height;
	this.map = map;
}

viewport.prototype = new Rect( new V2( 0, 0 ), new V2( 0, 0 ));

viewport.prototype.getX = function() { return this.p1.x; }
viewport.prototype.getY = function() { return this.p1.y; }
viewport.prototype.getWidth = function() { return this.width; }
viewport.prototype.getHeight = function() { return this.height; }

viewport.prototype.update = function() {
	this.p1 = new V2( this.width /-2, this.height/-2 );
	this.p1.add( this.subject.position );

	if( this.p1.x < 0 ) this.p1.x = 0;
	if( this.p1.y < 0 ) this.p1.y = 0;

	this.p2 = this.p1.sum( new V2( this.width, this.height ));

	if( this.p2.x > this.map.getWidth()) this.p1.x = ( this.p2.x = this.map.getWidth() ) - this.width;
	if( this.p2.y > this.map.getHeight()) this.p1.y = ( this.p2.y = this.map.getHeight() ) - this.height;
}