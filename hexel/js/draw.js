




function drawScores() {

	var pix1 = coordToPix( new Point( -2, -4 ) ),
			pix2 = coordToPix( new Point( 2, -4 ) );

	var offsetY = SPACING * SCORE_OFFSET_PROP;

	var labelY = SPACING * SCORE_LABEL_OFFSET_PROP;

	var numberSize = SPACING * SCORE_NUMBER_PROP; // 32
	var labelSize = SPACING * SCORE_LABEL_PROP;

	// SCORE_NUMBER_PROP
	// SCORE_LABEL_PROP

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	// current score
	ctx.font = numberSize + 'px Open Sans';
	ctx.fillStyle = '#bdc3c7';
	ctx.fillText( SCORE, pix1.x, pix1.y-offsetY );

	ctx.font = labelSize + 'px Open Sans';
	ctx.fillStyle = '#bdc3c7';
	ctx.fillText( 'SCORE', pix1.x, pix1.y-offsetY-labelY );

	// best score
	ctx.font = numberSize + 'px Open Sans';
	ctx.fillStyle = '#bdc3c7';
	ctx.fillText( BEST_SCORE, pix2.x, pix2.y-offsetY );

	ctx.font = labelSize + 'px Open Sans';
	ctx.fillStyle = '#bdc3c7';
	ctx.fillText( 'BEST', pix2.x, pix2.y-offsetY-labelY );

}






/*
DRAW CONNECTION
*/

function drawConnection( p1, p2, opacity, color ) {

  var pix1 = coordToPix( p1 ),
  		pix2 = coordToPix( p2 );

  ctx.globalAlpha = opacity;
  //ctx.strokeStyle = tripleToString( color );
  ctx.strokeStyle = '#ececec';
  ctx.lineCap = 'round';
  ctx.lineWidth = SPACING * LINE_WIDTH_PROP;

  ctx.beginPath();
  ctx.moveTo( pix1.x, pix1.y );
  ctx.lineTo( pix2.x, pix2.y );
  ctx.stroke();

  ctx.globalAlpha = 1;

}



/*
DRAW CONNECTIONS
*/

function drawConnections( sortedArr ) {

	for ( var i = 0; i < sortedArr.length; i++ ) {

		var thisSorted = sortedArr[i];

		var sortedColor = thisSorted.color,
				sortedCoords = thisSorted.coords;

		for ( var a = 0; a < sortedCoords.length-1; a++ ) {
			for ( var b = a+1; b < sortedCoords.length; b++ ) {

				var t1 = sortedCoords[a],
						t2 = sortedCoords[b];

				var p1 = t1.coord,
						p2 = t2.coord;

			  var x1 = p1.x * Math.sqrt( .75 ),
			      y1 = p1.y * .5;

			  var x2 = p2.x * Math.sqrt( .75 ),
			      y2 = p2.y * .5;

			  var c1 = new Point( x1, y1 ),
			  		c2 = new Point( x2, y2 );

			  var dist = hypot( c1, c2 );

			  var minDist = 1,
			  		maxDist = 1.3;//Math.sqrt( 2 );//1.1; //Math.sqrt( 3 );

			  // distance
			  var distProp = 1 - (dist-minDist) / (maxDist-minDist);
			  distProp = Math.min( distProp, 1 );
			  distProp = Math.max( distProp, 0 );

				var scale1 = t1.scale,
						scale2 = t2.scale;

				var minScale = Math.min( scale1, scale2 );

				var opacityMult = ( COLOR_BLIND ? 1 : .5 ); 

			  var opacity = distProp * opacityMult * minScale;

			  drawConnection( p1, p2, opacity, sortedColor );

			}
		}

	}

}



/*
DRAW SPACE
*/

function drawSpace( point, radProp ) {

  var p = coordToPix( point )

  var rad = SPACING * radProp;

  ctx.fillStyle = '#ececec';
  ctx.beginPath();
  ctx.arc( p.x, p.y, rad, 0, TAU );
  ctx.fill();

}



/*
DRAW SPACES
*/

