


// point object
function Point( x, y ) {
  this.x = x;
  this.y = y;
}

// mod function
function mod( n, m ) {
  return ((n % m) + m) % m;
}

// square number
function sq( num ) {
  return num * num;
}

// distance formula
function hypot( p1, p2 ) {
  return Math.sqrt( sq( p1.x - p2.x ) + sq( p1.y - p2.y ) );
}

// check if points are equal
function pointsEqual( p1, p2 ) {
	return p1.x == p2.x && p1.y == p2.y;
}

// add commas to number
function addCommas( x ) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// insert array into array at index
function insertArrayAt( array, index, arrayToInsert ) {
	Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
}

// shuffle array
function shuffle( arr ) {

  var currentInd = arr.length,
  		temporaryVal, randomInd;

  while ( currentInd !== 0 ) {

    randomInd = Math.floor( Math.random() * currentInd );
    currentInd--;

    temporaryVal = arr[currentInd];
    arr[currentInd] = arr[randomInd];
    arr[randomInd] = temporaryVal;

  }

  return arr;

}

// convert coordinate to pixel
function toPix( point ) {

  var nX = point.x * (DIM - 2*PAD) + PAD,
      nY = point.y * (DIM - 2*PAD) + PAD;

  nX += CANVAS_W / 2;
  nY += CANVAS_H / 2;

  nX -= DIM/2;
  nY -= DIM/2;

  return new Point( nX, nY );

}

// request animation frame with callback
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function( callback ){
           window.setTimeout( callback, 13 );
         };
})();


