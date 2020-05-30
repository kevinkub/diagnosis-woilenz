function titleScene() {
	var self = this;

	this.entities = [
		new wButton(404, 270, function(){
			// Play button
			game.level = 0;
			scenes.map.init( game.levels[game.level] );
			game.scene = scenes.map;
			backgroundsound.play("sound/music/staticvoid%20-%20woilenz.ogg");

		}),
		new wButton(404, 316, function(){
			// Score button
			game.scene = scenes.highscore;
		}),
		new wButton(404, 362, function(){
			// Help button
			game.scene = scenes.help;
		}),
		new wButton(404, 407, function(){
			// Credits button
			game.scene = scenes.credits;
		}),
		new wButton(404, 453, function(){
			// Exit button
			window.close();
		})

	]
}

titleScene.prototype = new scene();

titleScene.prototype.draw = function( ctx ) {
	ctx.drawImage(g["img/startScreen_background.png"],0,0);
	ctx.drawImage(g["img/startScreen_menu.png"],400,264);

	for(var i = 0; i < this.entities.length; i++) {
		if(this.entities[i].draw)
			this.entities[i].draw(ctx);
	}
}
