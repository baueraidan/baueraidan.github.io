


/*
CLEAR LOCAL STORAGE
*/

function clearStorage() {
	if ( STORAGE_EXISTS ) {
		localStorage.clear();
	}
}



/*
TEST WHETHER VALUES HAVE BEEN STORED BEFORE
*/

function storedValuesExist() {

	if ( STORAGE_EXISTS ) {

		var storedValues = [ 'board', 'score', 'best_score', 'best_color', 'already_won', 'color_blind', 'muted' ];
		for ( var i = 0; i < storedValues.length; i++ ) {
			var s = storedValues[i];
			var thisValue = localStorage[s];
			if ( typeof thisValue === 'undefined' || thisValue === null ) return false;
		}

		return true;

	}

	return false;

}



/*
STORE CURRENT VALUES
*/

function storeCurrent() {
	if ( STORAGE_EXISTS ) {
		localStorage['board'] = JSON.stringify( BOARD );
		localStorage['score'] = SCORE;
		localStorage['best_score'] = BEST_SCORE;
		localStorage['best_color'] = BEST_COLOR;
		localStorage['already_won'] = ALREADY_WON;
		localStorage['color_blind'] = COLOR_BLIND;
		localStorage['muted'] = MUTED;
	}
}



/*
LOAD STORED VERSION
*/

function loadStored() {
	if ( STORAGE_EXISTS ) {
		BOARD = JSON.parse( localStorage['board'] );
		SCORE = parseInt( localStorage['score'] );
		BEST_SCORE = parseInt( localStorage['best_score'] );
		BEST_COLOR = parseInt( localStorage['best_color'] );
		ALREADY_WON = parseInt( localStorage['already_won'] );
		COLOR_BLIND = JSON.parse( localStorage['color_blind'] );
		MUTED = JSON.parse( localStorage['muted'] );
	}
}


