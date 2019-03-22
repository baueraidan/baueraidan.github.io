


/*
DRAW BACKGROUND GRID
*/

function drawGrid() {

  //ctx.setLineDash( [ 10, 5 ] );

/*
  ctx.strokeStyle = 'rgba( 255, 255, 255, .3 )';//'#3DADF9';
  ctx.lineWidth = 1;

  var p1 = toPix( new Point( 0, 0 ) );

  var dif = DIM - PAD*2;

  ctx.beginPath();
  ctx.rect( p1.x, p1.y, dif, dif );
  ctx.stroke();

  ctx.setLineDash([])
*/



  var cell = DIM / 19;

  var wIt = Math.ceil( CANVAS_W / cell ),
      hIt = Math.ceil( CANVAS_H / cell );

  if ( wIt % 2 == 1 ) wIt++;
  if ( hIt % 2 == 1 ) hIt++;

  ctx.strokeStyle = 'rgba( 255, 255, 255, .1 )';//'#3DADF9';
  ctx.lineWidth = 1;

  for ( var i = -wIt/2; i < wIt/2; i++ ) {

    var t = cell * i;

    ctx.beginPath();
    ctx.moveTo( t+CANVAS_W/2, 0 );
    ctx.lineTo( t+CANVAS_W/2, CANVAS_H );
    ctx.stroke();

  }

  for ( var i = -hIt/2; i < hIt/2; i++ ) {

    var t = cell * i;

    ctx.beginPath();
    ctx.moveTo( 0, t+CANVAS_H/2 );
    ctx.lineTo( CANVAS_W, t+CANVAS_H/2 );
    ctx.stroke();

  }


}



/*
DRAW LINE SEGMENT
*/

function drawLine( p1, p2 ) {

  // draw to canvas
  ctx.beginPath();
  ctx.moveTo( p1.x, p1.y );
  ctx.lineTo( p2.x, p2.y );
  ctx.stroke();

}



/*
DRAW COMPLETE PATH
*/

function drawPath( comp ) {

  // if comp is undefined, set to 0
  if ( !comp ) comp = 0;

  var w = DIM * LINE_PROP;

  // set line properties
  ctx.lineWidth = w;
  ctx.lineCap = 'round';

  // loop through first point indices
  for ( var i1 = 0; i1 < LINES.length; i1++ ) {

    // second point index
    //var i2 = mod( i1+1, AMOUNT );

    var l = LINES[i1];

    // point objects
    var old1 = l.from.old,
        old2 = l.to.old,
        new1 = l.from.new,
        new2 = l.to.new;

    var c1 = new Point( new1.x - old1.x, new1.y - old1.y ),
        c2 = new Point( new2.x - old2.x, new2.y - old2.y );

    var p1 = new Point( old1.x + c1.x * comp, old1.y + c1.y * comp ),
        p2 = new Point( old2.x + c2.x * comp, old2.y + c2.y * comp );

    var pix1 = toPix( p1 ),
        pix2 = toPix( p2 );

    // decide upon color
    var dist = hypot( p1, p2 ),
        prop = dist / Math.sqrt( 2 ),
        color = prop * 200;

    color = 0;

    ctx.strokeStyle = 'hsl(' + color + ', 100%, 50%)';
    ctx.strokeStyle = '#000';
    ctx.strokeStyle = '#fff';

    drawLine( pix1, pix2 );

  }

}



/*
CLEAR CANVAS
*/

function clear( ctx ) {

	ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  // Will always clear the right space
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.restore();

}



/*
DRAW POINTS
*/

function drawPoints() {

  // loop through points
  for ( var i = 0; i < AMOUNT; i++ ) {

    // this point
    var p = toPix( POINTS[i] );

    // draw point
    ctx.fill();

    var r = DIM * POINT_PROP;

    ctx.beginPath();
    ctx.moveTo( p.x, p.y );
    ctx.fillStyle = '#fff';
    ctx.arc( p.x, p.y, r, 0, Math.PI*2 );
    ctx.fill();
  
  }

}





/*
DRAW EVERYTHING
*/

function drawAll() {

  clear( ctx );
  drawGrid();
  drawPath();
  drawPoints();

}


