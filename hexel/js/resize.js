





function resize() {

	W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  resizeCanvas( CANVAS, W, H );


  /*
	TODO
  */

  var w = ( 1 - W_PADDING*2 ) * W,
  		h = ( 1 - H_PADDING*2 ) * H;

  var t = DIAM + 1;

  var wSpacing = w / ( t * Math.cos( .75 ) ),
  		hSpacing = h / t;

  SPACING = Math.min( wSpacing, hSpacing );

  BOARD_W = (DIAM+2) * Math.cos( .75 ) * SPACING,
  BOARD_H = (DIAM+1) * SPACING;

  elById( 'overlay-wrapper' ).style.width = BOARD_W + 'px';
  elById( 'overlay-wrapper' ).style.height = BOARD_H + 'px';





  var boxDim = Math.round( SPACING * .72 ),
  		svgDim = Math.round( SPACING * .36 ),
  		socialPos = ( boxDim - svgDim ) * .5;

  // button containers
  var els = elsByClass( 'button' );
  for ( var i = 0; i < els.length; i++ ) {
  	var el = els[i];
  	el.style.width = boxDim + 'px';
  	el.style.height = boxDim + 'px';
  }

  // button icon svgs
  var els = elsByClass( 'icon-svg' );
  for ( var i = 0; i < els.length; i++ ) {
  	var el = els[i];
  	el.style.width = svgDim + 'px';
  	el.style.height = svgDim + 'px';
  }

  // social button position
  var el = elById( 'social' );
  el.style.left = socialPos + 'px';
  el.style.bottom = socialPos + 'px';

  // title position
  var el = elById( 'title' );
  var p1 = SPACING * .09,
  		p2 = SPACING * .35;
  el.style.padding = p1 + 'px ' + p2 + 'px';
  el.style.fontSize = SPACING * .53 + 'px';

  // ad wrapper attributes
  var adEl = elById( 'ad-wrapper' );
  adEl.style.width = ( W - el.clientWidth ) - p2*2 + 'px';
  adEl.style.top = p1 + 'px';
  adEl.style.right = p2 + 'px';
  //adEl.style.maxHeight = el.clientHeight /*- p1*2*/ + 'px';
  adEl.style.maxHeight = SPACING * 1.10 + 'px';

  // overlay title font size
  var els = elsByClass( 'overlay-title' );
  for ( var i = 0; i < els.length; i++ ) {
  	var el = els[i];
  	el.style.fontSize = SPACING * .60 + 'px';
  }

  // overlay button wrapper margin-top
  var els = elsByClass( 'overlay-button-wrapper' );
  for ( var i = 0; i < els.length; i++ ) {
  	var el = els[i];
  	el.style.marginTop = SPACING * .60 + 'px';
  }

  // overlay button font-size, padding, margin, and border-radius
  var els = elsByClass( 'overlay-button' );
  for ( var i = 0; i < els.length; i++ ) {
  	var el = els[i];

  	var p1 = SPACING * .04,
  			p2 = SPACING * .25,
  			p3 = SPACING * .05;

  	el.style.padding = p1 + 'px ' + p2 + 'px ' + p3 + 'px';
  	el.style.fontSize = SPACING * .25 + 'px';
  	el.style.margin = '0 ' + SPACING * .05 + 'px';
  	el.style.borderRadius = SPACING * .10 + 'px';
  }

  // overlay subtitle font-size
  var els = elsByClass( 'overlay-subtitle' );
  for ( var i = 0; i < els.length; i++ ) {
  	var el = els[i];
  	el.style.fontSize = SPACING * .20 + 'px';
  }
  


  drawBoard(0);

}

window.addEventListener( 'resize', resize, false );


