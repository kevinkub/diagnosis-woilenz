var g = {
	urls: ["img/acid.png", "img/active_weapo.png", "img/blood.png", "img/bloodSplash.png", "img/bloodStains.png",
	"img/bomb.png", "img/bulletSplash.png", "img/creditsScreen.png", "img/death.png", "img/explosion.png",
	"img/explosionDecal.png", "img/extremeExplosion.png", "img/grenade.png", "img/helpScreen.png",
	"img/hero.png", "img/heroRifle.png", "img/heroThrower.png", "img/laser.png", "img/levelCompleted.png",
	"img/loading.gif", "img/pause.png", "img/scoreScreen_background.png",
	"img/shadow.png", "img/startScreen_background.png", "img/startScreen_menu.png", "img/startScreen_menu_mousover.png",
	"img/tileSpriteSheet.png", "img/tileset.png", "img/time.png", "img/victim1.png", "img/victim1_panic.png", "img/victim2.png",
	"img/victim2_panic.png", "img/victim3.png", "img/victim3_panic.png", "img/victim4.png", "img/victim4_panic.png",
	"img/victim5.png", "img/victim5_panic.png", "img/victims.png", "img/weapon_menu.png", 'img/enterNameScreen.png', 'img/bloodStainsSmall.png',
		'img/story01.png', 'img/story02.png', 'img/story03.png', 'img/story04.png'],

	add: function (url) {
		this.urls.push(url);
	},

	load: function (callback) {
		var total = 0, loaded = 0;

		function complete() {
			if (++loaded >= total) callback();
		}

		while (this.urls.length) {
			var url = this.urls.shift();
			if (typeof this[url] == 'undefined') {
				total++;
				this[url] = new Image();
				this[url].onload = complete;
				this[url].src = url;
			}
		}

		if (total == 0) callback();
	}
}
g.load(function () {
});
