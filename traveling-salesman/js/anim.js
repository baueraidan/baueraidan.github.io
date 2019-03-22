


/*
ANIMATION FUNCTION
*/

function anim( callback, duration ) {

  ANIMATING = true;

  var it = 0;

  var start = new Date().getTime();

  (function animLoop(){

    if ( ABORT ) {
      console.log( 'STOP!' );
      abortComplete();
    } 
    else {

      it++;
      var done = false;

      var cur = new Date().getTime(),
          change = cur - start,
          comp = change / duration;

      if ( change < duration ) {
        requestAnimFrame( animLoop );
      }
      else {
        ANIMATING = false;
        comp = 1;
        done = true;
      }



      // if it only took one iteration
      if ( done && it == 1 ) {

        setTimeout(function() {

          // if ABORT bool has changed since setTimeout
          if ( ABORT ) {
            console.log( 'STOPPO!' );
            abortComplete();
          } 
          else {
            callback( comp );
          }

        }, 0 );

      }
      // if not done or took multiple iterations
      else {
        callback( comp );
      }



    }

  })();

}


