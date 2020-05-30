function animation() {

}

animation.prototype = new mapEntity();

animation.prototype.init = function( sprite, frames, duration ) {
	this.framecount = frames;
	this.f = new framecounter( 50 );
	this.sprite = new animationSprite( sprite, frames );
}

animation.prototype.update = function(delta, map) {
	this.f.update(delta);
	if( this.f.frame >= this.framecount )
		this.scene.remove( this );
}

animation.prototype.draw = function(ctx, viewport) {
	if( viewport.collision( new Rect( this.position, this.position.sum( new V2( this.width, this.height )))))
		this.sprite.draw( ctx, this.position.x-viewport.getX(), this.position.y-viewport.getY(), this.f.frame );
}


function explosion(x, y) {
	this.width = 160;
	this.height = 160;
	this.position = new V2 ( x-this.width/2, y-this.height/2 );
	this.init( 'img/explosion.png', 5, 50 );

	sound.play('sound/fx/granate/ogg/granate-explosion.ogg');
	this.ash = new sprite('img/explosionDecal.png');
	this.op = new V2( x, y );
}

explosion.prototype = new animation();

explosion.prototype.update = function(delta, map) {
	this.f.update(delta);
	if( this.f.frame >= this.framecount ) {
		this.scene.remove( this );
		var ctx = this.scene.map.below.getContext('2d');
		this.ash.center( ctx, this.op.x, this.op.y );
	}
}


function explosion2(x, y) {
	this.width = 160;
	this.height = 200;
	this.position = new V2 ( x-this.width/2, y-160 );
	this.init( 'img/extremeExplosion.png', 9, 50 );

	sound.play('sound/fx/granate/ogg/granate-explosion.ogg');
	this.ash = new sprite('img/explosionDecal.png');
	this.op = new V2( x, y );
}

explosion2.prototype = new animation();

explosion2.prototype.update = function(delta, map) {
	this.f.update(delta);
	if( this.f.frame >= this.framecount ) {
		this.scene.remove( this );
		var ctx = this.scene.map.below.getContext('2d');
		this.ash.center( ctx, this.op.x, this.op.y );
	}
}


function death(x ,y) {
	this.width = 80;
	this.height = 80;
	this.position = new V2 ( x, y );
	this.init( 'img/death.png', 7, 70 );

	var sfx = [
		'sound/fx/splatter/ogg/splatter01.ogg',
		'sound/fx/splatter/ogg/splatter02.ogg',
		'sound/fx/splatter/ogg/splatter03.ogg',
		'sound/fx/splatter/ogg/splatter04.ogg',
	][(Math.random()*4)|0];

	sound.play( sfx );

}

death.prototype = new animation();

function splatter( pos, move ) {
	this.position = pos;
	this.init( 'img/bloodSplash.png', 8, 70 );
	this.angle = move.angle2()  + Math.PI/2;

	var blood = new animationSprite('img/bloodStainsSmall.png', 5);
	var ctx = scenes.map.map.below.getContext('2d');

	for(var i = 0; i < (Math.random()*4)+2; i++) 	{
		ctx.save();
		ctx.translate( this.position.x, this.position.y );
		ctx.rotate( this.angle );
		blood.draw( ctx, Math.random()*20-10, Math.random()*30+5, (Math.random()*5)|0 );
		ctx.restore();
	}
}

splatter.prototype = new animation();

splatter.prototype.draw = function(ctx, viewport) {
	ctx.save();
	ctx.translate( this.position.x-viewport.getX(), this.position.y-viewport.getY());
	ctx.rotate( this.angle );
	this.sprite.draw( ctx, -40, -125, this.f.frame );
	ctx.restore();
}

function bulletsplash( pos, move ) {
	this.position = pos;
	this.init( 'img/bulletSplash.png', 5, 70 );
	this.angle = move.angle2()  + Math.PI/2;
}

bulletsplash.prototype = new animation();

bulletsplash.prototype.draw = function(ctx, viewport) {
	ctx.save();
	ctx.translate( this.position.x-viewport.getX(), this.position.y-viewport.getY());
	ctx.rotate( this.angle );
	this.sprite.draw( ctx, -15, -30, this.f.frame );
	ctx.restore();
}
