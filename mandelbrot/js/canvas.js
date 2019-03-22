


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