function drawSpaces( comp ) {

	coordLoop(function( c ) {

		var isDest = false,
				isRend = false;

		var obj = objAtCoord( c );
		var scale = false;
		if ( obj !== false ) {
			scale = obj.scale;
		}

		for ( var i = 0; i < BOARD.length; i++ ) {

			var b = BOARD[i];

			var dest = b.destCoord,
					rend = b.rendCoord;

			if ( pointsEqual( dest, c ) ) isDest = true;
			if ( pointsEqual( rend, c ) ) isRend = true;

		}

		var starting,
				ending;

		if ( isRend ) starting = SPACE_MAX_RAD_PROP;
		else starting = SPACE_MIN_RAD_PROP;

		if ( isDest ) ending = SPACE_MAX_RAD_PROP;
		else ending = SPACE_MIN_RAD_PROP;

		var delt = ending - starting,
				radProp = starting + delt * comp;

		// if scale exists, scale space accordinly
		if ( scale !== false ) {
			var deltScale = radProp - SPACE_MIN_RAD_PROP;
			radProp = SPACE_MIN_RAD_PROP + deltScale * scale;
		}

		drawSpace( c, radProp )

	});

}



/*
DRAW SHADOW
*/

function drawShadow( point, scale ) {

	var p = coordToPix( point );

  ctx.save();

  ctx.fillStyle = 'lightgray';
  ctx.shadowColor = 'lightgray';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 2;

  var rad = SPACING * TILE_RAD_PROP * scale;

  ctx.beginPath();
  ctx.arc( p.x, p.y, rad, 0, TAU );
  ctx.fill();

  ctx.restore();

}



/*
DRAW SHADOWS
*/

function drawShadows( drawArr, scale ) {

	for ( var i = 0; i < drawArr.length; i++ ) {
		var d = drawArr[i];
		drawShadow( d.coord, d.scale );
	}

}



/*
DRAW LOWER TILE
*/

function drawLowerTile( point, color, scale, rendColor, destColor, comp, combining ) {

	var p = coordToPix( point );

	var c = tripleToString( color );
  ctx.fillStyle = c;

  var rad = SPACING * TILE_RAD_PROP * scale;

  var offset = SPACING * TILE_DEPTH_PROP * scale;

  ctx.beginPath();
  ctx.arc( p.x, p.y, rad, 0, TAU );
  ctx.fill();

  var rX = p.x - rad,
  		rY = p.y - offset;

  ctx.beginPath();
  ctx.rect( rX, rY, rad*2, offset );
  ctx.fill();

}



/*
DRAW LOWER TILES
*/

function drawLowerTiles( drawArr ) {
	for ( var i = 0; i < drawArr.length; i++ ) {
		var d = drawArr[i];
		drawLowerTile( d.coord, d.color.secondary, d.scale, d.rendColor, d.destColor, d.comp, d.combining );
	}
}



/*
DRAW UPPER TILE
*/

function drawUpperTile( point, color, scale, rendColor, destColor, comp, combining ) {

	var p = coordToPix( point );

	var c = tripleToString( color );

  var rad = SPACING * TILE_RAD_PROP * scale;

	ctx.fillStyle = c;

  var rad = SPACING * TILE_RAD_PROP * scale,
  		offset = SPACING * TILE_DEPTH_PROP * scale;

  ctx.beginPath();
  ctx.arc( p.x, p.y - offset, rad, 0, TAU );
  ctx.fill();

  if ( COLOR_BLIND ) {

  	var fontSize = SPACING * TILE_LABEL_PROP * scale;

  	ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
	  ctx.fillStyle = '#fff';
	  ctx.font = fontSize + 'px Open Sans';

	  // fade between labels
	  if ( combining ) {

		  var o1 = ( comp < .5 ? 1 - comp * 2 : 0 ),
		  		o2 = ( comp > .5 ? comp * 2 - 1 : 0 );

		  ctx.globalAlpha = o1;
		  ctx.fillText( rendColor+1, p.x, p.y - offset );

		  ctx.globalAlpha = o2;
		  ctx.fillText( destColor+1, p.x, p.y - offset );

	  	ctx.globalAlpha = 1;

	  }
	  // opacity 1 label
	  else {

	  	ctx.globalAlpha = 1;
	  	ctx.fillText( rendColor+1, p.x, p.y - offset );

	  }

  }

}



