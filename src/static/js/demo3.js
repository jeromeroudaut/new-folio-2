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
var backgroundMesh, backgroundScene, backgroundCamera;
var controls;
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
  canvas.style.zIndex   = -2;
  canvas.style.position = "absolute";
  //div.appendChild(canvas)


	//three init
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.autoClear = false;
	//renderer.setClearColor( 0x6534ff ); 

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 700;

	scene = new THREE.Scene();
	//scene.background = new THREE.Color( 0x26222e );

	// texture = new THREE.Texture(canvas);
	// texture.minFilter = texture.magFilter = THREE.LinearFilter;

	texture = new THREE.TextureLoader().load( '../../static/media/img/home/case/plants-ov2.jpg');
	// texture.minFilter = texture.magFilter = THREE.LinearFilter;
	//texture.minFilter = THREE.LinearFilter;
	texture.minFilter = texture.magFilter = THREE.LinearFilter;



	material = new THREE.MeshPhongMaterial( {
		color: 0xffffff, //change to brighten scene
		specular: 0xffffff,
		shininess: 80,
		map: texture,
		specularMap: texture, //only shine on white text
		transparent: true,
		opacity:0,
		side: THREE.DoubleSide
	});

  
	planeGeometry = new THREE.PlaneGeometry( CANVAS_W, CANVAS_H , MESH_DIMS, MESH_DIMS );
	plane = new THREE.Mesh( planeGeometry, material );
	scene.add( plane );
	perturbVerts();

	//normals helper
	normalsHelper = new THREE.FaceNormalsHelper( plane, 10, 0xffffff, 1 );
	scene.add( normalsHelper );
	normalsHelper.visible = false;

	//lights
	scene.add( new THREE.AmbientLight( 0xdddddd ) );

	var light = new THREE.SpotLight( 0xdddddd, .15);
	light.position.set( 0, 0, 2000 );
	scene.add( light );

	var directionalLight = new THREE.DirectionalLight( 0xdddddd, .095 );
	directionalLight.position.set( 100, 0, 50 );
	scene.add( directionalLight );


	//controls
  	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.minDistance = 1000;
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

  // anim = new S.Merom({el: material, p: {opacity: [0, 1]}, d: 2000, e: 'Power4Out'})
  // anim.play()
	drawText();
	setInterval(drawText,1000);

	animate();

	// document.addEventListener('mousemove', onMouseMove, false);

}
// const mouse = { x: 0, y: 0, nX: 0, nY: 0 }
// const Window = { w: window.innerWidth, h: window.innerHeight }

// function onMouseMove ( event ) {
// 	event.preventDefault()
// 	mouseX = event.clientX - window.innerWidth / 2;
// 	mouseY = event.clientY - window.innerHeight / 2;
//     mouseX  = event.clientX || mouseX 
//     mouseY = event.clientY || mouseY
//     mouse.nX = ( mouseX  / Window.w ) * 2 - 1
//     mouse.nY = ( mouseY / Window.h ) * 2 + 1
// }

// function onMouseMove(event) {
//     mouseX = event.clientX - window.innerWidth / 2;
//     mouseY = event.clientY - window.innerHeight / 2;
//     camera.position.x += (mouseX - camera.position.x) * 0.005;
// 	camera.position.y += (mouseY - camera.position.y) * 0.005;
//     //set up camera position
//     camera.lookAt(scene.position);
// };

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
	drawText();
}

