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

	const div = document.getElementById('glcanvas'); 
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


///// video transitions /////



	/*
	Timing function for smoothly animated transitions.
	Linear timing is too abrupt at edges.
	*/
	function easeInOut(t) {
		if (t < 0.5) {
			return 0.5 * Math.pow(t * 2, 2);
		}

		return -0.5 * (Math.pow(Math.abs(t * 2 - 2), 2) - 2);
	}

	/*
	Keeps a function from running too frequently in case it's too slow.
	We use it for resizing, which takes too long to be run every time
	the event fires when the user is dragging to resize the window.
	*/
	function debounce(func, wait) {
		var timeout,
			lastRun = 0;

		return function() {
			var context = this, args = arguments;

			if (Date.now() - lastRun >= wait) {
				lastRun = Date.now();
				func.apply(context, args);
			} else {
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					timeout = null;
					func.apply(context, args);
					lastRun = Date.now();
				}, wait);
			}
		};
	}

	var document = window.document,
		Seriously = window.Seriously,

		min = Math.min,
		abs = Math.abs,
		max = Math.max,

		formats = [
			'mp4',
			'webm'
		],
		videoSources = [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8'
		],
		videos = [],

		videoWidth = 1280,
		videoHeight = 720,

		seriously,
		target,

		resize,
		next,
		prev,
		timer,

		//state
		selectedIndex = -1,
		transition,
		activeTransition = 'channel',
		transitionStart = 0,
		previousVideo,
		nextVideo,
		playing = false,
		nextStep = 0,
		currentStep = 0,

		canvas = document.getElementById('canvas'),
		// controls = document.getElementById('controls'),
		// bigbutton = document.getElementById('bigbutton'),
		// infobutton = document.getElementById('infobutton'),
		// info = document.getElementById('info'),

		/*
		Each transition has its own callback functions:
		- init - set up the required effect nodes
		- start - attach the effect nodes to the video sources being transitioned
		- draw - runs every frame of the transition
		*/
		transitions = {
			whip: {
				title: 'Whip Pan',
				duration: 250,
				transformFrom: null,
				transformTo: null,
				blur: null,
				init: function () {
					var blur = seriously.effect('directionblur'),
						blend = seriously.effect('blend'),
						transformFrom = seriously.transform('2d'),
						transformTo = seriously.transform('2d');

					blend.bottom = transformFrom;
					blend.top = transformTo;
					blur.source = blend;

					this.transformFrom = transformFrom;
					this.transformTo = transformTo;
					this.blur = blur;
				},
				start: function (fromNode, toNode) {
					//todo: alternate direction of whip-pan
					this.transformFrom.source = fromNode;
					this.transformTo.source = toNode;

					return this.blur;
				},
				draw: function (amount) {
					//this.blur.amount = 1 - 2 * abs(amount - 0.5);
					amount = easeInOut(amount);
					this.transformFrom.translateX = this.transformFrom.width * amount;
					this.transformTo.translateX = -this.transformTo.width * (1 - amount);
					this.blur.amount = min(1, 1.2 * (1 - 2 * abs(amount - 0.5)) + 0.2);
				}
			},
			flash: {
				title: 'Flash',
				duration: 500,
				linear: null,
				blur: null,
				select: null,
				init: function () {
					var blur = seriously.effect('blur'),
						exposure = seriously.effect('exposure'),
						blend = seriously.effect('blend');

					blur.source = exposure;
					exposure.source = blend;

					this.blur = blur;
					this.exposure = exposure;
					this.blend = blend;
				},
				start: function (fromNode, toNode) {
					this.blend.bottom = fromNode;
					this.blend.top = toNode;
					this.blend.opacity = 0;

					return this.blur;
				},
				draw: function (amount) {
					this.blend.opacity = min(1, max(0, 1 - 8 * (0.5 - amount)));

					amount = 1 - 2 * abs(amount - 0.5);
					this.blur.amount = 0.8 * amount;
					this.exposure.exposure = 6 * amount;
				}
			},
			channel: {
				title: 'Channel Change',
				duration: 1500,
				volume: false,
				tvProps: {
					distortion: [0.02, 0.2],
					lineSync: [0.03, 0.2],
					verticalSync: [0, 1],
					bars: [0.4, 0.6]
				},
				tvglitch: null,
				init: function () {
					var tvglitch = seriously.effect('tvglitch');

					tvglitch.distortion = 0.02;
					tvglitch.verticalSync = 0;
					tvglitch.scanlines = 0.22;
					tvglitch.lineSync = 0.03;
					tvglitch.frameSharpness = 10.67;
					tvglitch.frameLimit = 0.3644;
					tvglitch.bars = 0.4;

					this.tvglitch = tvglitch;
				},
				start: function (fromNode, toNode) {
					this.tvglitch.source = toNode;
					return this.tvglitch;
				},
				draw: function (amount) {
					var factor = 0,
						key,
						prop,
						tvProps = this.tvProps,
						tvglitch = this.tvglitch;

					factor = 1 - amount;
					factor = max(factor, 0);
					factor = min(factor, 1);
					factor = Math.pow(factor, 2);

					for (key in tvProps) {
						if (tvProps.hasOwnProperty(key)) {
							prop = tvProps[key];
							tvglitch[key] = prop[0] + factor * (prop[1] - prop[0]);
						}
					}

					tvglitch.time = Date.now();
				}
			}
		};

		next  = debounce(function () {
 
			//Transition.disable_scroll() 
			if (currentStep >= 8) {
				nextStep = currentStep
			} else {
				nextStep = currentStep + 1
			}
			
			console.log('scrolling down - nextItem')
			currentStep = nextStep 
			
			console.log('selectedIndex: ' + selectedIndex)
			console.log('nextStep: ' + nextStep)
		
			return currentStep
			
		}, 1000, true);
		
		prev  = debounce(function () {

			// Transition.disable_scroll()
			//Transition.disable_scroll() 
			if (currentStep === 0) {
				nextStep = currentStep
			} else {
				nextStep = currentStep - 1
			}
			
			console.log('scrolling down - nextItem')
			currentStep = nextStep 
			
			console.log('selectedIndex: ' + selectedIndex)
			console.log('nextStep: ' + nextStep)
		
			return currentStep
			
		}, 1000, true);

	function initSeriously() {
		var key;
		seriously = new Seriously();
		target = seriously.target('#glcanvas');

		for (key in transitions) {
			if (transitions.hasOwnProperty(key)) {
				transitions[key].init();
			}
		}

		videos.forEach(function (obj) {
			var video = obj.element,
				reformat = seriously.transform('reformat');

			reformat.width = CANVAS_W;
			reformat.height = CANVAS_H;
			reformat.source = video;
			reformat.mode = 'cover';

			obj.reformat = reformat;
		});
	}

	// function updateButtonState() {
	// 	bigbutton.className = playing ? 'playing' : 'paused';
	// }

	function play() {
		if (nextVideo) {
			nextVideo.play();
			playing = !nextVideo.paused;
		}
		// updateButtonState();
	}

	function pause() {
		var i;
		playing = false;
		for (i = 0; i < videos.length; i++) {
			videos[i].element.pause();
		}
		updateButtonState();
	}

	function togglePlay() {
		if (playing) {
			pause();
		} else {
			play();
		}
	}

	function switchVideo(index) {
		if (!seriously || selectedIndex === index || index >= videos.length) {
			//no change, nothing to do here
			return;
		}

		if (selectedIndex >= 0) {
			transitionStart = Date.now();
			previousVideo = videos[selectedIndex].element;
			target.source = transition.start(videos[selectedIndex].reformat, videos[index].reformat);
		} else {
			target.source = videos[index].reformat;
		}

		selectedIndex = index;
		nextVideo = videos[selectedIndex].element;
		if (playing) {
			nextVideo.play();
		}

	}

	/*
	Runs repeatedly as long as the web page is visible, approximately every 16 milliseconds.
	Only does work while the transition is running, handles timing of the animation
	and volume cross-fade.
	*/
	function draw() {
		var progress;
		if (transitionStart) {
			progress = max(Date.now() - transitionStart, 0) / transition.duration;

			if (progress >= 1) {
				transitionStart = 0;
				target.source = videos[selectedIndex].reformat;
				if (previousVideo) {
					previousVideo.pause();
				}
			} else {
				if (transition.volume !== false) {
					if (previousVideo) {
						previousVideo.volume = min(1, max(0, 1 - progress));
					}
					nextVideo.volume = min(1, max(0, progress));
				} else {
					previousVideo.volume = 0;
					nextVideo.volume = 1;
				}

				transition.draw(progress);
			}
		}
	}

	function start() {
		var i;

		if (seriously) {
			return;
		}

		for (i = 0; i < videos.length; i++) {
			if (!videos[i].element.readyState) {
				return;
			}
		}

		initSeriously();
		//resize();
		seriously.go(draw);
		switchVideo(0);
		play();
	}

	function loadVideos() {
		var i,
			format,
			type,
			vid,
			maxDim,
			size = 'hd';

		//vid = document.createElement('video');

		/*
		Make our best guess about the appropriate video size
		*/
		maxDim = Math.max(screen.width, screen.height);
		if (window.matchMedia('handheld').matches || maxDim < 1280) {
			if (maxDim * (window.devicePixelRatio || 1) < 960) {
				size = 'small';
				videoWidth = 640;
				videoHeight = 360;
			} else {
				size = 'mid';
				videoWidth = 960;
				videoHeight = 540;
			}
		}

		for (i = 0; i < formats.length; i++) {
			type = 'video/' + formats[i];
			if (video.canPlayType && video.canPlayType(type)) {
				format = formats[i];
				break;
			}
		}

		if (!format) {
			//todo: display some kind of error
			console.log('Unable to play any video types');
			return;
		}

		videoSources.forEach(function (source, index) {
			var video = document.createElement('video'),
				button;

			video.type = type;
			video.src = 'video/' + source + '-' + size + '.' + format;
			video.crossOrigin = 'anonymous';
			video.preload = 'auto';
			video.id = 'video' + index;
			video.loop = true;
			video.controls = false; //for debugging

			/*
			Start every video at a random time. They all have a similar bumper at the
			beginning, so the transitions don't make for an effective demo if the videos
			all look the same.
			*/
			video.addEventListener('loadedmetadata', function () {
				video.currentTime = Math.random() * video.duration;
				start();
			}, false);
			video.load();

			

			// button = document.createElement('span');
			// button.style.backgroundImage = 'url(images/' + source + '.jpg)';
			// button.addEventListener('click', switchVideo.bind(null, index), false);
			// controls.appendChild(button);

			videos.push({
				element: video,
				reformat: null
			});
		});

		// updateButtonState();
	}

	/*
	Pause the video when this browser tab is in the background or minimized.
	Resume when it comes back in focus, but only if the user didn't pause manually.
	*/
	// function visibilityChange() {
	// 	if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden) {
	// 		videos[selectedIndex].element.pause();
	// 	} else if (playing) {
	// 		videos[selectedIndex].element.play();
	// 	}
	// }

	// resize = debounce(function () {
	// 	var width = Math.min(videoWidth, window.innerWidth),
	// 		height = Math.min(videoHeight, window.innerHeight);

	// 	if (width / height < 16 / 9) {
	// 		height = width * 9 / 16;
	// 	}

	// 	canvas.style.width = width + 'px';
	// 	canvas.style.height = height + 'px';

	// 	/*
	// 	If it's a big enough screen and we have a retina display, let's take advantage.
	// 	We assume that the GPU will be able to handle it
	// 	*/
	// 	if (window.screen.width * window.devicePixelRatio > videoWidth) {
	// 		width *= window.devicePixelRatio;
	// 		height *= window.devicePixelRatio;
	// 	}

	// 	canvas.width = width;
	// 	canvas.height = height;

	// 	videos.forEach(function (obj) {
	// 		obj.reformat.width = width;
	// 		obj.reformat.height = height;
	// 	});
	// }, 30, true);

	transition = transitions[activeTransition];
	loadVideos();

	// Object.keys(transitions).forEach(function (t) {
	// 	var button = document.getElementById(t);
	// 	transitions[t].button = button;

	// 	button.addEventListener('click', function () {
	// 		transitions[activeTransition].button.className = '';
	// 		activeTransition = t;
	// 		transition = transitions[activeTransition];
	// 		button.className = 'active';
	// 	});
	// });
	//document.getElementById(activeTransition).className = 'active';

	// document.addEventListener('visibilitychange', visibilityChange);
	// document.addEventListener('mozvisibilitychange', visibilityChange);
	// document.addEventListener('msvisibilitychange', visibilityChange);
	// document.addEventListener('webkitvisibilitychange', visibilityChange);

	window.addEventListener('orientationchange', resize);
	window.addEventListener('resize', resize);

	// canvas.addEventListener('click', togglePlay);
	// bigbutton.addEventListener('click', togglePlay);

	// var body = document.querySelector('body');
	// body.addEventListener('mouseWheel', Transition.headerScroll);
	// canvas.addEventListener('mouseWheel', Transition.headerScroll);
	// bigbutton.addEventListener('mouseWheel', Transition.headerScroll);

	window.addEventListener('wheel', function(e) {
		if (e.deltaY > 0) {
			console.log('scrolling down');
			document.getElementById('status').innerHTML = 'scrolling down';
			if(timer) {
			  window.clearTimeout(timer);
			}
			timer = window.setTimeout(function() {
			 // actual code here. Your call back function.
			next();
			console.log( "Firing!" );
			}, 100);
			switchVideo(currentStep + 1);

		}
		if (e.deltaY < 0) {
		  console.log('scrolling up');
		  document.getElementById('status').innerHTML = 'scrolling up';
		  if(timer) {
			window.clearTimeout(timer);
		  }
		  timer = window.setTimeout(function() {
		   // actual code here. Your call back function.
		  prev();
		  console.log( "Firing!" );
		  }, 100);
		  
		  switchVideo(currentStep - 1);

		}
		
	  });


	/*
	User can press the space bar to toggle pause/play
	*/
	window.addEventListener('keyup', function(evt) {
		if (evt.which === 32) {
			togglePlay();
		}
	}, true);

	// infobutton.addEventListener('click', function () {
	// 	if (info.className) {
	// 		info.className = '';
	// 	} else {
	// 		info.className = 'open';
	// 	}
	// });


