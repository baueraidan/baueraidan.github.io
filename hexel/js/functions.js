

/*
FIND DISTANCE IN DIRECTION
*/

function distInDir( idealAng, thisAng, dist ) {

	idealAng = mod( idealAng, TAU );
	thisAng = mod( thisAng, TAU );

	var deltaAng = Math.abs( idealAng - thisAng );
	deltaAng = mod( deltaAng, TAU );

	var finalDist = dist * Math.cos( deltaAng );

	return finalDist;

}



/*
RETURN TILE OBJ AT COORDINATE
*/

function objAtCoord( coord ) {

	for ( var i = 0; i < BOARD.length; i++ ) {

		var b = BOARD[i];

		var thisCoord = b.rendCoord,
				sameCoord = pointsEqual( coord, thisCoord );

		if ( sameCoord ) return b;

	}

	return false;

}



/*
RETURN COLOR AT COORDINATE
*/

function colorAtCoord( coord ) {

	var obj = objAtCoord( coord );

	if ( obj !== false ) return obj.color;

	return false;

}



/*
TEST IF COORDINATE IS IN BOUNDS
*/

function coordInBounds( point ) {

  var coordSum = Math.abs( point.x ) + Math.abs( point.y );

  var c1 = coordSum < DIAM;
  var c2 = Math.abs( point.x ) <= DIM_2;

  return c1 && c2;

}



/*
RETURN RANDOM COORDINATE
*/

function randCoord() {

	var arr = [];
	coordLoop(function( c ) {
		arr.push( c )
	});

	var randInd = Math.floor( Math.random() * arr.length );

	return arr[randInd];

}



/*
COMPILE BORDER COORDINATES
*/

function compileBorderCoords( dir ) {

	var borderCoords = [];

	var cX = INC[dir].x * DIM_2,
			cY = INC[dir].y * DIM_2;

	var cornerCoord = new Point( cX, cY );

	borderCoords.push({
		coord: cornerCoord,
		amount: DIAM
	});

	var d1 = mod( dir + 2, 6 ),
			d2 = mod( dir - 2, 6 );

	var dirs = [ d1, d2 ];

	for ( var k = 0; k < dirs.length; k++ ) {

		var thisDir = dirs[k],
				thisInc = INC[thisDir];

		for ( var i = 1; i <= DIM_2; i++ ) {

			var tX = cornerCoord.x + thisInc.x * i,
					tY = cornerCoord.y + thisInc.y * i;

			borderCoords.push({
				coord: new Point( tX, tY ),
				amount: DIAM - i
			});

		}

	}

	return borderCoords;

}



/*
COMPILE RESULTS
*/

