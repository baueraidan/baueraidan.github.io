


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


