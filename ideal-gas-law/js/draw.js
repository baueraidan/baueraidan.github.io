
// set up scene and renderer
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// initialize and position the camera
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000000 );
camera.up.set( 0, 0, 1 );
camera.position.set( 20000, 40000, 16000 );

// orbit controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enableKeys = false;

// skybox backdrop
var textureCube = new THREE.CubeTextureLoader()
	.setPath( 'img/')
	.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
scene.background = textureCube;

// handle window resize
window.addEventListener( 'resize', function() {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

// square a number
function sq( num ) {
  return num * num;
}


// create container box
function createBox( range ) {

	// add box
	var geometry = new THREE.Geometry();
	geometry.vertices.push( new THREE.Vector3( -range, -range, -range ) );
	geometry.vertices.push( new THREE.Vector3( range, range, range ) );
	var boxMesh = new THREE.Line( geometry );
	BOX = new THREE.BoxHelper( boxMesh, 'white' );
	scene.add( BOX );

	// add planes
	for ( var i = 0; i < 6; i++ ) {
		var geometry = new THREE.PlaneGeometry( range*2, range*2 );
		var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
		var plane = new THREE.Mesh( geometry, material );

		switch (i) {
			case 0:
				plane.position.y = range;
				plane.rotateX( Math.PI / 2 );
				break;
			case 1:
				plane.position.y = -range;
				plane.rotateX( -Math.PI / 2 );
				break;
			case 2:
				plane.position.z = range;
				plane.rotateY( Math.PI );
				break;
			case 3:
				plane.position.z = -range;
				plane.rotateY( 0 );
				break;
			case 4:
				plane.position.x = range;
				plane.rotateY( -Math.PI / 2 );
				break;
			case 5:
				plane.position.x = -range;
				plane.rotateY( Math.PI / 2 );
				break;
		}

		scene.add( plane );
		PLANES.push( plane );
	}
}


// resize container box
function resizeBox( range ) {

	RANGE = range;
	scene.remove( BOX );
	for ( var i = 0; i < 6; i++ ) {
		var plane = PLANES[i];
		scene.remove( plane );
	}
	PLANES = [];
	createBox( range );
}


// add new particle to scene
function addBall() {
	var geometry = new THREE.SphereGeometry( RADIUS, 32, 32 );
	var material = new THREE.MeshPhongMaterial();
	material.color = new THREE.Color().setHSL( 0.0, 1, .5 );
	var ball = new THREE.Mesh( geometry, material );

	var works = true;
	do {
		works = true;
		// random position
		var x = ( RANGE - RADIUS ) * ( 2 * Math.random() - 1 ),
			y = ( RANGE - RADIUS ) * ( 2 * Math.random() - 1 ),
			z = ( RANGE - RADIUS ) * ( 2 * Math.random() - 1 );
		ball.position.set( x, y, z );

		for ( var k = 0; k < balls.length; k++ ) {
			var b2 = balls[k];
			var x2 = b2.position.x,
				y2 = b2.position.y,
				z2 = b2.position.z;
			var dist = Math.sqrt( sq( x-x2 ) + sq( y-y2 ) + sq( z-z2 ) );
			if ( dist < RADIUS*2 ) {
				works = false;
				break;
			}

		}
	} while ( !works );

	// random velocity in picometers per frame
	// 1 frame = 0.0166666667 seconds
	// 60 frames = 1 second
	var speed = 100;
	var vX = speed * ( 2 * Math.random() - 1 ),
		vY = speed * ( 2 * Math.random() - 1 ),
		vZ = speed * ( 2 * Math.random() - 1 );
	ball.v = new THREE.Vector3( vX, vY, vZ );
	ball.castShadow = true;
	ball.receiveShadow = true;
	balls.push( ball );
	scene.add( ball );
}


// remove a random particle from the scene
function removeBall() {

	var index = Math.floor( Math.random() * balls.length );
	var ball = balls[index];
	scene.remove( ball );
	balls.splice( index, 1 );
}


// animation loop to render scene
function render() {

	requestAnimFrame( render );

	renderer.render( scene, camera );
	for ( var i = 0; i < balls.length; i++ ) {
		var b1 = balls[i];
		var plus = b1.position.clone().addScalar( RADIUS ).add( b1.v );
		var minus = b1.position.clone().subScalar( RADIUS ).add( b1.v );

		// reverse velocity components at walls
		if ( plus.x > RANGE || minus.x < -RANGE ) b1.v.x = -b1.v.x;
		if ( plus.y > RANGE || minus.y < -RANGE ) b1.v.y = -b1.v.y;
		if ( plus.z > RANGE || minus.z < -RANGE ) b1.v.z = -b1.v.z;

		// make sure coordinates are within bounds
		b1.position.x = Math.min( b1.position.x, RANGE - RADIUS );
		b1.position.x = Math.max( b1.position.x, -RANGE + RADIUS );
		b1.position.y = Math.min( b1.position.y, RANGE - RADIUS );
		b1.position.y = Math.max( b1.position.y, -RANGE + RADIUS );
		b1.position.z = Math.min( b1.position.z, RANGE - RADIUS );
		b1.position.z = Math.max( b1.position.z, -RANGE + RADIUS );

		// handle collisions with other particles
		for ( var j = i + 1; j < balls.length; j++ ) { 
			var b2 = balls[j];
			var separation = b1.position.clone().add( b1.v ).sub( b2.position ).sub( b2.v ).length();
			// if balls are colliding, calculate new velocities
			if ( separation < 2 * RADIUS ) {
				var normal = b1.position.clone().sub( b2.position ).normalize();
				var relativeVelocity = b1.v.clone().sub( b2.v );
				var dot = relativeVelocity.dot( normal );
				normal = normal.multiplyScalar( dot );
				b1.v.sub( normal );
				b2.v.add( normal );
			}
		}			
		b1.position.add( balls[i].v );

	}

	// update orbit controls
	controls.update();
}


// return the average velocity of all particles
function averageVelocity() {
	var sum = 0;
	for ( var i = 0; i < balls.length; i++ ) {
		var v = balls[i].v;
		sum += Math.sqrt( sq(v.x) + sq(v.y) + sq(v.z) );
	}
	return sum / balls.length;
}


// multiply all particle velocities by some scalar
function multVelocities( num ) {
	for ( var i = 0; i < balls.length; i++ ) {
		var v = balls[i].v;
		v.x *= num;
		v.y *= num;
		v.z *= num;
	}
}


// change the average velocity of all of the particles
function changeAverageVelocity( vel ) {
	var avg = averageVelocity();
	var num = vel / avg;
	multVelocities( num );
}


// change the amount of particles by adding/removing
function changeNumberBalls( newAmount ) {

	var startingVelocity = averageVelocity();

	var change = Math.abs( balls.length - newAmount );
	for ( var i = 0; i < change; i++ ) {
		if ( newAmount < balls.length ) {
			removeBall();
		}
		else {
			addBall();
		}
	}

	changeAverageVelocity( startingVelocity );
}


// return the average temperature of the particles
function getTemperature() {
	var velocityInMetersPerSecond = averageVelocity() * (60/1.0e12) * TIME_SCALE;
	return sq(velocityInMetersPerSecond) / HEAT_CAPACITY;
}


// return the pressure of the system, in atm
function getPressure() {
	var V = VOLUME / 1.0e24,
		R = 0.082057,
		T = getTemperature(),
		n = balls.length / 6.0221409e+23;

	return ( n * R * T ) / V;
}


// update the current pressure
function updatePressure() {
	document.getElementById( 'pressure-value' ).innerHTML = getPressure().toFixed(3) + ' atm';
}


// update the current volume
function updateVolume() {
	var val = parseInt( volumeRangeEl.value );
	VOLUME = val;
	var range = Math.pow( val * 1e+9, 1/3 ) / 2;
	RANGE = range;
	resizeBox( RANGE );
	document.getElementById( 'volume-value' ).innerHTML = val + ' yL';
	updatePressure();
}


// update the number of particles
function updateParticles() {
	var val = parseInt( particlesRangeEl.value );
	changeNumberBalls( val );
	document.getElementById( 'particles-value' ).innerHTML = val;
	updatePressure();
}


// update the pressure
function updateTemperature() {
	var val =  parseInt( temperatureRangeEl.value );
	var newVelocity = Math.sqrt( val * HEAT_CAPACITY ) / ((60/1.0e12) * TIME_SCALE);
	changeAverageVelocity( newVelocity );
	document.getElementById( 'temperature-value' ).innerHTML = val + ' K';
	updatePressure();
}


// on document load...
document.addEventListener( 'DOMContentLoaded', function() {

	// create the container box
	createBox( RANGE );

	// add balls
	for ( var i = 0; i < 60; i++ ) {
		addBall();
	}
	changeAverageVelocity( 100 );

	// add ambient lighting
	var ambient = new THREE.AmbientLight( 0xffffff );
	ambient.intensity = 0.6;
	scene.add( ambient );

	// add a point light in the middle of the box
	var point = new THREE.PointLight( 0xffffff );
	point.intensity = 0.4;
	scene.add( point );

	// append the renderer to the <body> and start render animation loop
	document.body.appendChild( renderer.domElement );
	render();

	// slider elements
	volumeRangeEl = document.getElementById( 'volume-range' );
	particlesRangeEl = document.getElementById( 'particles-range' );
	temperatureRangeEl = document.getElementById( 'temperature-range' );

	// update parameters
	updateVolume();
	updateParticles();
	updateTemperature();

	// bind event listeners
	volumeRangeEl.addEventListener( 'input', updateVolume, false );
	particlesRangeEl.addEventListener( 'change', updateParticles, false );
	temperatureRangeEl.addEventListener( 'input', updateTemperature, false );

});

