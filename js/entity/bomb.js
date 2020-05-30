function bomb(x ,y) {
	this.position = new V2 (x ,y );
	this.timer = 1000;

	this.sprite = new sprite( 'img/bomb.png' );

	this.width = 10;
	this.height = 10;

}
bomb.prototype = new mapEntity();


bomb.prototype.update = function(delta, map) {
	this.timer -= delta;


	if (this.timer <= 0 ) {
		this.scene.add( new explosion2(this.position.x,this.position.y, 80));
		this.scene.remove(this);

		for( var i = 0; i < this.scene.entities.length; i++ ) {
			if (this.scene.entities[i] instanceof victim) {
				var dist = this.getCenter().dif(this.scene.entities[i].getCenter()).length();
				if (dist < 300) {
					this.scene.entities[i].kill();
					i--;
				} else if (dist < 600) {
					this.scene.entities[i].setPanic(scenes.map.hero.position);
				}
			}
		}
	}

}


bomb.prototype.draw = function(ctx, viewport) {
	if( viewport.collision( new Rect( this.position, this.position.sum( new V2( this.width, this.height )))))
		this.sprite.center(ctx, this.position.x-viewport.getX(), this.position.y-viewport.getY());
	// Bombe tick animation
}


