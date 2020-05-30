function helpScene() {
	var self = this;
	this.bg = new sprite("img/helpScreen.png");
	this.entities = [
		new wButton(375, 474, function(){
			// Back button
			game.scene = scenes.title;
		})
	]
}

helpScene.prototype = new scene();