/*
DRAW UPPER TILES
*/

function drawUpperTiles( drawArr ) {
	for ( var i = 0; i < drawArr.length; i++ ) {
		var d = drawArr[i];
		drawUpperTile( d.coord, d.color.primary, d.scale, d.rendColor, d.destColor, d.comp, d.combining );
	}
}



/*
CLEAR CANVAS
*/

function clear() {

	ctx.save();
	ctx.setTransform( 1, 0, 0, 1, 0, 0 );
	ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
	ctx.restore();

}



/*
DRAW ENTIRE BOARD GIVEN COMPLETION
*/

function drawBoard( comp ) {

/*
	var ang = TAU / 4 + (TAU / 6) * LOCKED_DIR + TAU/2,
			rad = comp * 10;

	var x = Math.cos( ang ) * rad,
			y = Math.sin( ang ) * rad;

	ctx.save();
	ctx.translate( x, y );
	ctx.restore();
*/





	var startTime = new Date().getTime();



	/*
	COMPILE DRAW ARRAY
	*/

	var drawArr = [];

	for ( var i = 0; i < BOARD.length; i++ ) {

	  var b = BOARD[i];

	  var rendCoord = b.rendCoord,
	  		destCoord = b.destCoord;

	  var drawCoord = between( rendCoord, destCoord, comp );
	  
	  var color = b.color,
	  		destColor = b.destColor,
	  		scale = b.scale;

	  var drawColor;

	  var deltColor = destColor - color;

	  var fadePos = deltColor * comp;

	  var lowerColor = Math.floor( fadePos ) + color,
	  		higherColor = Math.ceil( fadePos ) + color,
	  		fadeComp = mod( fadePos, 1 );

	  lowerColor = Math.min( lowerColor, MAX_TILE_COLOR );
	  higherColor = Math.min( higherColor, MAX_TILE_COLOR );

	 	var lowerPrimary = COLORS[lowerColor].primary,
	 			higherPrimary = COLORS[higherColor].primary;

	 	var lowerSecondary = COLORS[lowerColor].secondary,
	 			higherSecondary = COLORS[higherColor].secondary;

	  var primary = betweenTriples( lowerPrimary, higherPrimary, fadeComp ),
	  		secondary = betweenTriples( lowerSecondary, higherSecondary, fadeComp );

	  drawArr.push({
	  	coord: drawCoord,
	  	rendColor: color,
	  	destColor: destColor,
	  	color: {
	  		primary: primary,
	  		secondary: secondary
	  	},
	  	scale: scale,
	  	comp: comp,
	  	combining: b.combining
	  });

	}



	/*
	SORT DRAW ARRAY BY COLOR
	*/

	var sortedArr = [];

	// loop through all points in draw array
	for ( var i = 0; i < drawArr.length; i++ ) {

		var thisObj = drawArr[i];

		var thisColor = thisObj.rendColor,
				thisCoord = thisObj.coord,
				thisScale = thisObj.scale;

		var found = false;

		// loop through all colors already found and sorted
		for ( var k = 0; k < sortedArr.length; k++ ) {

			var thisSorted = sortedArr[k];

			var sortedColor = thisSorted.color,
					sortedCoords = thisSorted.coords;

			if ( sortedColor == thisColor ) {
				found = true;
				sortedCoords.push({
					coord: thisCoord,
					scale: thisScale
				});
			}

		}

		// if this color was not found, create new color object
		if ( !found ) {
			sortedArr.push({
				color: thisColor,
				coords: [
					{
						coord: thisCoord,
						scale: thisScale
					}
				]
			});
		}

	}












	/*
	DRAW EVERYTHING
	*/

	clear();
	drawSpaces( comp );
	drawConnections( sortedArr );
	drawShadows( drawArr );
	drawLowerTiles( drawArr );
	drawUpperTiles( drawArr );

	drawScores();





	var endTime = new Date().getTime();
	//console.log( 'took', endTime - startTime );

}


