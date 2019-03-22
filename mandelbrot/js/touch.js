
var POINT_START,
		POINT_CURRENT;

touchstart(function( point ) {
	POINT_START = point;
	POINT_CURRENT = point;
});

touchmove(function( point ) {

	if ( !DRAWING ) {

		POINT_CURRENT = point;

		var deltX = POINT_CURRENT.x - POINT_START.x,
				deltY = POINT_CURRENT.y - POINT_START.y;

		clear( boxCtx );

		boxCtx.strokeStyle = '#fff';
		boxCtx.lineWidth = 2;
		boxCtx.beginPath();
		boxCtx.rect( POINT_START.x, POINT_START.y, deltX, deltY );
		boxCtx.stroke();

	}

});



touchend(function() {

	elById( 'reminder' ).style.opacity = 0;

	if ( !DRAWING ) {

		var drawW = ctx.canvas.clientWidth,
				drawH = ctx.canvas.clientHeight;

		var deltX = W - drawW,
				deltY = H - drawH;

		var padX = deltX * 0.5,
				padY = deltY * 0.5;



		/*
		ADJUST BOX SELECTION FOR DIFFERENCE IN DRAW/TOTAL WIDTH
		*/

		// adjust start points
		var startX = POINT_START.x - padX,
				startY = POINT_START.y - padY,
				start = new Point( startX, startY );

		// adjust end points
		var endX = POINT_CURRENT.x - padX,
				endY = POINT_CURRENT.y - padY,
				end = new Point( endX, endY );



		/*
		FIND NEW SCALE
		*/

		var boxW = Math.abs( start.x - end.x ),
				boxH = Math.abs( start.y - end.y );

		var propX = boxW / drawW,
				propY = boxH / drawH;

		var prop = Math.min( propX, propY );

		console.log( prop );

		// ensure they didn't zoom in too far
		if ( prop >= 0.005 ) {

			var newScale = SCALE * prop;

			if ( newScale >= MIN_SCALE ) {

				elById( 'maximum' ).style.opacity = 0;



				/*
				FIND NEW CENTER
				*/

				var boxCenterX = ( start.x + end.x ) * 0.5,
						boxCenterY = ( start.y + end.y ) * 0.5,
						boxCenter = new Point( boxCenterX, boxCenterY );

				var boxCenterPropX = boxCenter.x / drawW,
						boxCenterPropY = boxCenter.y / drawH,
						boxCenterProp = new Point( boxCenterPropX, boxCenterPropY );

				var boundsDeltX = MAX_POINT.x - MIN_POINT.x,
						boundsDeltY = MAX_POINT.y - MIN_POINT.y,
						boundsDelt = new Point( boundsDeltX, boundsDeltY );

				var newCenterX = MIN_POINT.x + ( boxCenterProp.x * boundsDelt.x ),
						newCenterY = MIN_POINT.y + ( boxCenterProp.y * boundsDelt.y );

				var newCenter = new Point( newCenterX, newCenterY );


				SCALE = newScale;
				CENTER = newCenter;

				calcBounds();
				draw( MIN_POINT, MAX_POINT, MAX_ITERATIONS,
					function() {
						clear( boxCtx );
					}
				);

			}
			// scale too small
			else {
				elById( 'maximum' ).style.opacity = 1;
				clear( boxCtx );
			}

		}
		// prop of old scale too small
		else {
			clear( boxCtx );
		}

	}

});




function zoomIn() {

	clear( boxCtx );

	var newScale = SCALE * 0.5;

	if ( newScale >= MIN_SCALE ) {

		cancelDraw(function() {

			SCALE = newScale;
			calcBounds();
			draw( MIN_POINT, MAX_POINT, MAX_ITERATIONS );

		})

	}
	// new scale too small
	else {
		elById( 'maximum' ).style.opacity = 1;
	}

}


function zoomOut() {

	clear( boxCtx );

	elById( 'maximum' ).style.opacity = 0;

	cancelDraw(function() {

		SCALE *= 2;
		calcBounds();
		draw( MIN_POINT, MAX_POINT, MAX_ITERATIONS );

	})

}




elById( 'zoom-in' ).addEventListener( 'touchstart', zoomIn, false );
elById( 'zoom-in' ).addEventListener( 'click', zoomIn, false );

elById( 'zoom-out' ).addEventListener( 'touchstart', zoomOut, false );
elById( 'zoom-out' ).addEventListener( 'click', zoomOut, false );


