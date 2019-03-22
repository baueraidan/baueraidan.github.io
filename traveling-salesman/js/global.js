


/*
SETTINGS
*/

var PAD_PROP = 0.09,
		LINE_PROP = 0.004,
		POINT_PROP = 0.006;


/*
DIMENSIONS
*/

// dimensions of main canvas
var W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var COLUMN_W = 250,
		HEADER_H = 100;

var CANVAS_W = W - COLUMN_W;
		CANVAS_H = H - HEADER_H;

var DIM = Math.min( CANVAS_W, CANVAS_H );

// main canvas padding
var PAD = DIM * PAD_PROP;

console.log( 'pad: ' + PAD );



/*
CURRENT PATH
*/

// array of points
var POINTS = [];
var LINES = [];

// amount of points
var AMOUNT;

var PRESETS = [];



/*
CONSTANTS
*/

var TAU = Math.PI * 2,
		PI = Math.PI;

// pixel ratio
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
GLOBAL VARIABLES
*/

// duration between animations (ms)
var ANIM_DUR = 250;



/*
STATES
*/

var RUNNING = false;

var ABORT = false;

var ABORT_CALLBACK;

var ANIMATING = false;

var DISPLAY_NARROW = false;





document.body.style.backgroundColor = '#2EA4F6';

/*
CANVAS
*/

var c = document.getElementById( 'canvas' ),
		ctx = c.getContext( '2d' );

resizeCanvas( c, CANVAS_W, CANVAS_H );



// ensure copyright has correct year
var y = new Date().getUTCFullYear();
document.getElementById( 'copyright' ).innerHTML += ' ' + y;

document.body.appendChild( c );


