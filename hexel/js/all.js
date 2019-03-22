//storage.js



/*
CLEAR LOCAL STORAGE
*/

function clearStorage() {
    if ( STORAGE_EXISTS ) {
        localStorage.clear();
    }
}



/*
TEST WHETHER VALUES HAVE BEEN STORED BEFORE
*/

function storedValuesExist() {

    if ( STORAGE_EXISTS ) {

        var storedValues = [ 'board', 'score', 'best_score', 'best_color', 'already_won', 'color_blind', 'muted' ];
        for ( var i = 0; i < storedValues.length; i++ ) {
            var s = storedValues[i];
            var thisValue = localStorage[s];
            if ( typeof thisValue === 'undefined' || thisValue === null ) return false;
        }

        return true;

    }

    return false;

}



/*
STORE CURRENT VALUES
*/

function storeCurrent() {
    if ( STORAGE_EXISTS ) {
        localStorage['board'] = JSON.stringify( BOARD );
        localStorage['score'] = SCORE;
        localStorage['best_score'] = BEST_SCORE;
        localStorage['best_color'] = BEST_COLOR;
        localStorage['already_won'] = ALREADY_WON;
        localStorage['color_blind'] = COLOR_BLIND;
        localStorage['muted'] = MUTED;
    }
}



/*
LOAD STORED VERSION
*/

function loadStored() {
    if ( STORAGE_EXISTS ) {
        BOARD = JSON.parse( localStorage['board'] );
        SCORE = parseInt( localStorage['score'] );
        BEST_SCORE = parseInt( localStorage['best_score'] );
        BEST_COLOR = parseInt( localStorage['best_color'] );
        ALREADY_WON = parseInt( localStorage['already_won'] );
        COLOR_BLIND = JSON.parse( localStorage['color_blind'] );
        MUTED = JSON.parse( localStorage['muted'] );
    }
}



//easing.js
/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var EASING = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}
//canvas.js



/*
CREATE CANVAS
*/

function createCanvas( w, h, ratio ) {

  if (!ratio) {
    ratio = PIXEL_RATIO;
    }

  var can = document.createElement( 'canvas' );

  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + 'px';
  can.style.height = h + 'px';
  can.getContext( '2d' ).setTransform( ratio, 0, 0, ratio, 0, 0 );

  return can;

}



/*
RESIZE CANVAS
*/

function resizeCanvas( canvas, w, h, ratio ) {

  if (!ratio) {
    ratio = PIXEL_RATIO;
    }

  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.getContext( '2d' ).setTransform( ratio, 0, 0, ratio, 0, 0 );

}



//anim.js



/*
REQUESTING ANIMATION FRAMES
*/

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function( callback ){
           window.setTimeout( callback, 13 );
         };
})();



/*
ANIMATION FUNCTION
*/

function anim( callback, duration ) {

  ANIMATING = true;

  var start = new Date().getTime();
  (function animLoop(){

    var cur = new Date().getTime(),
        change = cur - start,
        comp = change / duration;

    if ( change < duration ) {
      requestAnimFrame( animLoop );
    }
    else {
      ANIMATING = false;
      comp = 1;
    }

    callback( comp );

  })();

}



//essential.js



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



//functions.js



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
    elById( 'canvas' ).style.webkitfFilter = 'blur(0px)';

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



//global.js



/*
GLOBAL
*/

var SWIPE_CANCELED = false;

var SHOWING_OVERLAY = false;

var SWIPING = false;
var STARTING_POINT;

var DIR_IS_LOCKED = false;
var LOCKED_DIR;

var SWIPE_COMP,
    SWIPE_COMP_THRESHOLD = .30;

var MIN_ROW_SIZE = 3;

var WINNING_TILE_COLOR = 6;

var TO_COMBINE = [];

// rotation of restart button element
var RESTART_BUTTON_ROT = 0;



/*
LOCAL STORAGE
*/

var STORAGE_EXISTS = typeof(Storage) !== 'undefined';



/*
VARIABLES TO BE SAVED BETWEEN SESSIONS
*/

var BOARD = [];

var COLOR_BLIND = false;

var MUTED = false;

var SCORE = 0,
    BEST_SCORE = 0;

var BEST_COLOR = 0;

var ALREADY_WON = false;



/*
DIMENSIONS
*/

var W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var BOARD_W,
    BOARD_H;

var SPACING = 74;

    // connections
