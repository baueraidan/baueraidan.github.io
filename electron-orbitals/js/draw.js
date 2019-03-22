
var TAU = 2 * Math.PI;
var MESHES = [];

// set up scene and renderer
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// initialize and position the camera
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.0001, 10000000 );

// orbit controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );

// ambient light
var light = new THREE.AmbientLight( 0xffffff ); // soft white light
light.intensity = 0.8;
scene.add( light );

// point light
var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 1, 1, 1 );
scene.add( light );

// sphere
var geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
//scene.add( sphere );

camera.position.z = 5;



var s = Math.random() * TAU,
	t = Math.random() * TAU/2;
var r = Math.pow( Math.random(), 0.5 ) * 20;
var r = 20;




function schrodinger( id, r, t, s ) {
	var a0 = 0.0529;
	var Z = 1;
	var p = (Z*r) / a0;
	var ei = Math.pow( Math.pow(0.540302306,2) + Math.pow(0.841470985,2), 1 );
	var misc = Math.pow(Z/a0,3/2);

	switch( id ) {
		case 100:
			return (1/Math.sqrt(Math.PI)) * misc * Math.exp(-p);
			break;
		case 200:
			return (1/Math.sqrt(32*Math.PI)) * misc * (2-p) * Math.exp(-p/2);
			break;
		case 210:
			return (1/Math.sqrt(32*Math.PI)) * misc * p * Math.exp(-p/2) * Math.cos(t);
			break;
		case 211:
			return (1/Math.sqrt(64*Math.PI)) * misc * p * Math.exp(-p/2) * Math.sin(t) * Math.pow(ei,s);
			break;
		case 300:
			return (1/(81*Math.sqrt(3*Math.PI))) * misc * (27-18*p+2*Math.pow(p,2)) * Math.exp( -p/3 );
			break;
		case 310:
			return (1/81) * Math.sqrt(2/Math.PI) * misc * (6*p-Math.pow(p,2)) * Math.exp( -p/3 ) * Math.cos(t);
			break;
		case 311:
			return (1/(81*Math.sqrt(Math.PI))) * misc * (6*p-Math.pow(p,2)) * Math.exp(-r/3) * Math.sin(t) * Math.pow(ei,s);
			break;
		case 320:
			return (1/(81*Math.sqrt(6*Math.PI))) * misc * Math.pow(p,2) * Math.exp(-p/3) * (3*Math.pow(Math.cos(t),2) - 1);
			break;
		case 321:
			return (1/(81*Math.sqrt(Math.PI))) * misc * Math.pow(p,2) * Math.exp(-p/3) * Math.sin(t) * Math.cos(t) * Math.pow(ei,s);
			break;
		case 322:
			return (1/(162*Math.sqrt(Math.PI))) * misc * Math.pow(p,2) * Math.exp(-p/3) * Math.pow(Math.sin(t),2) * Math.pow(ei,2*s);
			break;
	}

}

var MAX_RADIUS = 0;

function getBoundaryRadius( inc, id, cutoff, s, t ) {
	var r = 0;

	while( true ) {
		var thisValue = Math.pow( schrodinger( id, r, t, s ), 2 );
		var nextValue = Math.pow( schrodinger( id, r+inc, t, s ), 2 );
		if ( thisValue > cutoff && nextValue < cutoff ) {
			return r;
		}
		else if ( r >= 2 ) {
			return 0;
		}
		r += inc;
	}
}

function vertByPt( geometry, pt ) {
	for ( var i = 0; i < geometry.vertices.length; i++ ) {
		var pt2 = geometry.vertices[i];
		if ( pt.x === pt2.x && pt.y === pt2.y && pt.z === pt2.z ) {
			return i;
		}
	}
}

function mod( n, m ) {
  return ((n % m) + m) % m;
}





