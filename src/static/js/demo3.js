/* global ImprovedNoise, THREE, window, dat, Stats, document, TweenLite, requestAnimationFrame */

/*

	Ripple Clock
	Simple Phong material plane with vert z posns modified by perlin noise.
	Using canvas to draw text on plane.

	(C) @felixturner / www.airtight.cc

*/


//var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var days = ['Front-End Web Developer'];
//var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var CANVAS_W = 1600;
var CANVAS_H = 900;
var MESH_DIMS = 20;
var canvasAspect = CANVAS_W/CANVAS_H;

var noise = new ImprovedNoise();
var displayTime = Math.random()*10;
var noisePos = Math.random()*1000;

var camera, scene, renderer;
var plane, material, texture, planeGeometry;
var video, image, imageContext;
var gui, stats;
var normalsHelper;
var canvas, ctx;

var guiParams = {
	rippleSpeed: 15,
	rippleSize: 1.2,
	rippleDepth: 110,
	tiltAmount: 1,
	normals:false,
	bigSeconds: false,
	showDate: true,
	showPM:true,
	stats: false
};

function init() {

	//init gui
	// gui = new dat.GUI();
	// gui.add(guiParams, 'rippleSpeed', 0, 30).onChange(onParamsChange);
	// gui.add(guiParams, 'rippleSize', 0, 5).onChange(onParamsChange);
	// gui.add(guiParams, 'rippleDepth', 0, 200).onChange(onParamsChange);
	// gui.add(guiParams, 'tiltAmount', 0, 1).onChange(onParamsChange);
	// gui.add(guiParams, 'bigSeconds').onChange(onParamsChange);
	// gui.add(guiParams, 'showDate').onChange(onParamsChange);
	// gui.add(guiParams, 'showPM').onChange(onParamsChange);
	// gui.add(guiParams, 'normals').onChange(onParamsChange);
	// gui.add(guiParams, 'stats').onChange(onParamsChange);
	// gui.close();

  //init Canvas
  	const canvas = document.createElement('canvas');
	canvas.width  = CANVAS_W;
	canvas.height = CANVAS_H;
	ctx = canvas.getContext('2d');

	const div = document.getElementById('glcanvas-wrap'); 
	canvas.id     = "glcanvas";
	canvas.style.zIndex   = -1;
	canvas.style.position = "absolute";

	video = document.getElementById( 'video' );


	//three init
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.background = "#0f110e"
	//renderer.autoClear = false;
	//renderer.setClearColor( 0xfc522e ); 

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 700;

	scene = new THREE.Scene();

	texture = new THREE.Texture(canvas);
	// texture = new THREE.TextureLoader().load( '../../static/media/img/home/case/archi.jpg');
	texture.minFilter = texture.magFilter = THREE.LinearFilter;
	
	// var texture = new THREE.VideoTexture( video );
	// texture.minFilter = THREE.LinearFilter;
	// texture.magFilter = THREE.LinearFilter;
	// texture.format = THREE.RGBFormat;


	material = new THREE.MeshPhongMaterial( {
		color: 0x666666,
		specular: 0xdddddd,
		shininess: 20,
		map: texture,
		specularMap: texture, //only shine on white text
		transparent: true,
		opacity:0,
		side: THREE.DoubleSide,
	});

	planeGeometry = new THREE.PlaneGeometry( CANVAS_W, CANVAS_H , MESH_DIMS, MESH_DIMS );
	plane = new THREE.Mesh( planeGeometry, material );
	scene.add( plane );
	perturbVerts();

	//normals helper
	normalsHelper = new THREE.FaceNormalsHelper( plane, 10, 0x00ff00, 1 );
	scene.add( normalsHelper );
	normalsHelper.visible = false;

	//lights
	scene.add( new THREE.AmbientLight( 0x666666 ) );

	var light = new THREE.SpotLight( 0xffffff, 0.4);
	light.position.set( 0, 0, 2000 );
	scene.add( light );

	var directionalLight = new THREE.DirectionalLight( 0xdddddd, 1 );
	directionalLight.position.set( 100, 0, 50 );
	scene.add( directionalLight );

	//controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.minDistance = 100;
	controls.maxDistance = 5000;

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.display = 'none';

	//document.body.appendChild( stats.domElement );
	div.appendChild( renderer.domElement );

	onParamsChange();

	window.addEventListener( 'resize', onResize, false );
	onResize();

	//fade up from black
	TweenLite.to(material, 2, {opacity:1});
	//drawText();
	//setInterval(drawText,1000);

	animate();


}