var LINE_WIDTH_PROP = .24,
    // tiles
    TILE_RAD_PROP = .30,
    TILE_DEPTH_PROP = .06,
    TILE_LABEL_PROP = .25,
    // spaces
    SPACE_MIN_RAD_PROP = .30,
    SPACE_MAX_RAD_PROP = .36,
    // swiping
    SWIPE_THRESHOLD_PROP = .25,
    // scores
    SCORE_OFFSET_PROP = .38,
    SCORE_NUMBER_PROP = .40,
    SCORE_LABEL_PROP = .13,
    SCORE_LABEL_OFFSET_PROP = .29;

var W_PADDING = .05,
    H_PADDING = .14;



/*
ANIMATIONS
*/

var ANIMATING = false;

var END_ANIM_DUR = 100,
    SWIPE_ANIM_DUR = 120,
    SHRINK_ANIM_DUR = 120,
    SHRINK_ANIM_OFFSET = 120;

var MIN_END_ANIM_DUR = 100,
    MIN_SWIPE_ANIM_DUR = 120,
    MIN_SHRINK_ANIM_DUR = 120,
    MIN_SHRINK_ANIM_OFFSET = 120;

var MAX_END_ANIM_DUR = 120,
    MAX_SWIPE_ANIM_DUR = 150,
    MAX_SHRINK_ANIM_DUR = 120,
    MAX_SHRINK_ANIM_OFFSET = 120;



/*
DIMENSION CONSTANTS
*/

var DIAM = 5;

var DIM_1 = DIAM - 1,
    DIM_2 = DIM_1 / 2;



/*
AMOUNT OF TILES
*/

var TILE_AMOUNT = .75 * sq(DIAM) + .25;




/*
TOUCH
*/

var MOUSE_DOWN = false;



/*
COLOR
*/

var SCORE_EXCLAIMATIONS = [
  {
    str: 'You\'re getting it!',
    min: 0
  },
  {
    str: 'Keep it up!',
    min: 50
  },
  {
    str: 'Not bad!',
    min: 100
  },
  {
    str: 'Way to go!',
    min: 150
  },
  {
    str: 'Great!',
    min: 200
  },
  {
    str: 'Super!',
    min: 250
  },
  {
    str: 'Fabulous!',
    min: 300
  },
  {
    str: 'Amazing!',
    min: 350
  },
  {
    str: 'Awesome!',
    min: 400
  },
  {
    str: 'Fantastic!',
    min: 450
  },
  {
    str: 'Incredible!',
    min: 500
  },
  {
    str: 'Simple outrageous.',
    min: 1000
  }
]

var COLOR_STRINGS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'black',
  'white'
];

var COLORS = [
  // red
  {
    primary: new Triple(231, 76, 60),
    secondary: new Triple(192, 57, 43)
  },
  // orange
  {
    primary: new Triple(236,136,38),
    secondary: new Triple(218,107,31)
  },
  // yellow
  {
    primary: new Triple(241, 196, 15),
    secondary: new Triple(243, 156, 18)
  },
  // green
  {
    primary: new Triple(46, 204, 113),
    secondary: new Triple(39, 174, 96)
  },
  // blue
  {
    primary: new Triple(52, 152, 219),
    secondary: new Triple(41, 128, 185)
  },
  // purple
  {
    primary: new Triple(155, 89, 182),
    secondary: new Triple(142, 68, 173)
  },
  // black
  {
    primary: new Triple(52, 73, 94),
    secondary: new Triple(44, 62, 80)
  },
  // white
  {
    primary: new Triple(236, 240, 241),
    secondary: new Triple(189, 195, 199)
  }
];



/*
CONSTANTS
*/

var TAU = Math.PI * 2;

var INC = [
  new Point( 0, -2 ),
  new Point( 1, -1 ),
  new Point( 1, 1 ),
  new Point( 0, 2 ),
  new Point( -1, 1 ),
  new Point( -1, -1 )
];



/*
CANVAS
*/