function addOrbital( id, angleInc, radiusInc, cutoff, drawPoints, drawWireframe, drawMaterial ) {

	var starsGeometry = new THREE.Geometry();
	var geometry = new THREE.Geometry();
	var colors = [];

	var quads = [];

	for ( var a = 0; a < angleInc; a++ ) {
		for ( var b = 0; b < angleInc; b++ ) {

			var s = (a/angleInc) * TAU,
				t = (b/angleInc) * TAU;
			var r = getBoundaryRadius( radiusInc, id, cutoff, s, t );

			var nextS = (mod(a+1,angleInc)/angleInc) * TAU,
				nextT = (mod(b+1,angleInc)/angleInc) * TAU;

			var r1 = getBoundaryRadius( radiusInc, id, cutoff, nextS, t ),
				r2 = getBoundaryRadius( radiusInc, id, cutoff, s, nextT ),
				r3 = getBoundaryRadius( radiusInc, id, cutoff, nextS, nextT );

			var val = Math.pow( schrodinger( id, r, t, s ), 2 );

			var x = r * Math.cos(s) * Math.sin(t),
				y = r * Math.sin(s) * Math.sin(t),
				z = r * Math.cos(t);

			var x1 = r1 * Math.cos(nextS) * Math.sin(t),
				y1 = r1 * Math.sin(nextS) * Math.sin(t),
				z1 = r1 * Math.cos(t);

			var x2 = r2 * Math.cos(s) * Math.sin(nextT),
				y2 = r2 * Math.sin(s) * Math.sin(nextT),
				z2 = r2 * Math.cos(nextT);

			var x3 = r3 * Math.cos(nextS) * Math.sin(nextT),
				y3 = r3 * Math.sin(nextS) * Math.sin(nextT),
				z3 = r3 * Math.cos(nextT);

			var newQuad = [
				new THREE.Vector3( x, y, z ),
				new THREE.Vector3( x1, y1, z1 ),
				new THREE.Vector3( x2, y2, z2 ),
				new THREE.Vector3( x3, y3, z3 )
			]

			quads.push(newQuad);

			var color = new THREE.Color();
			color.setHSL( 0, 1.0, 0.5 );
			colors.push( color );

			var star = new THREE.Vector3( x, y, z );
			starsGeometry.vertices.push( star );
			geometry.vertices.push( star );
		}	
	}

	starsGeometry.colors = colors;

	var starsMaterial = new THREE.PointsMaterial( { size: 0.03, vertexColors: colors } );
	var starField = new THREE.Points( starsGeometry, starsMaterial );

	// drawPoints
	if ( drawPoints ) {
		scene.add( starField );
		MESHES.push( starField );
	}


	for ( var i = 0; i < quads.length; i++ ) {

		var p1 = quads[i][0];
		var p2 = quads[i][1];
		var p3 = quads[i][2];
		var p4 = quads[i][3];

		var i1 = vertByPt( geometry, p1 );
		var i2 = vertByPt( geometry, p2 );
		var i3 = vertByPt( geometry, p3 );
		var i4 = vertByPt( geometry, p4 );

		var face1 = new THREE.Face3( i1, i2, i4 );
		var face2 = new THREE.Face3( i1, i4, i3 );
		geometry.faces.push( face1 );
		geometry.faces.push( face2 );

	}



	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var material = new THREE.MeshNormalMaterial();
	material.flatShading = false;
	var mesh = new THREE.Mesh( geometry, material );

	// drawMaterial
	if ( drawMaterial ) {
		scene.add( mesh );
		MESHES.push( mesh );
	}


	var wireframe = new THREE.WireframeGeometry( geometry );

	var line = new THREE.LineSegments( wireframe );
	line.material.depthTest = false;
	line.material.opacity = 0.25;
	line.material.transparent = true;

	// drawWireframe
	if ( drawWireframe ) {
		scene.add( line );
		MESHES.push( line );
	}


}



// handle window resize
window.addEventListener( 'resize', function() {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});


function animate() {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
}



function drawOrbital() {

	document.getElementById( 'loading' ).innerHTML = 'Loading...';

	setTimeout(function() {

		var orbitalEl = document.getElementById('orbital');
		var orbitalValue = parseInt( orbitalEl.value );

		var materialEl = document.getElementById('material');
		var materialValue = materialEl.value;

		var detailEl = document.getElementById('detail');
		var detailValue = detailEl.value;

		var c1 = materialValue === 'points',
			c2 = materialValue === 'wireframe',
			c3 = materialValue === 'normal';

		var detailNum;
		switch ( detailValue ) {
			case 'low':
				detailNum = 40;
				break;
			case 'medium':
				detailNum = 60;
				break;
			case 'high':
				detailNum = 100;
				break;
			default:
				detailNum = 60;
				break;
		}

		// remove all old meshes
		for ( var i = MESHES.length-1; i >= 0; i-- ) {
			scene.remove( MESHES[i] );
			MESHES.splice( i, 1 );
		}

		addOrbital( orbitalValue, detailNum, 1.0e-3, 0.05, c1, c2, c3 );
		document.getElementById( 'loading' ).innerHTML = 'Done.';

	}, 100 );

}



// on document load...
document.addEventListener( 'DOMContentLoaded', function() {

	drawOrbital( 100, 60, 1.0e-3, 0.05, false, false, true );
	document.body.appendChild( renderer.domElement );
	animate();

	var orbitalEl = document.getElementById('orbital');
	orbitalEl.addEventListener( 'input', function() {
		drawOrbital();
	});

	var materialEl = document.getElementById('material');
	materialEl.addEventListener( 'input', function() {
		drawOrbital();
	});

	var detailEl = document.getElementById('detail');
	detailEl.addEventListener( 'input', function() {
		drawOrbital();
	});

});

