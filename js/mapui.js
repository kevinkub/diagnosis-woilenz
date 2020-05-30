function mapui() {
	this.victims = 0;
	this.weaponId = 0;

	this.width = 600;
	this.height = 50;

	this.reloadStatus = 0;
}

mapui.prototype.draw = function( ctx, viewport, scene ) {
	ctx.drawImage(g["img/time.png"], 0, 20);
	var secs = Math.round(scene.sceneTimer/1000);
	var mins = Math.floor(secs/60);
	secs = secs%60;
	secs = (secs<10) ? "0"+secs:secs;
	ctx.font = "Bold 12pt sans-serif";
	ctx.textAlign = "center";
	ctx.fillStyle = "#5afd80";
	ctx.fillText(mins + ":" + secs, 81, 46);

	ctx.fillStyle = "rgba(230, 190, 188, 1)";
	ctx.drawImage(g["img/victims.png"], 0, 65);
	ctx.fillText(this.victims, 81, 85);

	ctx.drawImage(g["img/weapon_menu.png"], (viewport.getWidth()-208)/2, 600-68);
	ctx.drawImage(g["img/active_weapo.png"], (viewport.getWidth()-208)/2 - ((this.weaponId<2)?3:2) + 55 * this.weaponId, 600-78);

	ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect((viewport.getWidth()-208)/2+55 * this.weaponId,600-27,40,-40*this.reloadStatus);
}

mapui.prototype.setReloadStatus = function ( percent ) {
	this.reloadStatus = percent;
}

mapui.prototype.setVictims = function( c ) {
	this.victims = c;
}

mapui.prototype.victimRemoved = function() {
	this.victims--;

	if( this.victims < 1 )
		setTimeout( function() {
			scenes.complete.setScore(scenes.map.sceneTimer);
			game.scene = scenes.complete;
		}, 1000 );
}

mapui.prototype.setWeapon = function( id ) {
	this.weaponId = id;
}
