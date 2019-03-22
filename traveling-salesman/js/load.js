document.addEventListener( 'DOMContentLoaded', function() {

	// populate select presets
	for ( var i = 0; i < PRESETS.length; i++ ) {

		var optionEl = document.createElement( 'option' ),
				presetEl = document.getElementById( 'preset' );

		var t = document.createTextNode( PRESETS[i].name );

		optionEl.value = i;

		optionEl.appendChild( t )
		presetEl.appendChild( optionEl )

	}

	// resize
	resize();

	requestAnimFrame( resize );
	
	if ( DISPLAY_NARROW ) showMenu();

}, false );



/*
TRY TO ABORT CURRENT SOLVE
*/

function abort( callback ) {

	ABORT_CALLBACK = callback;

	if ( RUNNING ) {
		ABORT = true;
	}
	else {
		abortComplete();
	}

}



/*
ABORT OF CURRENT SOLVE COMPLETE
*/

function abortComplete() {

	RUNNING = false;
	ABORT = false;
	if ( typeof ABORT_CALLBACK == 'function' ) ABORT_CALLBACK();

}





/*
setTimeout(function() {
	abort(function() {
		console.log( 'CB' );
	})
}, 5000 );
*/







/*
REVERSE SECTION OF POINTS
*/

function reverse( i1, i2 ) {

	// old distance before switch
	var oldDist = totalDist( POINTS );

	// copy array to make changes to
	var newPoints = POINTS.slice(0);

	// ensure a < b
	var a = Math.min( i1, i2 ),
			b = Math.max( i1, i2 );

	var dif = b - a;

	// splice and reverse selected points
	var spl = newPoints.splice( a, dif );
	spl.reverse();

	// re-insert into newPoints array
	insertArrayAt( newPoints, a, spl );

	// find new distance
	var newDist = totalDist( newPoints );

	// if distance became shorter, apply changes
	if ( newDist < oldDist ) {
		POINTS = newPoints.slice(0);
		return true;
	}

	return false;

}



/*
SOLVE
*/

function solve( callback ) {

	var i1 = 0;
	var i2 = 1;

	var changeMade = false;



	var solveCallback = function() {
		//console.log( 'DONE? changeMade', changeMade );
		if ( changeMade ) {

			try { solve( callback ); }
			catch (e) {
				setTimeout( function() {
					solve( callback )
				}, 0 );
			}

		}
		else {

			drawAll();

			if ( typeof callback === 'function' ) callback();

		}
	}



	var iterate = function() {

		//console.log( 'trying to swap', i1, i2 );

		if ( !(i2 == AMOUNT-1 && i1 == 0) ) {

			var rev = reverse( i1, i2 );
			if ( rev ) {

				changeMade = true;

				// first line index; section line index is i2
				var k1 = mod( i1-1, AMOUNT ),
						k2 = mod( i2-1, AMOUNT );

				var l1 = LINES[k1],
						l2 = LINES[k2];

				l1.to.new = POINTS[i1];
				l2.from.new = POINTS[mod(i2-1,AMOUNT)];

				anim(function( comp ) {

					// comp easing
					comp = EASING.easeInOutQuad( comp );

					if ( comp == 1 ) {
						compileLines();
						drawAll();

						try {
							iterate();
						}
						catch( e ) {
							setTimeout( iterate, 0 );
						}

					}
					else {
						clear( ctx );
						drawGrid();
						drawPath( comp );
						drawPoints();
					}

				}, ANIM_DUR );

			}

		}




		/*
		INCREMENT i1 AND i2
		*/

		var done = false;

		if ( i2 == AMOUNT-1 ) {
			if ( i1 == AMOUNT-2 ) {
				done = true;
			}
			else {
				i1++;
				i2 = i1 + 1;
			}
		}
		else {
			i2++;
		}



		/*
		RECURSIVE
		*/

		// if not testing the last index
		if ( !done && !rev ) {

			// call iterate function
			try { iterate(); }
			// maxiumum stack size exceeded
			catch( e ) { setTimeout( iterate, 0 ); }
			
		}

		if ( done ) {
			solveCallback();
		}



	};

	// HERE
	iterate();

}



/*
GREEDY
*/

function greedy( callback ) {

	var remainingArr = POINTS.slice(),
			pointsArr = [],
			prevPoint = POINTS[0],
			prevInd = 0;

	pointsArr.push( prevPoint );
	remainingArr.splice( 0, 1 );



	var greedyCallback = function() {

		POINTS = pointsArr.slice();
		compileLines();
		drawAll();

		if ( typeof callback === 'function' ) callback();

	}




	var pushLine = function( p1, p2 ) {

		var len = LINES.length;
		if ( len >= 1 ) {
			var prevLine = LINES[len-1];
			prevLine.to.old = prevLine.to.new;
		}

    LINES.push({
      from: {
        old: p1,
        new: p1
      },
      to: {
        old: p1,
        new: p2
      },
    });

	}



	var animLines = function( animCallback ) {

		anim(function( comp ) {

			// comp easing
			comp = EASING.easeInOutQuad( comp );

			clear( ctx );
			drawGrid();
			drawPath( comp );
			drawPoints();

			if ( comp == 1 ) animCallback();

		}, ANIM_DUR );

	}



	var i = 1;

	// find next closest point
	var findNext = function() {

		var bestDist = hypot( prevPoint, remainingArr[0] ),
				bestInd = 0;

		for ( var k = 1; k < remainingArr.length; k++ ) {

			var thisDist = hypot( prevPoint, remainingArr[k] );

			if ( thisDist < bestDist ) {
				bestDist = thisDist;
				bestInd = k;
			}

		}

		var bestPoint = remainingArr[bestInd];

		pointsArr.push( bestPoint );
		remainingArr.splice( bestInd, 1 );
    pushLine( prevPoint, bestPoint );
  	prevPoint = bestPoint;



  	animLines(function() {

			i++;
  		if ( i < AMOUNT ) {
  			findNext();
  		}
  		else {

  			// reconnect back to start
  			pushLine( pointsArr[AMOUNT-1], pointsArr[0] );
  			animLines( greedyCallback );

  		}

  	});

	}
	findNext();

}


