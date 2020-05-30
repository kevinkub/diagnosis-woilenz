function completeScene() {
	var self = this;
	this.time = 0;

	function timer() {
		this.draw = function( ctx ) {
			var secs = Math.round(self.time/1000);
			var mins = Math.floor(secs/60);

			secs = secs%60;
			secs = (secs<10) ? "0"+secs:secs;

			ctx.font = "Bold 60pt sans-serif";
			ctx.fillStyle = "#5afd80";
			ctx.textAlign = "left";
			ctx.strokeStyle = "#70000b";
			ctx.lineWidth = 5;
			ctx.lineJoin = 'round';
			ctx.fillText(mins + ":" + secs, 450, 357);
			ctx.strokeText(mins + ":" + secs, 450, 357);
		}
	}


	this.bg = new sprite('img/levelCompleted.png');
	this.entities =  [

		new wButton(178, 407, function(){
			// Play Again
			scenes.map.init( game.levels[game.level] );
			game.scene = scenes.map;
		}),

		new wButton(428, 408, function(){
			if( ++game.level < game.levels.length ) {
				scenes.map.init( game.levels[game.level] );
				game.scene = scenes.map;
			} else {
				game.scene = scenes.name;
			}
		}),

		new timer()
	]
}

completeScene.prototype = new scene();

completeScene.prototype.setScore = function( timeTaken ) {
	game.scores[game.level] = timeTaken;
	this.time = timeTaken;
}