function compileResults( dir ) {

	TO_COMBINE = [];

	var borderCoords = compileBorderCoords( dir );

	var dirInc = INC[dir],
			oppDir = mod( dir + 3, 6 ),
			oppInc = INC[oppDir];

	// loop through each row
	for ( var stripInd = 0; stripInd < borderCoords.length; stripInd++ ) {

		var thisStrip = borderCoords[stripInd];

		var stripAmount = thisStrip.amount,
				stripStart = thisStrip.coord;

		var startCoord = stripStart;

		// row variables
		var rowColor = false,
				rowStart,
				inRow;

		// go down strip
		for ( var i = 0; i < stripAmount; i++ ) {

			var prevCoord = addPoints( stripStart, multPoint( oppInc, i-1 ) ),
					thisCoord = addPoints( stripStart, multPoint( oppInc, i ) ),
					nextCoord = addPoints( stripStart, multPoint( oppInc, i+1 ) );

			var prevColor = colorAtCoord( prevCoord ),
					thisColor = colorAtCoord( thisCoord ),
					nextColor = colorAtCoord( nextCoord );

			// add to current row
			if ( prevColor === thisColor ) {
				inRow++;
			}
			// make a new row
			else {
				rowColor = thisColor;
				rowStart = thisCoord;
				inRow = 1;
			}

			// row is broken
			if ( thisColor !== nextColor && rowColor !== false ) {

				/*
				DECIDE WHETHER CURRENT ROW CAN SHIFT
				*/

				var shiftCoord = addPoints( rowStart, dirInc );

				var shiftInBounds = coordInBounds( shiftCoord ),
						shiftTile = objAtCoord( shiftCoord );

				var canShift = false;

				// shift coordinate is within boundaries
				if ( shiftInBounds ) {

					// shift tile exists
					if ( shiftTile ) {
						var shifting = shiftTile.shifting,
								combining = shiftTile.combining;

						// tile will shift or combine
						canShift = shifting || combining;
					}
					// no tile blocking shift
					else {
						canShift = true;
					}

				}



				/*
				UPDATE BOARD
				*/

				// row is not combining
				if ( inRow < MIN_ROW_SIZE ) {
					for ( var n = 0; n < inRow; n++ ) {

						var tempCoord = addPoints( rowStart, multPoint( oppInc, n ) ),
								tempObj = objAtCoord( tempCoord );

						tempObj.shifting = canShift;
						tempObj.combining = false;

						if ( canShift ) {
							var newCoord = addPoints( tempCoord, dirInc );
							tempObj.destCoord = newCoord;
						}

					}
				}
				// row is combining
				else {

					var combDest = ( canShift ? shiftCoord : rowStart ),
							combCoords = [],
							combColor = rowColor + inRow - MIN_ROW_SIZE + 1;

					for ( var n = 0; n < inRow; n++ ) {

						var tempCoord = addPoints( rowStart, multPoint( oppInc, n ) ),
								tempObj = objAtCoord( tempCoord );

						combCoords.push( tempCoord );

						tempObj.shifting = canShift;
						tempObj.combining = true;
						tempObj.destCoord = combDest;
						tempObj.destColor = combColor;

					}

					// update global to combine array
					TO_COMBINE.push({
						coords: combCoords,
						dest: combDest,
						color: combColor
					});

				}

			}

		}

	}

}



/*
COMPILE CURRENT RESULTS
*/

function compileBoard() {

  // remove combining tiles
  for ( var i = BOARD.length-1; i >= 0; i-- ) {
    var b = BOARD[i];
    if ( b.combining ) {
      BOARD.splice( i, 1 );
    }
  }

  for ( var i = 0; i < TO_COMBINE.length; i++ ) {

    var t = TO_COMBINE[i];

    BOARD.push({
      color: t.color,
      destColor: t.color,
      combining: false,
      shifting: false,
      scale: 1,
      rendCoord: t.dest,
      destCoord: t.dest
    });

    // update best color
    if ( t.color > BEST_COLOR ) BEST_COLOR = t.color;

  }

  for ( var i = 0; i < BOARD.length; i++ ) {
    var b = BOARD[i];
    b.rendCoord = b.destCoord;
    b.color = b.destColor;
  }

  TO_COMBINE = [];

}



/*
LOOP THROUGH COORDINATES AND PASS EACH TO CALLBACK
*/

function coordLoop( callback ) {

  for ( var x = -DIM_2; x <= DIM_2; x++ ) {
    for ( var y = -DIM_1; y <= DIM_1; y++ ) {
      
      var point = new Point( x, y );

      var xEven = mod( x, 2 ) == 0,
          yEven = mod( y, 2 ) == 0;

      var bothEven = xEven && yEven,
          bothOdd = !xEven && !yEven;

      var pointValid = bothEven || bothOdd,
          inBounds = coordInBounds( point );

      if ( pointValid && inBounds ) {

        var point = new Point( x, y );
        callback( point );

      }

    }
  }

}



/*
RESET COMPILED RESULTS IN CASE OF ABORTED SWIPE
*/

