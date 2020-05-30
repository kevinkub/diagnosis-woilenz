function creditsScene() {
	var self = this;
	this.entities = [
		new wButton(375, 474, function(){
			// Back button
			game.scene = scenes.title;
		}),
		new clickable(610, 170, 25, 25, function(){
			// Rojan
			window.open( 'http://www.master-iv.info'); 
		}),
		new clickable(588, 231, 25, 25, function(){
			// Fisher
			window.open( 'http://www.anfis.de'); 
		}),
		new clickable(578, 260, 25, 25, function(){
			// Hoffmann
			window.open( 'http://lucahofmann.de'); 
		}),		
		new clickable(590, 291, 25, 25, function(){
			// Kub
			window.open( 'http://www.kevinkub.de'); 
		}),		
		new clickable(615, 323, 25, 25, function(){
			// Michels
			window.open( 'http://www.andremichels.de'); 
		}),
		new clickable(610, 350, 25, 25, function(){
			// Pontius
			window.open( 'http://www.simonpontius.de'); 
		}),
	]
	
	this.bg = new sprite('img/creditsScreen.png');
}

creditsScene.prototype = new scene();
