


function clear( ctx ) {

  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
  ctx.restore();

}









var MIN_POINT, MAX_POINT;

var MAX_ITERATIONS = 120;

var CENTER = new Point( -.5, 0 );

var SCALE = 1.0;

var DRAWING = false;

// whether or not draw has been canceled
var CANCEL_DRAW = false;

// cancel draw callback
var CANCEL_DRAW_CALLBACK = false;



function cancelDraw( callback ) {

  if ( DRAWING ) {
    CANCEL_DRAW = true;
    if ( typeof callback === 'function' ) CANCEL_DRAW_CALLBACK = callback;
  }
  else {
    callback();
  }

}





/*

var theta = Math.random() * Math.PI * 2;

var r = (1 - Math.cos(theta)) * 0.5;
var x = r * Math.cos(theta) + 0.25;
var y = r * Math.sin(theta);


var r = 0.25;
var x = r * Math.cos(theta) - 1;
var y = r * Math.sin(theta);

*/





/*
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    memCtx.webkitImageSmoothingEnabled = false;
    memCtx.mozImageSmoothingEnabled = false;
    memCtx.imageSmoothingEnabled = false;
*/















function getColor( prop ) {

  var t = Math.pow( prop, 0.3 );

  var shade = 50;

  var a = 0.5;

  if ( prop < a ) {
    var v = ( prop - a ) / ( 1 - a );
    var shade = 50 + v * 50;
  }

  var color = 'hsl(' + (t * 260 + 160) +', 100%, ' + shade + '%)';

  return color;

}



function updateCanvas() {

  var clientW = memC.width / PIXEL_RATIO,
      clientH = memC.height / PIXEL_RATIO;

  // make canvas the size of memory canvas
  resizeCanvas( c, clientW, clientH );

  var imgData = memCtx.getImageData( 0, 0, memC.width, memC.height );

  // draw memory canvas onto canvas
  ctx.putImageData( imgData, 0, 0 );

  //ctx.drawImage( memC, 0, 0, memC.width, memC.height, 0, 0, memC.width/2, memC.height/2 );


/*
    var drawW = memC.width,
        drawH = memC.height;

var imgData=memCtx.getImageData(0,0,drawW,drawH);
ctx.putImageData(imgData,drawW/2,drawH/2);
*/

}




function draw( minCoords, maxCoords, maxIt, callback, loadFunc ) {

  elById( 'load' ).style.webkitTransform = 'translateY( 0 )';
  elById( 'load' ).style.transform = 'translateY( 0 )';

  DRAWING = true;

  resizeCanvas( memC, W, H );

  var w = W,
      h = H;

  var y = 0;

  (function iterate(){

    if ( y < h ) {

      for ( var x = 0; x < w; x++ ) {

        var deltY = maxCoords.y - minCoords.y,
            deltX = maxCoords.x - minCoords.x;

        var thisX = minCoords.x + ( (x/w) * deltX ),
            thisY = minCoords.y + ( (y/h) * deltY );

            // real component
        var c_re = thisX,
            // imaginary component
            c_im = thisY;

        var iX = 0, iY = 0;
        var iteration = 0;

        // continue until max iterations reached or escapes
        while ( iX*iX+iY*iY <= 4 && iteration < maxIt ) {
            var x_new = iX*iX - iY*iY + c_re;
            iY = 2*iX*iY + c_im;
            iX = x_new;
            iteration++;
        }

        // decide upon color
        if ( iteration < maxIt ) {
          var color = getColor( iteration / maxIt );
          memCtx.fillStyle = color;
        }
        else {
          memCtx.fillStyle = '#000';
        }

        memCtx.fillRect( x, y, 1, 1 );

      }

      // increment y value
      y++;

      var comp = Math.min( y / h, 1 );
      //if ( typeof loadFunc === 'function' ) loadFunc( comp );

      elById( 'load' ).style.width = (comp*100) + '%';

      // if draw was canceled, call callback
      if ( CANCEL_DRAW ) {
        CANCEL_DRAW = false;
        if ( typeof CANCEL_DRAW_CALLBACK === 'function' ) CANCEL_DRAW_CALLBACK();
        CANCEL_DRAW_CALLBACK = false;
      }
      // draw was not canceled, iterate
      else {

        if ( y % 3 === 0 ) {
          setTimeout( iterate, 0 );
          //iterate();
        }
        else {
          iterate();
        }

      }

    }
    else {

      DRAWING = false;
      updateCanvas();
      
      // if draw was canceled, call callback
      if ( CANCEL_DRAW ) {
        CANCEL_DRAW = false;
        if ( typeof CANCEL_DRAW_CALLBACK === 'function' ) CANCEL_DRAW_CALLBACK();
        CANCEL_DRAW_CALLBACK = false;
      }

      elById( 'load' ).style.webkitTransform = 'translateY( 100% )';
      elById( 'load' ).style.transform = 'translateY( 100% )';
      if ( typeof callback === 'function' ) callback();

    }

  })();



}







/*
DECIDE MAX_IT AND POINT BOUNDS GIVEN SCALE AND CENTER
*/

function calcBounds() {

  var va = -( Math.log( SCALE ) / Math.log( 10 ) );
  MAX_ITERATIONS = 20 * Math.pow( 2.2/*1.8*/, va );
  MAX_ITERATIONS = Math.max( MAX_ITERATIONS, 40 );

  var minX = -2 * SCALE,
      maxX = 2 * SCALE;

  MIN_POINT = new Point( minX + CENTER.x, minX * (H/W) + CENTER.y );
  MAX_POINT = new Point( maxX + CENTER.x, maxX * (H/W) + CENTER.y );

}

calcBounds();
draw( MIN_POINT, MAX_POINT, MAX_ITERATIONS,
  function() {
    elById( 'reminder' ).style.opacity = 1;
    elById( 'zoom-in' ).style.opacity = 1;
    elById( 'zoom-out' ).style.opacity = 1;
  },
  function( comp ) {
    console.log( 'loading: ' + comp );
  }
);








