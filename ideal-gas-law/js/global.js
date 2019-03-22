
// ratio of real-world seconds to simulated seconds (slows things down so they can be seen)
var TIME_SCALE = 1.0e10;

// specific heat capacity of 
var HEAT_CAPACITY = 5.19;

// volume of container, in zL
var VOLUME = 0;

// distance from center to one side of the container, in pm
var RANGE = 8000;

// radius of a single (He) particle, in pm
var RADIUS = 140;

// array containing all particle objects
var balls = [];

// plane and box meshes that form container
var PLANES = [];
var BOX;

// range elements
var volumeRangeEl = document.getElementById( 'volume-range' ),
	particlesRangeEl = document.getElementById( 'particles-range' ),
	temperatureRangeEl = document.getElementById( 'temperature-range' );


