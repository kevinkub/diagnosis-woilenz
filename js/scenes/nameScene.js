function nameScene() {
	var self = this;
	this.bg = new sprite('img/enterNameScreen.png');

	this.init = function() {
		this.form = document.getElementById('nameinput');
	}

	this.submit = function() {
		this.form.style.display = 'none';
		game.scene = scenes.highscore;

		var scores = encodeURIComponent( JSON.stringify( game.scores ));
		var name = document.getElementById('playername').value;

		ajax.load('http://master-iv.info/games/woilenz/backend/score.php',function(data) {
			ajax.load('http://master-iv.info/games/woilenz/backend/score.php',function(result) {
				scenes.highscore.reload();
			},'action=validMyScore&myScore='+scores+"&name="+name+"&code="+data);
		},'action=sendMyScore&myScore='+scores);

		return false;
	}

	this.entities = [{
		update: function( delta ) {
			if( self.form.style.display != 'block' )
				self.form.style.display = 'block';
			}
		},
		new wButton( 308, 408, function() {
			self.submit();
		})
	];
}

nameScene.prototype = new scene();

