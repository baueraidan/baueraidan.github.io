
var RESIZE_TIMESTAMP = 0;

window.addEventListener( 'resize', function() {

	W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  //resizeCanvas( c, W, H );

  resizeCanvas( boxC, W, H );


  var thisTimestamp = new Date().getTime();
  RESIZE_TIMESTAMP = thisTimestamp;

  console.log( 'resize' );

	(function( thisTimestamp ) {

		return setTimeout(function() {
			console.log( 'timeout' )
			if ( RESIZE_TIMESTAMP === thisTimestamp ) {

				console.log( 'REDRAW' );
				
				cancelDraw(function() {
					console.log( 'drawing' );
					calcBounds();
				  draw( MIN_POINT, MAX_POINT, MAX_ITERATIONS );
				});
				
			}
		}, 500 );

	})( thisTimestamp );



/*
  cancelDraw(function() {
  	if ( !DRAWING ) {
	  	console.log( 'CANCELED' );
	  	calcBounds();
	  	draw( MIN_POINT, MAX_POINT, MAX_ITERATIONS );
  	}
  });
*/

}, false );


