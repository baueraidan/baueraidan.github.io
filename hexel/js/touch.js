


/*
TOUCHSTART
*/

function touchstart( callback ) {

	/*
	TOUCHSTART
	*/

	document.addEventListener('touchstart', function(e) {

		e.preventDefault();
		//e.stopPropagation();

		var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY;

		var am = e.touches.length;

		callback( new Point( x, y ), am, false );

	}, false );

	/*
	MOUSEDOWN
	*/

	document.addEventListener('mousedown', function( e ) {

		e.preventDefault();

		var cancel = ( e.which !== 1 || e.ctrlKey !== false );

		MOUSE_DOWN = true;

		var x = e.clientX,
				y = e.clientY;

		callback( new Point( x, y ), 1, cancel );

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
		//e.stopPropagation();

		var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY;

		var am = e.touches.length;

		callback( new Point( x, y ), am );

	}, false );

	/*
	MOUSEMOVE
	*/

	document.addEventListener('mousemove', function( e ) {

		e.preventDefault();
		//e.stopPropagation();

		if ( MOUSE_DOWN ) {
			var x = e.clientX,
					y = e.clientY;

			callback( new Point( x, y ), 1 );
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

		var am = e.touches.length;
		callback( am );

	}, false );

	/*
	MOUSEUP
	*/

	document.addEventListener('mouseup', function( e ) {

		callback( 0 );

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


