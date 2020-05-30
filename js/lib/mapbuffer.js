function mapBuffer(data, scene){
	this.data = data;

	var tw = this.tileWidth = this.data.tilewidth;
	var th = this.tileHeight = this.data.tileheight;

	this.width = this.data.width * tw;
	this.height = this.data.height * th;

	this.below = document.createElement('canvas');
	this.above = document.createElement('canvas');
	this.below.width = this.above.width = this.width;
	this.below.height = this.above.height = this.height;

	for( var i = 0; i < data.tilesets.length; i++ ) {
		data.tilesets[i].width = data.tilesets[i].imagewidth / tw;
		data.tilesets[i].image = data.tilesets[i].image.replace("../", "");
		g.add( data.tilesets[i].image );
	}

	var layer, ctx, tile, img, tileset, self = this;

	g.load( function() {
		for( var i = 0; i < data.layers.length; i++ )
			if( data.layers[i].data ) {
				layer = data.layers[i].data;
				ctx = i < 3 ? self.below.getContext('2d') : self.above.getContext('2d');

				for(var x = 0; x < data.width; x++)
					for(var y = 0; y < data.height; y++) {
						tile = layer[x + (y * data.width)]-1;
						if( tile > -1 ) {
							tileset = data.tilesets[0];
							ctx.drawImage( g[tileset.image], (tile%tileset.width)*tw, Math.floor( tile/tileset.width)*th, tw, th, x*tw, y*th, tw, th );
						}
					}
			} else {
				layer = data.layers[i].objects;
				for( var j = 0; j < layer.length; j++ ) {
					if (layer[j].type != 'player') {
						scene.add( new victim( layer[j].x, layer[j].y ));
					} else {
						scene.hero.position.x = layer[j].x;
						scene.hero.position.y = layer[j].y;
					}

				}
				scene.ui.setVictims(layer.length-1);
			}
	});
}

mapBuffer.prototype.getWidth = function(){
	return this.width;
}

mapBuffer.prototype.getHeight = function(){
	return this.height;
}


mapBuffer.prototype.copyBuffer = function( ctx, viewport, layer ) {
	var width = Math.min( layer.width, viewport.getWidth());
	var height = Math.min( layer.height, viewport.getHeight());

	ctx.drawImage( layer,
			viewport.getX(), viewport.getY(), width , height,
			0, 0, width , height
	);
}

mapBuffer.prototype.drawBelow = function(ctx, viewport) {
	this.copyBuffer( ctx, viewport, this.below );
}

mapBuffer.prototype.drawAbove = function(ctx, viewport) {
	this.copyBuffer( ctx, viewport, this.above );
}

mapBuffer.prototype.checkCollision = function(x, y) {
	if( x < 0 || y < 0 || x >= this.data.width || y >= this.data.height ) return true;
	return this.data.layers[2] ? this.data.layers[2].data[(x|0) + (y|0)*this.data.width] > 0 : false;
}

