function button( img, hover, x, y, callback ) {
	this.area = new Rect( new V2( x, y ), new V2( x+104, y+36 ));
	this.callback = callback;
	this.x = x;
	this.y = y;

	this.img = new sprite( img );
	this.hover = new sprite( hover );
}

button.prototype.click = function( pos ) {
	if( this.area.inside( pos )) {
		sound.play('sound/click.ogg');
		this.callback();
	}
}

button.prototype.draw = function( ctx ) {
	if( this.area.inside( mouse )) this.hover.draw( ctx, this.x, this.y );
	else this.img.draw( ctx, this.x, this.y );
}

