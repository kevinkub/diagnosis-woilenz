function sprite( img ) {
	var self = this;

//	g.add( img );
//	g.load( function() {
		self.img = g[img];
//	});
}

sprite.prototype.draw = function( ctx, x, y ) {
	if( this.img ) {
		ctx.drawImage( this.img, x, y );
	}
};

sprite.prototype.center = function( ctx, x, y ) {
	if( this.img ) {
		ctx.drawImage( this.img, x-this.img.width/2, y-this.img.height/2 );
	}
};

function animationSprite( img, frames ) {
	var self = this;

//	g.add( img );
//	g.load( function() {
		self.img = g[img];
		self.h = g[img].height;
		self.w = g[img].width / frames;
		self.f = frames;
//	});
}

animationSprite.prototype.draw = function( ctx, x, y, f ) {
	if( this.img ) {
		ctx.drawImage( this.img, f*this.w, 0, this.w, this.h, x, y, this.w, this.h );
	}
};

animationSprite.prototype.center = function( ctx, x, y, f ) {
	if( this.img ) {
		ctx.drawImage( this.img, f*this.w, 0, this.w, this.h, x-this.w/2, y-this.h/2, this.w, this.h );
	}
};