function perturbVerts(){

	planeGeometry.vertices.forEach( function(vert) {
		vert.z = getZPos(vert);
	});

	planeGeometry.verticesNeedUpdate = true;
	planeGeometry.computeFaceNormals();
	planeGeometry.computeVertexNormals();
	planeGeometry.normalsNeedUpdate = true;

}

function getZPos(vert){

	//get vert z-posns from mr perlin
	var noiseScale = guiParams.rippleSize / 1000;
	var zpos = noise.noise(vert.x  * noiseScale + noisePos,
		vert.y  * noiseScale + noisePos, 0)  * guiParams.rippleDepth;
	return zpos ;
}


function onParamsChange() {
	normalsHelper.visible = guiParams.normals;
	stats.domElement.style.display = guiParams.stats ? 'block' : 'none';
	perturbVerts();
	//drawText();
}

// function drawText(){

// 	var now = new Date();
// 	var hours = now.getHours();
// 	var minutes = now.getMinutes();
// 	var seconds = now.getSeconds();
//   // var ampm = hours >= 12 ? 'PM' : 'AM';
//   var ampm = 'FRONT-END';
//   var ampm2 = 'DEVELOPER';
// 	hours = hours % 12;
// 	hours = hours ? hours : 12; // the hour '0' should be '12'
// 	minutes = minutes < 10 ? '0'+ minutes : minutes;
// 	seconds = seconds < 10 ? '0'+ seconds : seconds;
//   var timeStr = 'JOHN';
//   var timeStr2 = 'MILNER';


// 	//account for 2 digit hours
// 	var extraDigit = (hours > 9);
// 	//var leftColumnX = extraDigit ? 0 : 150;
// 	var leftColumnX = 150;
// 	// var rightColumnX = extraDigit ? 1370 : 1220;
// 	var rightColumnX = 980;

// 	//wipe
// 	//ctx.fillStyle =  'rgba(0, 0, 0, 1)';
// 	//ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
	
// 	// ctx.textBaseline = 'top';
// 	// ctx.fillStyle = 'rgba(200, 200, 200, 1.0 )'; //text color
// 	var topOffset = 80;

// 	//date
// 	// if (guiParams.showDate){
// 	// 	var day = days[ now.getDay() ];
// 	// 	var month = months[ now.getMonth() ];
// 	// 	var dayOfMonth = now.getDate();
// 	// 	var dateStr = day + ', ' + month + ' ' + dayOfMonth;
// 	//ctx.font = fontStyle(40,300);
// 	// 	ctx.fillText( dateStr, 700, 0);
// 	// }

// 	// if (guiParams.bigSeconds){
// 	// 	//big seconds
// 	// 	timeStr += ':' + seconds;
// 	// 	ctx.font =  fontStyle(350); //fontWeight + '370px' + fontName;
// 	// 	ctx.fillText( timeStr, leftColumnX, -50 + topOffset);
// 	// 	rightColumnX += extraDigit ? 80 : 180;

// 	// }else{
// 		//big time
// 		ctx.font =  fontStyle(300, 500);
//     	ctx.fillText( timeStr, leftColumnX, -80 + topOffset);
//     	ctx.fillText( timeStr2, leftColumnX, -80 + (topOffset + 200));
// 		//small seconds
// 		ctx.font =  fontStyle(180);
// 		//ctx.fillText( seconds, rightColumnX, 215 + topOffset);
// 	//}

