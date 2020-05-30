function hero(x, y) {
	this.position = new V2(x, y);
	this.movement = new V2( 0, 0 );
	this.width = 40;
	this.height = 60;
	this.color = 'black';

	this.weapons = [
			new rifle(this),
			new flamethrower(this),
			new grenadeThrower(this),
			new bombWeapon( this )
	];

	this.setWeapon(0);
}

hero.prototype = new person();

hero.prototype.update = function( delta, map ) {
	if( this.movement.x || this.movement.y ) {
		this.updateSprite( delta );
	} else {
		this.c.frame = 0;
	}

	this.checkCollision( this.movement.prd( delta ), map );
	if( this.weapon ) this.weapon.update( delta );

	var viewport = this.scene.viewport;
	var pos = this.position.dif( new V2( viewport.getX(), viewport.getY())).dif( mouse );

	if( Math.abs(pos.x) > Math.abs(pos.y)) {
		if( pos.x > 0 ) this.direction = 2;
		else this.direction = 3;
	} else {
		if( pos.y > 0 ) this.direction = 1;
		else this.direction = 0;
	}
}

hero.prototype.down = function( key ) {
	var speed = .3;

	if( key == 'left' ) {
		this.movement.x = -speed;
//		this.direction = 2;
	}

	if( key == 'right' ) {
		this.movement.x = speed;
//		this.direction = 3;
	}

	if( key == 'up' ) {
		this.movement.y = -speed;
//		this.direction = 1;
	}

	if( key == 'down' ) {
		this.movement.y = speed;
//		this.direction = 0;
	}

	if( key > 0 && key <= this.weapons.length )
		this.setWeapon( key - 1 );
}

hero.prototype.setWeapon = function( i ) {
	scenes.map.ui.setWeapon(i);
	this.weapon = this.weapons[i];
	this.loadImage( [
		'img/heroRifle.png',
		'img/heroThrower.png',
		'img/hero.png',
		'img/hero.png',
	][i] );
}

hero.prototype.up = function( key ) {
	if( key == 'left' && this.movement.x < 0 ) this.movement.x = 0;
	if( key == 'right' && this.movement.x > 0 ) this.movement.x = 0;
	if( key == 'up' && this.movement.y < 0 ) this.movement.y = 0;
	if( key == 'down' && this.movement.y > 0 ) this.movement.y = 0;

//	if( this.movement.x < 0 ) this.direction = 2;
//	if( this.movement.x > 0 ) this.direction = 3;
//	if( this.movement.y < 0 ) this.direction = 1;
//	if( this.movement.y > 0 ) this.direction = 0;
}


hero.prototype.checkCollision = function( move, map ) {
	var steps = Math.ceil(Math.max( Math.abs( move.x )/map.tileWidth, Math.abs( move.y )/map.tileHeight));
	var collision = {x: false, y: false};

	if( steps > 1 ) {
		move.div( steps );

		for( var i = 0; i < steps && (move.x || move.y); i++) {
			this.checkCollisionStep( move, collision, map );
			if( collision.x ) move.x = 0;
			if( collision.y ) move.y = 0;
		}
	} else {
		this.checkCollisionStep( move, collision, map );
	}
}

hero.prototype.checkCollisionStep = function( move, collision, map ) {
	var pos = new V2( this.position.x, this.position.y );
	this.position.add( move );

	if( move.x ) {
		var pxOffsetX = (move.x > 0 ? this.width : 0);
		var tileOffsetX = ( move.x < 0 ? map.tileWidth : 0);

		var firstTileY = Math.floor(pos.y / map.tileHeight);
		var lastTileY = Math.ceil((pos.y + this.height) / map.tileHeight);
		var tileX = Math.floor((pos.x + move.x + pxOffsetX) / map.tileWidth);

		for(var tileY = firstTileY; tileY < lastTileY; tileY++) {
			if( map.checkCollision( tileX, tileY )) {
				collision.x = true;
				this.position.x = tileX * map.tileWidth - pxOffsetX + tileOffsetX;
				break;
			}
		}
	}

	if( move.y ) {
		var pxOffsetY = ( move.y > 0 ? this.height : 0);
		var tileOffsetY = ( move.y < 0 ? map.tileHeight : 0);

		var firstTileX = Math.floor( this.position.x / map.tileWidth );
		var lastTileX = Math.ceil(( this.position.x + this.width ) / map.tileWidth );
		var tileY = Math.floor(( pos.y + move.y + pxOffsetY) / map.tileHeight );

		for(var tileX = firstTileX; tileX < lastTileX; tileX++) {
			if( map.checkCollision( tileX, tileY )) {
				collision.y = true;
				this.position.y = tileY * map.tileHeight - pxOffsetY + tileOffsetY;
				break;
			}
		}
	}
}

hero.prototype.mousedown = function( pos ) {
	if( this.weapon ) this.weapon.fire();
}

hero.prototype.mouseup = function( pos ) {
	if( this.weapon ) this.weapon.stop();
}
