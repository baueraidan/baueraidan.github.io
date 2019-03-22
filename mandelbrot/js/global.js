


/*
VIEWPORT DIMENSIONS
*/

var W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);



/*
PIXEL RATIO
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



/*
ANIMATION
*/

var ANIMATING = false;



/*
CLOSEST ZOOM
*/

var MIN_SCALE = 10e-14;



/*
CANVAS
*/

var c = createCanvas( W, H ),
    ctx = c.getContext( '2d' );

var boxC = createCanvas( W, H ),
    boxCtx = boxC.getContext( '2d' );

var memC = createCanvas( W, H ),
    memCtx = memC.getContext( '2d' );

document.body.appendChild( c );
//document.body.appendChild( memC );
document.body.appendChild( boxC );