// 	//am/pm
// 	if (guiParams.showPM){
// 		ctx.font =  fontStyle(60);
//     ctx.fillText( ampm, (rightColumnX + 90), -35 + (topOffset + 70));
//     ctx.fillText( ampm2, (rightColumnX + 90), -45 + (topOffset + 130));

// 	}

// 	// texture.needsUpdate = true;


// }

function fontStyle(px, weight){
	if (!weight) weight = '900';
  //return weight + ' ' + px + 'px Roboto';
  return weight + ' ' + px + 'px FuturaStd-ExtraBold';
}

function animate() {

	requestAnimationFrame( animate );

	displayTime += 0.01;

	//tilt plane
	plane.rotation.x = Math.cos(displayTime/2) * 0.4 * guiParams.tiltAmount;
	plane.rotation.y  = Math.sin(displayTime/2) * 0.2 * guiParams.tiltAmount;
	plane.rotation.z  = Math.sin(displayTime/2 + 0.6) * 0.15 * guiParams.tiltAmount;

	perturbVerts();

	// stats.update();
	// controls.update();

	noisePos += guiParams.rippleSpeed/5000;
	normalsHelper.update();
	if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
		ctx.drawImage( video, 100, 0 );
		if ( texture ) texture.needsUpdate = true;
	}
	//renderer.clear();
	//renderer.render( backgroundScene, backgroundCamera );
	renderer.render( scene, camera );

}

function onResize() {

	var w = window.innerWidth;
	var h = window.innerHeight;

	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	renderer.setSize( w,h);

	//handle tall viewports - shrink plane when vp width shrinks
	var scl = (camera.aspect < canvasAspect) ?  camera.aspect /canvasAspect : 1;
	scl *= 1.65;
	plane.scale.set(scl,scl, scl);

}

init();