var PIXEL_RATIO = (function () {
    var ctx = document.createElement( 'canvas' ).getContext( '2d' ),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();



var CANVAS = createCanvas( W, H ),
    ctx = CANVAS.getContext( '2d' );

CANVAS.id = 'canvas';





//draw.js





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

  ctx.beginPath();
  ctx.arc( p.x, p.y, rad, 0, TAU );
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



//resize.js






function resize() {

    W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  resizeCanvas( CANVAS, W, H );


  /*
    TODO
  */

  var w = ( 1 - W_PADDING*2 ) * W,
        h = ( 1 - H_PADDING*2 ) * H;

  var t = DIAM + 1;

  var wSpacing = w / ( t * Math.cos( .75 ) ),
        hSpacing = h / t;

  SPACING = Math.min( wSpacing, hSpacing );

  BOARD_W = (DIAM+2) * Math.cos( .75 ) * SPACING,
  BOARD_H = (DIAM+1) * SPACING;

  elById( 'overlay-wrapper' ).style.width = BOARD_W + 'px';
  elById( 'overlay-wrapper' ).style.height = BOARD_H + 'px';





  var boxDim = Math.round( SPACING * .72 ),
        svgDim = Math.round( SPACING * .36 ),
        socialPos = ( boxDim - svgDim ) * .5;

  // button containers
  var els = elsByClass( 'button' );
  for ( var i = 0; i < els.length; i++ ) {
    var el = els[i];
    el.style.width = boxDim + 'px';
    el.style.height = boxDim + 'px';
  }

  // button icon svgs
  var els = elsByClass( 'icon-svg' );
  for ( var i = 0; i < els.length; i++ ) {
    var el = els[i];
    el.style.width = svgDim + 'px';
    el.style.height = svgDim + 'px';
  }

  // social button position
  var el = elById( 'social' );
  el.style.left = socialPos + 'px';
  el.style.bottom = socialPos + 'px';

  // title position
  var el = elById( 'title' );
  var p1 = SPACING * .09,
        p2 = SPACING * .35;
  el.style.padding = p1 + 'px ' + p2 + 'px';
  el.style.fontSize = SPACING * .53 + 'px';

  // ad wrapper attributes
  var adEl = elById( 'ad-wrapper' );
  adEl.style.width = ( W - el.clientWidth ) - p2*2 + 'px';
  adEl.style.top = p1 + 'px';
  adEl.style.right = p2 + 'px';
  //adEl.style.maxHeight = el.clientHeight /*- p1*2*/ + 'px';
  adEl.style.maxHeight = SPACING * 1.10 + 'px';

  // overlay title font size
  var els = elsByClass( 'overlay-title' );
  for ( var i = 0; i < els.length; i++ ) {
    var el = els[i];
    el.style.fontSize = SPACING * .60 + 'px';
  }

  // overlay button wrapper margin-top
  var els = elsByClass( 'overlay-button-wrapper' );
  for ( var i = 0; i < els.length; i++ ) {
    var el = els[i];
    el.style.marginTop = SPACING * .60 + 'px';
  }

  // overlay button font-size, padding, margin, and border-radius
  var els = elsByClass( 'overlay-button' );
  for ( var i = 0; i < els.length; i++ ) {
    var el = els[i];

    var p1 = SPACING * .04,
            p2 = SPACING * .25,
            p3 = SPACING * .05;

    el.style.padding = p1 + 'px ' + p2 + 'px ' + p3 + 'px';
    el.style.fontSize = SPACING * .25 + 'px';
    el.style.margin = '0 ' + SPACING * .05 + 'px';
    el.style.borderRadius = SPACING * .10 + 'px';
  }

  // overlay subtitle font-size
  var els = elsByClass( 'overlay-subtitle' );
  for ( var i = 0; i < els.length; i++ ) {
    var el = els[i];
    el.style.fontSize = SPACING * .20 + 'px';
  }
  


  drawBoard(0);

}

window.addEventListener( 'resize', resize, false );



//touch.js



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



//input.js

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
        console.log( 'uncanceled' );

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


//load.js



/*
INITIALIZE EVERYTHING ON LOAD
*/

window.addEventListener( 'load', function() {

    document.body.appendChild( CANVAS );
    bindEvents();

    resize();

    if ( storedValuesExist() ) {
        loadStored();
        drawBoard(0);

        if ( lost() ) {
            gameOver();
        }
        else if ( won() ) {
            gameWon();
        }

    }
    else {
        initGame();
        storeCurrent();
        showOverlay( 'how-to-play' );
    }

    loadColorBlindIcon();
    loadSoundIcon();

});



/*
DRAW BOARD WHEN FONTS ARE LOADED
*/

if ( document.fonts ) {
    document.fonts.ready.then(function () {
        drawBoard( 0 );
    });

    document.fonts.onloadingdone = function () {
        drawBoard( 0 );
    };
}




