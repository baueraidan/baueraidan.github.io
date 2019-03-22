


/*
COMPILE LINE FROM POINTS ARRAY
*/

function compileLines() {

  LINES = [];

  for ( var i1 = 0; i1 < AMOUNT; i1++ ) {

    var i2 = mod( i1+1, AMOUNT );

    LINES.push({
      from: {
        old: POINTS[i1],
        new: POINTS[i1]
      },
      to: {
        old: POINTS[i2],
        new: POINTS[i2]
      },
    });

  }

}


/*
FIND TOTAL DISTANCE OF POINTS ARRAY
*/

function totalDist( p ) {
  
  var tot = 0;
  
  for ( var i1 = 0; i1 < AMOUNT; i1++ ) {

    var i2 = mod( i1+1, AMOUNT );

    var p1 = p[i1],
        p2 = p[i2];

    tot += hypot( p1, p2 );

  }
  
  return tot;
  
}



/*
GENERATE POINTS RANDOMLY
*/

function generatePoints() {

  POINTS = [];

  for ( var i = 0; i < AMOUNT; i++ ) {
    
    var randX = Math.random(),
        randY = Math.random();
        
    var p = new Point( randX, randY );
        
    // add point to points array
    POINTS.push( p );
    
  }
  //compileLines();

}





function hideMenu() {

  var columnEl = document.getElementById( 'column' );
  columnEl.style.transform = 'translateX( 110% )';

  var overlayEl = document.getElementById( 'overlay' );
  overlayEl.style.backgroundColor = 'rgba( 0, 0, 0, 0.0 )';
  overlayEl.style.pointerEvents = 'none';

  var optionsEl = document.getElementById( 'options' );
  optionsEl.style.transform = 'translateX( 0 )';

}
function showMenu() {

  var columnEl = document.getElementById( 'column' );
  columnEl.style.transform = 'translateX( 0 )';

  if ( DISPLAY_NARROW ) {
    var overlayEl = document.getElementById( 'overlay' );
    overlayEl.style.backgroundColor = 'rgba( 0, 0, 0, 0.7 )';
    overlayEl.style.pointerEvents = 'auto';

  }

  var optionsEl = document.getElementById( 'options' );
  optionsEl.style.transform = 'translateX( 200% )';

}


function showLoading() {

  var loadingEl = document.getElementById( 'loading' );
  loadingEl.style.transform = 'scale( 1 )';

}
function hideLoading() {

  var loadingEl = document.getElementById( 'loading' );
  loadingEl.style.transform = 'scale( 0 )';

}


