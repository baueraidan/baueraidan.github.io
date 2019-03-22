

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

var WINNING_TILE_COLOR = 6,
    MAX_TILE_COLOR = 7;

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
    secondary: new Triple(205, 210, 213)
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