function drawText(){

	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
  // var ampm = hours >= 12 ? 'PM' : 'AM';
  var ampm = 'FRONT-END';
  var ampm2 = 'DEVELOPER';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+ minutes : minutes;
	seconds = seconds < 10 ? '0'+ seconds : seconds;
  var timeStr = 'JOHN';
  var timeStr2 = 'MILNER';


	//account for 2 digit hours
	var extraDigit = (hours > 9);
	//var leftColumnX = extraDigit ? 0 : 150;
	var leftColumnX = 150;
	// var rightColumnX = extraDigit ? 1370 : 1220;
	var rightColumnX = 980;

	//wipe
  	//ctx.fillStyle =  'rgba(0, 0, 0, 1)';
	//ctx.fillStyle =  'rgba(72, 72, 72, 1)';
	var lingrad = ctx.createLinearGradient(0, 0, 0, 750);
	lingrad.addColorStop(0, '#ff3000');
	lingrad.addColorStop(0.25, '#ed0200');
	lingrad.addColorStop(0.50, '#ff096c');
	lingrad.addColorStop(0.75, '#ff1f44');
	lingrad.addColorStop(1, '#d50082');
	// lingrad.addColorStop(0, '#000851');  
	// lingrad.addColorStop(0.25, '#0000c1');
	// lingrad.addColorStop(0.50, '#0000c1');
	// lingrad.addColorStop(0.75, '#0000c1');
	// lingrad.addColorStop(1, '#0000c1');
	ctx.fillStyle = lingrad;
	//ctx.fillStyle = 'rgba(101, 52, 255, 1.0 )';
	//ctx.fillStyle = 'rgba(32, 32, 32, 1.0 )';
	//ctx.fillStyle = 'rgba(15, 17, 14, 1.0 )';
	// ctx.fillStyle = 'rgba(1, 38, 70, 1.0 )';
	// ctx.fillStyle = 'rgba(26, 26, 26, 1.0 )';
	// ctx.fillStyle = 'rgba(0, 0, 193, 1.0 )';
	//ctx.fillStyle = 'rgba(25, 25, 25, 1.0 )';
	ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
	ctx.textBaseline = 'top';
	ctx.fillStyle = 'rgba(255, 255, 255, 1.0 )'; //text color
	var topOffset = 280;

	//date
	// if (guiParams.showDate){
	// 	var day = days[ now.getDay() ];
	// 	var month = months[ now.getMonth() ];
	// 	var dayOfMonth = now.getDate();
	// 	var dateStr = day + ', ' + month + ' ' + dayOfMonth;
	//ctx.font = fontStyle(40,300);
	// 	ctx.fillText( dateStr, 700, 0);
	// }

	// if (guiParams.bigSeconds){
	// 	//big seconds
	// 	timeStr += ':' + seconds;
	// 	ctx.font =  fontStyle(350); //fontWeight + '370px' + fontName;
	// 	ctx.fillText( timeStr, leftColumnX, -50 + topOffset);
	// 	rightColumnX += extraDigit ? 80 : 180;

	// }else{
		//big time
		ctx.font =  fontStyle(300, 500);
    	ctx.fillText( timeStr, leftColumnX, -80 + topOffset);
    	ctx.fillText( timeStr2, leftColumnX, -80 + (topOffset + 200));
		//small seconds
		ctx.font =  fontStyle(180);
		//ctx.fillText( seconds, rightColumnX, 215 + topOffset);
	//}

	//am/pm
	if (guiParams.showPM){
		ctx.font =  fontStyle(60);
    ctx.fillText( ampm, (rightColumnX + 90), -35 + (topOffset + 70));
    ctx.fillText( ampm2, (rightColumnX + 90), -45 + (topOffset + 130));

	}

	texture.needsUpdate = true;


}

function fontStyle(px, weight){
	if (!weight) weight = '900';
  //return weight + ' ' + px + 'px Roboto';
  return weight + ' ' + px + 'px FuturaStd-ExtraBold';
}

function animate() {

	requestAnimationFrame( animate );

	displayTime += 0.01;

	//tilt plane
	// plane.rotation.x = Math.cos(displayTime/2) * 0.4 * guiParams.tiltAmount;
	// plane.rotation.y  = Math.sin(displayTime/2) * 0.2 * guiParams.tiltAmount;
	// plane.rotation.z  = Math.sin(displayTime/2 + 0.6) * 0.15 * guiParams.tiltAmount;

	perturbVerts();

	// stats.update();
	// controls.update();

	noisePos += guiParams.rippleSpeed/3000;
	normalsHelper.update();
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