function resetResults() {

	// clear to combine array
	TO_COMBINE = [];

	for ( var i = 0; i < BOARD.length; i++ ) {

		var b = BOARD[i];

		b.destColor = b.color;
		b.destCoord = b.rendCoord;
		b.combining = false;
		b.shifting = false;

	}

}



/*
CHECK WHETHER TILES CAN BE COMBINED
*/

function combinationsExist() {

	for ( var dir = 0; dir < 6; dir++ ) {

		compileResults( dir );
		var combAmount = TO_COMBINE.length;
		resetResults();

		// combinations exist in direction dir
		if ( combAmount > 0 ) return true;

	}

	return false;

}



/*
BOARD DESTINATIONS INDICATE A CHANGE
*/

function changeMade() {

	for ( var i = 0; i < BOARD.length; i++ ) {

		var b = BOARD[i];

		var tileMoved = !pointsEqual( b.rendCoord, b.destCoord );
		if ( tileMoved ) return true;

	}

	return false;

}



/*
GAME IS WON
*/

function won() {

	for ( var i = 0; i < BOARD.length; i++ ) {
		var b = BOARD[i];
		if ( b.color >= WINNING_TILE_COLOR ) return true;
	}

	return false;

}



/*
GAME IS LOST
*/

function lost() {
	var canCombine = combinationsExist();
	return !canCombine && BOARD.length == TILE_AMOUNT;
}



/*
PLACE A NEW TILE AND RETURN ITS POSITION
*/

function placeNewTile() {

	while ( true ) {

		var c = randCoord();
		var spaceEmpty = objAtCoord( c ) === false;

		// ensure that new tile location is not taken
		if ( spaceEmpty ) {

			var newObj = {
		    color: 0,
		    destColor: 0,
		    combining: false,
		    shifting: false,
		    scale: 0,
		    rendCoord: c,
		    destCoord: c
		  }

		  // push new tile to board
			BOARD.push(newObj);

			SCORE++;
			if ( SCORE > BEST_SCORE ) BEST_SCORE = SCORE;

			// return coordinate of new tile
			return c;

		}

	}

}



/*
COMPILE BOARD, ANIMATE, AND CHECK FOR WIN
*/

function completeSwipe() {

	/*
	COMPILE ARRAY OF COMBINED POINTS TO POP
	*/

	var toPopCoords = [];
	for ( var i = 0; i < TO_COMBINE.length; i++ ) {
		var t = TO_COMBINE[i];
		toPopCoords.push( t.dest );
	}


	// play sound if combination happened
	if ( TO_COMBINE.length > 0 && !MUTED ) {
		var audio = new Audio( 'audio/blop.mp3' );
		audio.play();
	}



	compileBoard();
	drawBoard(0);

	if ( BOARD.length < TILE_AMOUNT ) {

		var newTileCoord = placeNewTile();

		anim(function( comp ) {

			comp = EASING.easeInOutQuad( comp );

			var newTileObj = objAtCoord( newTileCoord );
			newTileObj.scale = comp;

			for ( var i = 0; i < toPopCoords.length; i++ ) {

				var c = toPopCoords[i],
						toPopObj = objAtCoord( c );

				var offset = (-4*sq(comp-.5)+1) * .3,
						scale = 1 + offset;

				toPopObj.scale = scale;

			}

			drawBoard(0);

			// animation complete
			if ( comp == 1 ) {
				// store states in local storage
				storeCurrent();
			}

		}, END_ANIM_DUR );

	}


	if ( won() ) {
		gameWon();
	}
	else if ( lost() ) {
		gameOver();
	}



}



/*
INITIALIZSE NEW GAME
*/

function initGame() {

	BOARD = [];
	TO_COMBINE = [];
	ALREADY_WON = false;
	SCORE = 0;
	BEST_COLOR = 0;

	// create new tiles
	var newTiles = [];
	for ( var i = 0; i < 2; i++ ) {
		var c = placeNewTile();
		newTiles.push( c );
	}

	SCORE = 0;

	// animate growing
	anim(function( comp ) {

		comp = EASING.easeInOutQuad( comp );

		for ( var i = 0; i < newTiles.length; i++ ) {

			var c = newTiles[i],
					newTileObj = objAtCoord( c );

			newTileObj.scale = comp;

		}

		drawBoard(0);

		if ( comp == 1 ) {
			storeCurrent();
		}

	}, END_ANIM_DUR );

}



