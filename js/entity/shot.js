function shot(x ,y , move) {
	this.position = new V2 ( x-5 , y-5 );
	this.movement = move;
	this.width = 8;
	this.height = 8;

	this.position.add( move.prd( 50 ));

	this.sprite = new sprite('img/laser.png');
	this.offset = new V2( 1, 1 );
}

shot.prototype = new mapEntity();


mapEntity.prototype.draw = function(ctx, viewport) {
	var pos = this.position.dif( this.offset );
	if( viewport.collision( new Rect( pos, this.position.sum( new V2( 10, 10 )))))
		this.sprite.draw(ctx, pos.x-viewport.getX(), pos.y-viewport.getY());
}

shot.prototype.update = function(delta, map) {
	this.position.add(this.movement.prd(delta));
	var pos = this.position.grid( map.tileWidth, map.tileHeight );

	if( map.checkCollision( pos.x, pos.y )) {
		this.scene.remove( this );
		this.scene.add( new bulletsplash( this.position, this.movement.prd(-1)));
	} else {
		var entities = this.scene.entities;
		var hitbox = this.getHibox();

		for( var i = 0; i < entities.length; i++ )
			if( entities[i] instanceof victim ) {
				if( entities[i].y > hitbox.p2.y ) break;

				if( entities[i].getHibox().collision( hitbox )) {
					var v = entities[i];
					this.scene.remove( this );
					this.scene.add( new splatter( this.position, this.movement ));
					v.kill();
				}
			}
	}
}


