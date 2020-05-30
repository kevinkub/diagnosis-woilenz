function delayed( sprite, delay ) {
	this.timer = 0;
	this.sprite = sprite;
	this.delay = delay;
}

delayed.prototype.update = function( delta ) {
	this.timer += delta;
}

delayed.prototype.draw = function( ctx ) {
	if( this.timer > this.delay ) {
		var fade = this.timer - this.delay
		ctx.globalAlpha = fade < 500 ?  fade/500 : 1;
		this.sprite.draw( ctx, 0, 0 );
	}
}

function introScene() {
	this.entities = [
		new delayed( new sprite('img/story01.png'),     0 ),
		new delayed( new sprite('img/story02.png'),  4000 ),
		new delayed( new sprite('img/story03.png'),  8000 ),
		new delayed( new sprite('img/story04.png'), 12000 ),

		{
			timer: 0,
			click: function() {
				game.scene = scenes.title;
			},
			update: function( delta ) {
				this.timer += delta;
				if( this.timer > 16000 )
					game.scene = scenes.title;
			}
		}
	];
}

introScene.prototype = new scene();
