


// points
var rangePointsEl = document.getElementById( 'range-points' );
var textPointsEl = document.getElementById( 'text-points' );

// anim
var rangeAnimEl = document.getElementById( 'range-anim' );
var textAnimEl = document.getElementById( 'text-anim' );


/*
GENERATE POINTS
*/

document.getElementById( 'generate' ).addEventListener( 'click', function() {

	// ensure not solving for something else
	abort(function() {
		document.body.style.backgroundColor = '#2EA4F6';
		document.getElementById( 'options' ).style.color = '#2EA4F6';
		hideLoading();

		var textPointsEl = document.getElementById( 'text-points' );

		AMOUNT = parseInt( textPointsEl.value );

		POINTS = [];
		LINES = [];

		generatePoints();
		clear( ctx );
		drawGrid();
		drawPoints();
	});

});



/*
CLOSE MENU WHEN OVERLAY IS CLICKED AND SCREEN IS NARROW
*/

document.getElementById( 'overlay' ).addEventListener( 'click', function() {

	if ( DISPLAY_NARROW ) hideMenu();

});



/*
RUN
*/

document.getElementById( 'run' ).addEventListener( 'click', function() {

	if ( DISPLAY_NARROW ) hideMenu();

	if ( !RUNNING && POINTS.length >= 3 ) {

		RUNNING = true;
		showLoading();

		document.body.style.backgroundColor = '#2EA4F6';
		POINTS = shuffle( POINTS )
		LINES = [];

		drawAll();

		greedy(function() {
			solve(function() {
				RUNNING = false;
				//showMenu();
				document.body.style.backgroundColor = '#2ecc71';
				document.getElementById( 'options' ).style.color = '#2ecc71';
				hideLoading();
				console.log( 'callback for completion' );
			});
		});

	}

});



/*
LOAD PRESET
*/

document.getElementById( 'load' ).addEventListener( 'click', function() {

	abort(function() {

		hideLoading();

		var presetEl = document.getElementById( 'preset' ),
				presetId = parseInt( presetEl.value );

		POINTS = shuffle( PRESETS[ presetId ].points );
		AMOUNT = POINTS.length;
		LINES = [];

		drawAll();

	});

});



/*
OPEN MENU
*/

document.getElementById( 'options' ).addEventListener( 'click', function() {

	showMenu();

});



/*
POINTS RANGE INPUT
*/

rangePointsEl.addEventListener( 'change', function() {
	textPointsEl.value = rangePointsEl.value;
}, false );
rangePointsEl.addEventListener( 'input', function() {
	textPointsEl.value = rangePointsEl.value;
}, false );



/*
ANIM TEXT INPUT
*/

textPointsEl.addEventListener( 'change', function() {
	var val = parseInt( textPointsEl.value );
	val = Math.max( val, 3 );
	if ( isNaN( val ) ) val = 100;
	textPointsEl.value = val;
	rangePointsEl.value = val;
}, false );
textPointsEl.addEventListener( 'input', function() {
	rangePointsEl.value = textPointsEl.value;
}, false );



/*
ANIM RANGE INPUT
*/

rangeAnimEl.addEventListener( 'change', function() {
	var val = rangeAnimEl.value;
	textAnimEl.value = val;
	ANIM_DUR = val;
}, false );
rangeAnimEl.addEventListener( 'input', function() {
	var val = rangeAnimEl.value;
	textAnimEl.value = val;
}, false );



/*
POINTS TEXT INPUT
*/

textAnimEl.addEventListener( 'change', function() {
	var val = parseInt( textAnimEl.value );
	val = Math.max( val, 0 );
	if ( isNaN( val ) ) val = 300;
	rangeAnimEl.value = val;
	textAnimEl.value = val;
	ANIM_DUR = val;
}, false );
textAnimEl.addEventListener( 'input', function() {
	rangeAnimEl.value = textAnimEl.value;
}, false );


