


var MOUSE_DOWN = false;



/*
TOUCHSTART
*/

function touchstart( callback ) {

	/*
	TOUCHSTART
	*/

	document.addEventListener('touchstart', function(e) {

		e.preventDefault();
		e.stopPropagation();

		var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY;

		callback( new Point( x, y ) );

	}, false );

	/*
	MOUSEDOWN
	*/

	document.addEventListener('mousedown', function( e ) {

		e.preventDefault();
		e.stopPropagation();

		MOUSE_DOWN = true;

		var x = e.clientX,
				y = e.clientY;

		callback( new Point( x, y ) )

	}, false );

}



/*
TOUCHMOVE
*/

function touchmove( callback ) {

	/*
	TOUCHMOVE
	*/

	document.addEventListener('touchmove', function(e) {

		e.preventDefault();
		e.stopPropagation();

		var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY;

		callback( new Point( x, y ) );

	}, false );

	/*
	MOUSEMOVE
	*/

	document.addEventListener('mousemove', function( e ) {

		e.preventDefault();
		e.stopPropagation();

		if ( MOUSE_DOWN ) {
			var x = e.clientX,
					y = e.clientY;

			callback( new Point( x, y ) );
		}

	}, false );

}



/*
TOUCHEND
*/

function touchend( callback ) {

	/*
	TOUCHEND
	*/

	document.addEventListener('touchend', function( e ) {

		callback();

	}, false );

	/*
	MOUSEUP
	*/

	document.addEventListener('mouseup', function( e ) {

		callback();

	}, false );

}





/*
ON DOCUMENT LOAD
*/

document.addEventListener('DOMContentLoaded', function() {	

	/*
	MOUSEDOWN
	*/

	document.addEventListener('mousedown', function( e ) {

		MOUSE_DOWN = true;

	}, false );

	

	/*
	MOUSEUP
	*/

	document.addEventListener('mouseup', function( e ) {

		if ( MOUSE_DOWN ) {
			MOUSE_DOWN = false;
			//e.preventDefault();
		}

	}, false );

}, false );



