function mapScene() {
	this.ui = new mapui();
}

mapScene.prototype = new scene();

mapScene.prototype.init = function ( mapfile ) {
	var self = this;

	this.entities = [
		new clickable(290,530, 50, 50, function(){
			self.hero.setWeapon(0);
		}),
		new clickable(345,530, 50, 50, function(){
			self.hero.setWeapon(1);
		}),
		new clickable(400,530, 50, 50, function(){
			self.hero.setWeapon(2);
		}),
		new clickable(455,530, 50, 50, function(){
			self.hero.setWeapon(3);
		})
	];

	this.animations = [];

	ajax.json( mapfile, function( data ) {
		self.sceneTimer = 0;
		self.add( self.hero = new hero());
		self.map = new mapBuffer( data, self );
		self.add( self.viewport = new viewport( self.hero, 800, 600,  self.map ));
	});
}

mapScene.prototype.getSceneTimer = function () {
	return this.sceneTimer;
}

mapScene.prototype.setSceneTimer = function (pTime) {
	this.sceneTimer = pTimer;
}

mapScene.prototype.draw = function( ctx ) {
	if( this.map ) {
		this.map.drawBelow( ctx, this.viewport );

		for( var i = 0; i < this.entities.length; i++ )
			if( this.entities[i].draw )
				this.entities[i].draw( ctx, this.viewport );

		this.map.drawAbove( ctx, this.viewport );

		for( var i = 0; i < this.animations.length; i++ )
			if( this.animations[i].draw )
				this.animations[i].draw( ctx, this.viewport );

		this.ui.draw( ctx, this.viewport, this);
	}
}

mapScene.prototype.update = function( delta ) {
	this.sceneTimer += delta;

	this.entities.sort(function(a, b) {
			if (typeof a.position != 'undefined' && typeof b.position != 'undefined') {
				return a.position.y-b.position.y
			} else {
				return 0;
			}
	});

	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].update )
			this.entities[i].update( delta, this.map );

	for( var i = 0; i < this.animations.length; i++ )
		if( this.animations[i].update )
			this.animations[i].update( delta, this.map );
}

scene.prototype.add = function( entity ) {
	if( entity.setScene ) entity.setScene(this);
	if( entity instanceof animation ) this.animations.push( entity );
	else this.entities.push( entity );
}

scene.prototype.remove = function( entity ) {
	if( entity instanceof animation ) arrayRemove( this.animations, entity );
	else arrayRemove( this.entities, entity );
}
