function highscoreScene() {
	this.entities = [
		new wButton(374, 474, function(){
			// Menu button
			game.scene = scenes.title;
		}),

	]

	this.highscore = [];
	this.reload();
}

highscoreScene.prototype = new scene();

highscoreScene.prototype.reload = function() {
	var self = this;

	ajax.json('http://master-iv.info/games/woilenz/backend/getScore.php',function(data) {
		self.scores = data;
	});
}

highscoreScene.prototype.draw = function( ctx ) {
	ctx.drawImage(g["img/scoreScreen_background.png"],0,0);

	ctx.font = "Bold 14pt sans-serif";
	ctx.fillStyle = "#5afd80";

	for(var i =0; i<this.scores.length;i++) {
		var secs = Math.round(this.scores[i].score/1000);
		var mins = Math.floor(secs/60);
		secs = secs%60;
		secs = (secs<10) ? "0"+secs:secs;

		ctx.textAlign = "left";
		ctx.fillText(this.scores[i].name, 300, 164 + i* 30);
		ctx.textAlign = "right";
		ctx.fillText(mins + ":" + secs , 690, 164 + i* 30);
	}

	for(var i = 0; i < this.entities.length; i++) {
		if(this.entities[i].draw)
			this.entities[i].draw(ctx);
	}

}
