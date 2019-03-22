


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


