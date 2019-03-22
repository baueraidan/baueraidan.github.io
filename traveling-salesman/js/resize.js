


function resize() {

	console.log( 'resize' );

	W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
	H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var columnEl = document.getElementById( 'column' ),
			headerEl = document.getElementById( 'header' ),
			optionsEl = document.getElementById( 'options' ),
			workEl = document.getElementById( 'work' ),
			loadingEl = document.getElementById( 'loading' );

	DISPLAY_NARROW = W <= 560;

	if ( DISPLAY_NARROW ) {
		CANVAS_W = W;
		hideMenu();
	}
	else {
		CANVAS_W = W - COLUMN_W;
		showMenu();
	}

	headerEl.style.width = CANVAS_W + 'px';

	// wait for text to resize headerEl
	requestAnimFrame(function() {

		HEADER_H = headerEl.clientHeight;
		CANVAS_H = H - HEADER_H;

		columnEl.style.width = COLUMN_W + 'px';

		optionsEl.style.top = HEADER_H + 10 + 'px';
		loadingEl.style.top = HEADER_H + 10 + 'px';

		if ( DISPLAY_NARROW ) {
			optionsEl.style.right = '15px';
			workEl.style.right = '15px';
		}
		else {
			optionsEl.style.right = COLUMN_W + 15 + 'px';
			workEl.style.right = COLUMN_W + 15 + 'px';
		}


		DIM = Math.min( CANVAS_W, CANVAS_H );
		PAD = DIM * PAD_PROP;

		resizeCanvas( c, CANVAS_W, CANVAS_H );

		drawAll();

	});

}

resize();
drawAll();


window.addEventListener( 'resize', resize );
document.getElementById( 'header' ).addEventListener( 'resize', resize );