/*
ANIMATE AND COMPLETE SWIPE GIVEN DIRECTION
*/

function swipeInDir( dir ) {

	DIR_IS_LOCKED = true;
	LOCKED_DIR = dir;

	compileResults( dir );

	var changeWasMade = changeMade();
	if ( /*!SWIPE_CANCELED &&*/ !ANIMATING && changeWasMade ) {

		anim( function( comp ) {

			comp = EASING.easeInOutQuad( comp );

			drawBoard( comp );

			// done swiping
			if ( comp == 1 ) {
				SWIPING = false;
				DIR_IS_LOCKED = false;
				completeSwipe();
			}

		}, SWIPE_ANIM_DUR );

	}

}



/*
RESTART GAME
*/

function restartGame() {

	hideOverlays();

	var firstColor = BOARD[0].color;
	var maxColor = firstColor;

	for ( var i = 1; i < BOARD.length; i++ ) {
		var thisColor = BOARD[i].color;
		maxColor = Math.max( thisColor, maxColor );
	}

	var totalDur = maxColor * SHRINK_ANIM_OFFSET + SHRINK_ANIM_DUR,
			animProp = SHRINK_ANIM_DUR / totalDur;



	anim(function( comp ) {

		for ( var i = 0; i < BOARD.length; i++ ) {

			var b = BOARD[i];
			var thisColor = b.color;
			var startProp = (thisColor * SHRINK_ANIM_OFFSET) / totalDur;

			var thisComp = (comp - startProp) / animProp;
			thisComp = Math.min( thisComp, 1 );
			thisComp = Math.max( thisComp, 0 );

			var thisScale = 1 - thisComp;

			b.scale = thisScale;

		}

		drawBoard(0);

		// all done animating
		if ( comp == 1 ) {
			BOARD = [];
			drawBoard(0);
			initGame();
		}

	}, totalDur );



}



/*
WIGGLE ELEMENT
*/

function wiggleEl( el ) {

	var wiggles = 5,
			maxAng = 20;

	for ( var i = 0; i <= wiggles; i++ ) {

		var t = (wiggles - i),
				ang = (t/wiggles) * maxAng;

		var mult = ( i % 2 == 0 ? 1 : -1 );
		ang *= mult;

		var dur = i * 150;

		setTimeout(function( ang, el ){
		    return function() {
		    	el.style.transform = 'rotate(' + ang + 'deg)';
		    	el.style.webkitTransform = 'rotate(' + ang + 'deg)';
		    }
		}( ang, el ), dur);

	}

}



/*
LOAD COLOR BLIND ICON
*/

function loadColorBlindIcon() {
	if ( COLOR_BLIND ) {
		elById( 'icon-eye' ).style.display = 'none';
		elById( 'icon-eye-cross' ).style.display = 'block';
	}
	else {
		elById( 'icon-eye' ).style.display = 'block';
		elById( 'icon-eye-cross' ).style.display = 'none';
	}
}



/*
LOAD SOUND ICON
*/

function loadSoundIcon() {
	if ( MUTED ) {
		elById( 'icon-bell' ).style.display = 'none';
		elById( 'icon-bell-cross' ).style.display = 'block';
	}
	else {
		elById( 'icon-bell' ).style.display = 'block';
		elById( 'icon-bell-cross' ).style.display = 'none';
	}
}



/*
TOGGLE COLOR BLIND MODE
*/

