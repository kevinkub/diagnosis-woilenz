function victim( x, y ) {
	this.position = new V2( x, y );
	this.width = 40;
	this.height = 60;

	this.angle = Math.random() * Math.PI * 2;
	this.normalSpeed = .15 * Math.random() +.1;
	this.panicSpeed = .38;
	this.speed = this.normalSpeed;
	this.turn = 0;
	this.panic = false;
	this.panicSource = new V2(0,0);
	this.panicTime = 0;
	this.panicTimeMax = 10000;

	
	this.spriteId = (1+Math.random()*5|0);
	this.loadImage('img/victim'+this.spriteId+'_panic.png');
	this.loadImage('img/victim'+this.spriteId+'.png');

	this.screamCooldown = 0;
	
	this.bloodSprites = new animationSprite('img/bloodStains.png', 4);	
	
	this.c = new framecounter(100);
}

victim.prototype = new person();

victim.prototype.update = function( delta, map ) {
	var rnd = Math.random()*10;
	this.updateSprite(delta);

	if(!this.panic) {
		if( rnd < 1 + (this.turn>0)*3 ) {
			this.turn = 1;
			this.angle += delta * .005;
		} else if( rnd < 2 + (this.turn>0)*3 + (this.turn<0)*3 ) {
			this.turn = -1;
			this.angle -= delta * .005;
		}
	} else {
		this.panicTime -= delta;
		if (this.panicTime <= 0 ) {
			this.loadImage('img/victim'+this.spriteId+'.png');
			this.speed = this.normalSpeed;
			this.panic = false;
			this.panicTime = this.panicTimeMax;
		} else {
			var angleBetween = ((this.position.dif(this.panicSource).dot(this.movement)) / (this.position.dif(this.panicSource).normFac() * this.movement.normFac()));

			if (this.angle > angleBetween) {
				this.angle -= delta * .005;
			} else {
				this.angle += delta * .005;
			}
		}
	}

	var angle, correction = 0;
	var i = 0;

	do {
		angle = this.angle + correction;
		this.movement = rad_to_vector( angle, this.speed );
		correction = correction > 0 ? -correction-.3 : -correction+.3;
	} while( this.checkCollision( this.movement.prd( delta ), map ) && i++ < 10 );


	if( Math.abs(this.movement.x) > Math.abs(this.movement.y)) {
		if( this.movement.x > 0 ) this.direction = 3;
		else this.direction = 2;
	} else {
		if( this.movement.y > 0 ) this.direction = 0;
		else this.direction = 1;
	}

	this.angle = angle;
	this.position.add( this.movement.prd( delta ) );

	if(this.panic && this.screamCooldown-- < 0 && ((Math.random()*100|0)+1)<=1) { 
		sound.play('sound/fx/scream/ogg/scream0'+((Math.random()*5|0)+1)+'.ogg');
		this.screamCooldown = 150;
	}

}


victim.prototype.setPanic = function(posRef) {
	this.loadImage('img/victim'+this.spriteId+'_panic.png');
	this.speed = this.panicSpeed;
	this.panic = true;
	this.panicSource = posRef;
}

victim.prototype.checkCollision = function( move, map ) {
	var pos = this.position.sum( move );
	var firstTileX = Math.floor( pos.x / map.tileWidth );
	var lastTileX = Math.ceil(( pos.x + this.width ) / map.tileWidth );
	var firstTileY = Math.floor( pos.y / map.tileHeight );
	var lastTileY = Math.ceil(( pos.y + this.height) / map.tileHeight );

	for( var x = firstTileX; x < lastTileX; x++ )
		for( var y = firstTileY; y < lastTileY; y++ )
			if( map.checkCollision( x, y )) return true;
	return false;
}

victim.prototype.kill = function() {
	var pos = this.position.dif( this.offset );
	this.scene.remove( this );
	this.scene.ui.victimRemoved();
	this.scene.add( new death( pos.x, pos.y  ));

	var center = this.getCenter();
	var belowctx = this.scene.map.below.getContext('2d');
	this.bloodSprites.center(belowctx, center.x, center.y, (Math.random()*3)|0);
}