


/*
INITIALIZE EVERYTHING ON LOAD
*/

window.addEventListener( 'load', function() {

	document.body.appendChild( CANVAS );
	bindEvents();

	resize();

	if ( storedValuesExist() ) {
		loadStored();
		drawBoard(0);

		if ( lost() ) {
			gameOver();
		}
		else if ( won() ) {
			gameWon();
		}

	}
	else {
		initGame();
		storeCurrent();
		showOverlay( 'how-to-play' );
	}

	loadColorBlindIcon();
	loadSoundIcon();

	document.getElementById( 'copyright' ).innerHTML += new Date().getFullYear();

	fixLinks();

});



/*
MAKE LINKS CLICKABLE ON MOBILE
*/

function fixLinks() {

	var linkEls = document.getElementsByTagName( 'a' );

	for ( var i = 0; i < linkEls.length; i++ ) {
		var linkEl = linkEls[i];

		console.log( 'hello?' )

		// allow touchmove
		linkEl.addEventListener('touchmove', function( e ) {
			console.log( 'tm' );
			e.stopPropagation();
		}, false );

		// allow touchmove
		linkEl.addEventListener('touchend', function( e ) {
			console.log( 'te' );
			e.stopPropagation();
		}, false );

		// allow touchmove
		linkEl.addEventListener('touchstart', function( e ) {
			console.log( 'ts' );
			e.stopPropagation();
		}, false );

	}

}



/*
DRAW BOARD WHEN FONTS ARE LOADED
*/

if ( document.fonts ) {
	document.fonts.ready.then(function () {
		drawBoard( 0 );
	});

	document.fonts.onloadingdone = function () {
		drawBoard( 0 );
	};
}