function toggleColorBlind() {

	COLOR_BLIND = !COLOR_BLIND;

	// play click sound
	if ( !MUTED ) {
		var audio = new Audio( 'audio/click1.wav' );
		audio.play();
	}

	loadColorBlindIcon();

	var el = elById( 'color-blind' );
	wiggleEl( el );

	storeCurrent();

	drawBoard(0);

}



/*
TOGGLE SOUND
*/

function toggleSound() {

	MUTED = !MUTED;

	// play click sound
	if ( !MUTED ) {
		var audio = new Audio( 'audio/click1.wav' );
		audio.play();
	}

	loadSoundIcon();

	var el = elById( 'sound' );
	wiggleEl( el );

	storeCurrent();

}



/*
REVEAL AN OVERLAY GIVEN ITS ID
*/

function showOverlay( id ) {

	SHOWING_OVERLAY = true;

	var el = elById( id );

	el.style.transition = '1500ms';
	el.style.webkitTransition = '1500ms';
	elById( 'canvas' ).style.transition = 'filter 1500ms';
	elById( 'canvas' ).style.webkitTransition = 'filter 1500ms';

	// blur canvas
	elById( 'canvas' ).style.filter = 'blur(8px)';
	elById( 'canvas' ).style.webkitFilter = 'blur(8px)';

	// show game-over overlay
	el.style.top = '0';
	el.style.opacity = '1';
	el.style.zIndex = '2';

}



/*
HIDE AN OVERLAY
*/

function hideOverlays() {

	SHOWING_OVERLAY = false;

	var els = elsByClass( 'overlay' );
  for ( var i = 0; i < els.length; i++ ) {
  	var el = els[i];
  	el.style.transition = '500ms';
  	el.style.webkitTransition = '500ms';
  	el.style.top = '-15%';
  	el.style.opacity = '0';
  	el.style.zIndex = '-1';
  }

	// un-blur canvas
	elById( 'canvas' ).style.transition = 'filter 500ms';
	elById( 'canvas' ).style.webkitTransition = 'filter 500ms';
	elById( 'canvas' ).style.filter = 'blur(0px)';
	elById( 'canvas' ).style.webkitFilter = 'blur(0px)';

}



/*
GAME OVER, UPDATE AND SHOW OVELAY
*/

function gameOver() {

	// decide upon exclaimation
	var exclaimation;
	for ( var i = SCORE_EXCLAIMATIONS.length-1; i >= 0; i-- ) {
		var t = SCORE_EXCLAIMATIONS[i];
		if ( SCORE >= t.min ) {
			exclaimation = t.str;
			break;
		}
	}

	// compile subtitle
	var s1 = exclaimation,
			s2 = 'You made it to the ' + COLOR_STRINGS[ BEST_COLOR ] + ' dot',
			s3 = 'with a score of ' + addCommas( SCORE ) + '!';

	var subtitleStr = s1 + ' ' + s2 + ' ' + s3;

	elById( 'game-over-subtitle' ).innerHTML = subtitleStr;

	// show overlay
	showOverlay( 'game-over' );

}



/*
ENSURE THAT USER INTENDED TO CLICK RESTART BUTTON
*/

function confirmRestart() {

	// play click sound
	if ( !MUTED ) {
		var audio = new Audio( 'audio/click1.wav' );
		audio.play();
	}

	// rotate button
	RESTART_BUTTON_ROT += 360;
	elById( 'restart' ).style.transform = 'rotate(' + RESTART_BUTTON_ROT + 'deg)';
	elById( 'restart' ).style.webkitTransform = 'rotate(' + RESTART_BUTTON_ROT + 'deg)';

	// if overlay is showing, restart without confirming
	if ( SHOWING_OVERLAY ) {
		hideOverlays();
		restartGame();
	}
	else {
		showOverlay( 'confirm-restart' );
	}

}



/*
SHOW OVERLAY, UPDATE ALREADY_WON
*/

function gameWon() {

	if ( !ALREADY_WON ) {
		showOverlay( 'game-won' );
	}

	ALREADY_WON = true;
	
	storeCurrent();

}


