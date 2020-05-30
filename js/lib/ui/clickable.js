function clickable( x, y, w, h, callback ) {
	this.area = new Rect( new V2( x, y ), new V2( x+w, y+h ));
	this.callback = callback;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

clickable.prototype.click = function( pos ) {
	if( this.area.inside( pos )) {
		sound.play('sound/click.ogg');
		this.callback();
	}
}

function wButton( x, y, callback ) {
	this.area = new Rect( new V2( x, y ), new V2( x+204, y+46 ));
	this.callback = callback;
	this.x = x;
	this.y = y;
}

wButton.prototype = new clickable( 0, 0, 0, 0, null )

wButton.prototype.draw = function( ctx ) {
	if( this.area.inside( mouse )) {
		ctx.drawImage(g["img/startScreen_menu_mousover.png"], this.area.p1.x, this.area.p1.y);
	}
}
