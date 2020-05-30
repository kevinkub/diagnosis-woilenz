var personWidth = 80;
var persohHeight = 80;

function person() {
	this.direction = 0;
	this.c = new framecounter(60);
}

person.prototype = new mapEntity();


person.prototype.updateSprite = function( delta ) {
	this.c.update( delta );
}

person.prototype.loadImage = function( img ) {
	var self = this;
	g.add( img );
	g.load(function() {
		self.img = g[img];
		self.offset = new V2(
				(personWidth-self.width) / 2,
				persohHeight-self.height
		);
	});
}

person.prototype.draw = function(ctx, viewport) {
	if( this.img ) {
		var pos = this.position.dif( this.offset );
		var imgBox = new Rect( pos, this.position.sum( new V2( personWidth, persohHeight )));

		if( viewport.collision( imgBox )) {
			var xOffset = 0;
			if (this.direction == 2) xOffset = +3;
			if (this.direction == 3) xOffset = +3;

			ctx.drawImage(
					this.img,
					( this.c.frame % 6 ) * personWidth, this.direction * persohHeight, personWidth, persohHeight,
					pos.x-viewport.getX(), pos.y-viewport.getY(), personWidth, persohHeight );
		}
	}
}
