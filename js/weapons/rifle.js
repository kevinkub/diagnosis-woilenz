function rifle( actor ) {
	this.shooting = false;
	this.actor = actor;
	this.cooldown = 0;

	this.maxCooldown = 150;

	this.ammo = this.ammoMax = 20;
	this.reloadTime = 1000;
	this.reloading = false;
}

rifle.prototype.update = function( delta ) {
	if( this.cooldown > 0 ) this.cooldown -= delta;

	if( this.ammo < 1 ) {
		sound.play('sound/fx/laser/laser-reload.ogg');
		this.cooldown = this.reloadTime;
		this.ammo = this.ammoMax;
		this.reloading = true;
	} else if( this.shooting && this.cooldown <= 0 ) {
		this.reloading = false;
		this.ammo--;

		var speed = .5;
		var center = this.actor.getCenter();
		var move = mouse.sum( scenes.map.viewport.p1 ).dif( center).norm().prd( speed );

		scenes.map.add( new shot( center.x, center.y, move ));
		sound.play('sound/fx/laser/laser.ogg');
		this.cooldown = this.maxCooldown;
	}

	var status;
	if( this.reloading ) status = this.cooldown / this.reloadTime;
	else status = 1 - this.ammo / this.ammoMax;
	scenes.map.ui.setReloadStatus( status );
}

rifle.prototype.fire = function() {
	this.shooting = true;
}

rifle.prototype.stop = function() {
	this.shooting = false;
}
