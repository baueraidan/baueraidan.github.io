


/*
MOD
*/

function mod( n, m ) {
  return ((n % m) + m) % m;
}



/*
POINT
*/

function Point( x, y ) {
  this.x = x;
  this.y = y;
}



/*
ADD POINTS
*/

function addPoints( p1, p2 ) {

  return new Point( p1.x + p2.x, p1.y + p2.y );

}



/*
MULTIPLY POINT BY CONSTANT
*/

function multPoint( point, constant ) {

  var x = point.x,
      y = point.y;
      
  var newX = x * constant,
      newY = y * constant;
      
  return new Point( newX, newY );

}



/*
BETWEEN TWO POINTS
*/

function between( p1, p2, comp ) {

  var change = new Point( p2.x - p1.x, p2.y - p1.y );
  
  var point = new Point();
  point.x = p1.x + change.x * comp;
  point.y = p1.y + change.y * comp;
  
  return point;

}



/*
SQUARE NUMBER
*/

function sq( num ) {
  return num * num;
}



/*
DISTANCE BETWEEN POINTS
*/

function hypot( p1, p2 ) {

  return Math.sqrt( sq( p1.x - p2.x ) + sq( p1.y - p2.y ) );

}



/*
TEST IF POINTS ARE EQUAL
*/

function pointsEqual( p1, p2 ) {
  return p1.x == p2.x && p1.y == p2.y;
}



/*
GET ELEMENT BY ID
*/

function elById( id ) {
  return document.getElementById( id );
}



/*
GET ELEMENTS BY CLASS
*/

function elsByClass( id ) {
  return document.getElementsByClassName( id );
}



/*
CONVERT DEGS TO RADS
*/

function toRads( degs ) {
  return ( degs / 180 ) * Math.PI;
}



/*
CONVERT DEGS TO RADS
*/

function toDegs( rads ) {
  return ( rads / Math.PI ) * 180;
}



/*
GET ARRAY VALUE AT INDEX
*/

function arrAtIndex( arr, index ) {

  var len = arr.length,
      m = mod( index, len );

  return arr[m];

}



/*
COORDINATE TO PIXEL
*/

function coordToPix( p ) {

  var xOff = W * .5,
      yOff = H * .5;

  var xC = Math.sqrt( .75 ) * SPACING,
      yC = .5 * SPACING;

  var x = p.x * xC + xOff,
      y = p.y * yC + yOff;

  return new Point( x, y );

}



/*
PIXEL TO COORDINATE
*/

function pixToCoord( p ) {

  var xOff = W * .5,
      yOff = H * .5;

  var xC = Math.sqrt( .75 ) * SPACING,
      yC = .5 * SPACING;

  var x = (p.x - xOff) / SPACING,
      y = (p.y - yOff) / SPACING;

  return new Point( x, y );

}



/*
RGB TRIPLE CONSTRUCTOR
*/

function Triple( r, g, b ) {
  this.r = r;
  this.g = g;
  this.b = b;
}



/*
FIND COLOR BETWEEN TWO RGB TRIPLES
*/

function betweenTriples( c1, c2, comp ) {

  var deltR = c2.r - c1.r,
      deltG = c2.g - c1.g,
      deltB = c2.b - c1.b;

  var r = Math.round( c1.r + deltR * comp ),
      g = Math.round( c1.g + deltG * comp ),
      b = Math.round( c1.b + deltB * comp );

  return new Triple( r, g, b );

}



/*
TURN RGB OBJECT INTO STRING
*/

function tripleToString( c ) {
  return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
}



/*
ADD COMMAS TO NUMBER
*/

function addCommas( num ) {
  return num.toLocaleString();
}