// var AMOUNT = 100;
// 			var container, stats;
// 			var camera, scene, renderer;
// 			var video, image, imageContext,
// 			imageReflection, imageReflectionContext, imageReflectionGradient,
// 			texture, textureReflection;
// 			var mesh;
// 			var mouseX = 0;
// 			var mouseY = 0;
// 			var windowHalfX = window.innerWidth / 2;
// 			var windowHalfY = window.innerHeight / 2;
// 			init();
// 			animate();
// 			function init() {
// 				container = document.createElement( 'div' );
// 				document.body.appendChild( container );
// 				// var info = document.createElement( 'div' );
// 				// info.style.position = 'absolute';
// 				// info.style.top = '10px';
// 				// info.style.width = '100%';
// 				// info.style.textAlign = 'center';
// 				// info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - video demo. playing <a href="http://durian.blender.org/" target="_blank" rel="noopener">sintel</a> trailer';
// 				// container.appendChild( info );
// 				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
// 				camera.position.z = 1000;
// 				scene = new THREE.Scene();
// 				scene.background = new THREE.Color( 0xf0f0f0 );
// 				video = document.getElementById( 'video' );
// 				//
// 				image = document.createElement( 'canvas' );
// 				image.width = 480;
// 				image.height = 204;
// 				imageContext = image.getContext( '2d' );
// 				imageContext.fillStyle = '#000000';
// 				imageContext.fillRect( 0, 0, 480, 204 );
// 				texture = new THREE.Texture( image );
// 				var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
// 				imageReflection = document.createElement( 'canvas' );
// 				imageReflection.width = 480;
// 				imageReflection.height = 204;
// 				imageReflectionContext = imageReflection.getContext( '2d' );
// 				imageReflectionContext.fillStyle = '#000000';
// 				imageReflectionContext.fillRect( 0, 0, 480, 204 );
// 				imageReflectionGradient = imageReflectionContext.createLinearGradient( 0, 0, 0, 204 );
// 				imageReflectionGradient.addColorStop( 0.2, 'rgba(240, 240, 240, 1)' );
// 				imageReflectionGradient.addColorStop( 1, 'rgba(240, 240, 240, 0.8)' );
// 				textureReflection = new THREE.Texture( imageReflection );
// 				var materialReflection = new THREE.MeshBasicMaterial( { map: textureReflection, side: THREE.BackSide, overdraw: 0.5 } );
// 				//
// 				var plane = new THREE.PlaneGeometry( 480, 204, 4, 4 );
// 				mesh = new THREE.Mesh( plane, material );
// 				mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
// 				scene.add(mesh);
// 				mesh = new THREE.Mesh( plane, materialReflection );
// 				mesh.position.y = -306;
// 				mesh.rotation.x = - Math.PI;
// 				mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
// 				scene.add( mesh );
// 				//
// 				var separation = 150;
// 				var amountx = 10;
// 				var amounty = 10;
// 				var PI2 = Math.PI * 2;
// 				// var material = new THREE.SpriteCanvasMaterial( {
// 				// 	color: 0x0808080,
// 				// 	program: function ( context ) {
// 				// 		context.beginPath();
// 				// 		context.arc( 0, 0, 0.5, 0, PI2, true );
// 				// 		context.fill();
// 				// 	}
// 				// } );
// 				var material = new THREE.MeshPhongMaterial( {
// 					color: 0xeeeeee, //change to brighten scene
// 					specular: 0xffffff,
// 					shininess: 80,
// 					map: texture,
// 					specularMap: texture, //only shine on white text
// 					transparent: true,
// 					opacity:0,
// 					side: THREE.DoubleSide
// 				});
// 				for ( var ix = 0; ix < amountx; ix++ ) {
// 					for ( var iy = 0; iy < amounty; iy++ ) {
// 						var sprite = new THREE.Sprite( material );
// 						sprite.position.x = ix * separation - ( ( amountx * separation ) / 2 );
// 						sprite.position.y = -153;
// 						sprite.position.z = iy * separation - ( ( amounty * separation ) / 2 );
// 						sprite.scale.setScalar( 2 );
// 						scene.add( sprite );
// 					}
// 				}
// 				renderer = new THREE.WebGLRenderer({ antialias: true} );
// 				renderer.setPixelRatio( window.devicePixelRatio );
// 				renderer.setSize( window.innerWidth, window.innerHeight );
// 				container.appendChild( renderer.domElement );
// 				// stats = new Stats();
// 				// container.appendChild( stats.dom );
// 				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// 				//
// 				window.addEventListener( 'resize', onWindowResize, false );
// 			}
// 			function onWindowResize() {
// 				windowHalfX = window.innerWidth / 2;
// 				windowHalfY = window.innerHeight / 2;
// 				camera.aspect = window.innerWidth / window.innerHeight;
// 				camera.updateProjectionMatrix();
// 				renderer.setSize( window.innerWidth, window.innerHeight );
// 			}
// 			function onDocumentMouseMove( event ) {
// 				mouseX = ( event.clientX - windowHalfX );
// 				mouseY = ( event.clientY - windowHalfY ) * 0.2;
// 			}
// 			//
// 			function animate() {
// 				requestAnimationFrame( animate );
// 				render();
// 				//stats.update();
// 			}
// 			function render() {
// 				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
// 				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
// 				camera.lookAt( scene.position );
// 				if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
// 					imageContext.drawImage( video, 0, 0 );
// 					if ( texture ) texture.needsUpdate = true;
// 					if ( textureReflection ) textureReflection.needsUpdate = true;
// 				}
// 				imageReflectionContext.drawImage( image, 0, 0 );
// 				imageReflectionContext.fillStyle = imageReflectionGradient;
// 				imageReflectionContext.fillRect( 0, 0, 480, 204 );
// 				renderer.render( scene, camera );
// 			}