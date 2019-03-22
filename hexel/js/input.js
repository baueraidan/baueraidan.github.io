
function bindEvents() {

/*
TOUCHSTART
*/

touchstart( function( point, am, cancel ) {

	// make animation durations longer
	END_ANIM_DUR = MAX_END_ANIM_DUR,
	SWIPE_ANIM_DUR = MAX_SWIPE_ANIM_DUR,
	SHRINK_ANIM_DUR = MAX_SHRINK_ANIM_DUR,
	SHRINK_ANIM_OFFSET = MAX_SHRINK_ANIM_OFFSET;

	// ensure swiping with 1 finger
	if ( am === 1 && cancel === false ) {
		// cancel swipe if animating
		if ( ANIMATING || SHOWING_OVERLAY ) {
			SWIPE_CANCELED = true;
		}
		// not animating
		else {
			SWIPING = true;
			SWIPE_COMP = 0;
			STARTING_POINT = point;
		}
	}
	else {
		SWIPE_CANCELED = true;
		var changeWasMade = changeMade();
		if ( changeWasMade ) finishSwipe();
	}

});



/*
TOUCHMOVE
*/

touchmove( function( point, amount ) {

	// ensure that swipe was not canceled on touchstart due to animation
	if ( !SWIPE_CANCELED ) {

		/*
		FIND SWIPE DIRECTION AND COMPLETION
		*/

		var deltaX = point.x - STARTING_POINT.x,
				deltaY = point.y - STARTING_POINT.y;

		var swipeAng = Math.atan2( deltaY, deltaX );
		swipeAng = mod( swipeAng, TAU );

		var swipeDist = hypot( STARTING_POINT, point );

		var startingAng = -TAU / 4,
				deltaAng = TAU / 6;

		var bestInd;
		var bestAng;

		// direction is already locked
		if ( DIR_IS_LOCKED ) {

			bestInd = LOCKED_DIR;
			bestAng = startingAng + deltaAng * LOCKED_DIR;



			var swipeThresh = SWIPE_THRESHOLD_PROP * SPACING;
			var rendDist = distInDir( bestAng, swipeAng, swipeDist );
			rendDist = ( rendDist - swipeThresh ) / SPACING;
			rendDist = Math.max( rendDist, 0 );
			var comp = Math.min( rendDist, 1 );

			SWIPE_COMP = comp;

			drawBoard( comp );



		}
		// find best swipe direction
		else {

			SWIPE_COMP = 0;

			var bestDelta = deltaAng;

			for ( var i = 0; i < 6; i++ ) {

				var centerAng = startingAng + deltaAng * i;
				centerAng = mod( centerAng, TAU );

				var thisDelta = Math.abs( swipeAng - centerAng );

				if ( thisDelta < bestDelta ) {
					bestDelta = thisDelta;
					bestInd = i;
					bestAng = centerAng;
				}

			}

			var rendDist = distInDir( bestAng, swipeAng, swipeDist );
			rendDist = Math.max( rendDist, 0 );

			var swipeThresh = SWIPE_THRESHOLD_PROP * SPACING;

			// if direction should be locked
			if ( rendDist > swipeThresh ) {

				// lock direction
				DIR_IS_LOCKED = true;
				LOCKED_DIR = bestInd;

				/*
				DIRECTION DECIDED, COMPILE RESULTS
				*/

				compileResults( bestInd );

			}

		}

	}

});



/*
COMPLETE AN UNFINISHED SWIPE
*/

function finishSwipe() {

		var destComp;
		var startComp = SWIPE_COMP;

		if ( SWIPE_COMP < SWIPE_COMP_THRESHOLD ) destComp = 0;
		else destComp = 1;

		var deltComp = destComp - startComp;

		anim(function( comp ) {

			comp = EASING.easeInOutQuad( comp );
			var boardComp = startComp + deltComp * comp;

			drawBoard( boardComp );

			// done swiping
			if ( comp == 1 ) {
				// completing swipe
				if ( destComp == 1 ) {
					completeSwipe();
				}
				// undoing swipe
				else if ( destComp == 0 ) {
					resetResults();
				}
			}

		}, SWIPE_ANIM_DUR * deltComp );

}



/*
TOUCHEND
*/

touchend( function( am ) {

	// ensure all fingers are off screen
	if ( am === 0 ) {

		SWIPING = false;
		DIR_IS_LOCKED = false;

		var changeWasMade = changeMade();

		// only deal with swipe ending if swipe was not canceled and resulted in change
		if ( !SWIPE_CANCELED && changeWasMade ) {
			finishSwipe();
		}

		// reset swipe canceled boolean
		SWIPE_CANCELED = false;

	}

});



/*
KEYPRESS
*/

document.addEventListener('keypress',function(e) {

	// make animation durations shorter
	END_ANIM_DUR = MIN_END_ANIM_DUR,
	SWIPE_ANIM_DUR = MIN_SWIPE_ANIM_DUR,
	SHRINK_ANIM_DUR = MIN_SHRINK_ANIM_DUR,
	SHRINK_ANIM_OFFSET = MIN_SHRINK_ANIM_OFFSET;

	if ( !ANIMATING && !SWIPING && !SWIPE_CANCELED ) {

		var key = e.keyCode || e.which;

		var dir = false;

		switch( key ) {
			case 119:
			case 87:
				dir = 0;
				break;
			case 101:
			case 69:
				dir = 1;
				break;
			case 100:
			case 68:
				dir = 2;
				break;
			case 115:
			case 83:
				dir = 3;
				break;
			case 97:
			case 65:
				dir = 4;
				break;
			case 113:
			case 81:
				dir = 5;
				break;
		}

		if ( dir !== false ) swipeInDir( dir );

	}

});



/*
BUTTONS
*/

// confirm restart when restart button is clicked
elById( 'restart' ).addEventListener( 'click', confirmRestart );
elById( 'restart' ).addEventListener( 'touchstart', confirmRestart );

// restart game over loss
elById( 'game-over-restart' ).addEventListener( 'click', restartGame );
elById( 'game-over-restart' ).addEventListener( 'touchstart', restartGame );

// toggle color blindness
elById( 'color-blind' ).addEventListener( 'click', toggleColorBlind );
elById( 'color-blind' ).addEventListener( 'touchstart', toggleColorBlind );

// toggle sound
elById( 'sound' ).addEventListener( 'click', toggleSound );
elById( 'sound' ).addEventListener( 'touchstart', toggleSound );

// confirm restart
elById( 'confirm-restart-restart' ).addEventListener( 'click', restartGame );
elById( 'confirm-restart-restart' ).addEventListener( 'touchstart', restartGame );

// cancel restart
elById( 'confirm-restart-cancel' ).addEventListener( 'click', hideOverlays );
elById( 'confirm-restart-cancel' ).addEventListener( 'touchstart', hideOverlays );

// continue after winning
elById( 'game-won-continue' ).addEventListener( 'click', hideOverlays );
elById( 'game-won-continue' ).addEventListener( 'touchstart', hideOverlays );

// restart after winning
elById( 'game-won-restart' ).addEventListener( 'click', restartGame );
elById( 'game-won-restart' ).addEventListener( 'touchstart', restartGame );

// play after reading how to play
elById( 'how-to-play-play' ).addEventListener( 'click', hideOverlays );
elById( 'how-to-play-play' ).addEventListener( 'touchstart', hideOverlays );

}

