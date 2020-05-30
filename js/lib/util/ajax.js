var ajax = {
	load: function( url, callback , postData) {
		var xmlHttp = null

		try {
			xmlHttp = new XMLHttpRequest();
		} catch(e) {
			try {
				xmlHttp  = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				try {
					xmlHttp  = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					xmlHttp  = null;
				}
			}
		}
		
		if(xmlHttp) {
			xmlHttp.open(((typeof postData == 'undefined')?'GET':'POST'), url, true);			
			xmlHttp.setRequestHeader("Accept","text/plain");
			xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlHttp.onreadystatechange = function () {
					if (xmlHttp.readyState == 4) {
						callback(xmlHttp.responseText);
					}
			};

			xmlHttp.send(((typeof postData == 'undefined')?null:postData));
		}
	},

	json: function( url, callback ) {
		this.load( url, function( data ) {
			callback( eval( '('+data+')' ));
		});
	}
}

