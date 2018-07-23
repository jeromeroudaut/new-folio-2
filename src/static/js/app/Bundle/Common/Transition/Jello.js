import S from 'skylake'

//export default class Jello {

// class Jello {

  // class Jello {
  // Cached variables that can be used and changed in all the functions in the class
  // constructor() {

  //   if (!(this instanceof Jello)) {
  //       throw new Error("Jello needs to be called with the new keyword");
  //   }
    const Jello = {}

    Jello.defaults = {};
    Jello.options = {};
    Jello.canvasHolder = document.getElementById('jello-container');
    Jello.imgWidth = 1920;
    Jello.imgHeight = 960;
    Jello.imgRatio = Jello.imgHeight / Jello.imgWidth;
    Jello.winWidth = window.innerWidth;
    Jello.bgArray = [];
    Jello.bgSpriteArray = [];
    Jello.renderer = PIXI.autoDetectRenderer( Jello.winWidth, (Jello.winWidth * Jello.imgRatio) );
    Jello.stage = new PIXI.Container();
    Jello.imgContainer = new PIXI.Container();
    Jello.imageCounter = 0;
    Jello.displacementSprite = PIXI.Sprite.fromImage('static/media/img/distortion/clouds.jpg');
    Jello.displacementFilter = new PIXI.filters.DisplacementFilter(Jello.displacementSprite);
    Jello.currentMap = {};
    Jello.mapCounter = 0;
    Jello.mapArray = [];
    //sJello.raf = Jello.animateFilters.bind(Jello.raf);
    // Jello.raf = this.animateFilters.bind(this);
    //Jello.cycleImage = Jello.changeImage.bind(this)

    Jello.isDistorted = false; // begin transition with no distortion
    Jello.isTransitioning = false;


  // }

  // define animations and call Jello.raf
  Jello.animateFilters = function() {
    Jello.displacementFilter.scale.x = Jello.settings.dispX ? Jello.settings.transition * Jello.settings.dispScale : 0;
    Jello.displacementFilter.scale.y = Jello.settings.dispY ? Jello.settings.transition * (Jello.settings.dispScale + 10) : 0;

    Jello.displacementSprite.x = Math.sin(Jello.settings.count * 0.15) * 200;
    Jello.displacementSprite.y = Math.cos(Jello.settings.count * 0.13) * 200;

    Jello.displacementSprite.rotation = Jello.settings.count * 0.06;

    Jello.settings.count += 0.05 * Jello.settings.speed;

    Jello.renderer.render(Jello.stage);

    //window.requestAnimationFrame(Jello.raf);
  }

  // canvas built to fill width of window
  Jello.backgroundFill = function() {
    Jello.renderer.view.setAttribute('style', 'height:auto;width:100%;');
  }

  // main container for animation
  Jello.buildStage = function() {
    Jello.imgContainer.position.x = Jello.imgWidth / 2;
    Jello.imgContainer.position.y = Jello.imgHeight / 2;

    Jello.stage.scale.x = Jello.stage.scale.y = Jello.winWidth / Jello.imgWidth;
    Jello.stage.interactive = true;
    Jello.stage.addChild(Jello.imgContainer);
  }

  // cycle through Jello.bgArray and change images with crossfade
  Jello.changeImage = function() {
    if(Jello.imageCounter < (Jello.bgArray.length - 1)) {
      Jello.imageCounter++;
    } else {
      Jello.imageCounter = 0;
    }

    Jello.bgSpriteArray.map((sprite, i, callback) => {

      if(i == Jello.imageCounter) {
        TweenLite.to(sprite, 2, {alpha: 1, ease:Power2.easeInOut, onComplete: Jello.toggleDistortionOut, onCompleteScope: this});
      } else {
        TweenLite.to(sprite, 2, {alpha: 0, ease:Power2.easeInOut});
      }
    });
  }

  // cycle through Jello.mapArray and change displacement maps
  Jello.changeMap = function() {
    if(Jello.mapCounter < (Jello.mapArray.length - 1)) {
      Jello.mapCounter++;
    } else {
      Jello.mapCounter = 0;
    }

    Jello.currentMap = Jello.mapArray[Jello.mapCounter];
    console.log(Jello.currentMap)
    Jello.displacementSprite = PIXI.Sprite.fromImage(`/static/media/img/distortion/${Jello.currentMap.image}`);
    Jello.displacementFilter = new PIXI.filters.DisplacementFilter(Jello.displacementSprite);
    Jello.createFilters();
  }

  // preload all backgrounds for quick transitions
  Jello.createBackgrounds = function() {
    Jello.bgArray.map((image) => {
      const bg = PIXI.Sprite.fromImage(`/static/media/img/bg/${image}.jpg`);
      // create a video texture from a path
      //var bg = PIXI.Texture.fromVideo(`/assets/images/bg/${image}.mp4`);

      // create a new Sprite using the video texture (yes it's that easy)
      // var videoSprite = new PIXI.Sprite(bg);

      // // Stetch the fullscreen
      // // videoSprite.width = app.screen.width;
      // // videoSprite.height = app.screen.height;
      // videoSprite.autoPlay = true;
      // videoSprite.loop = true; 
      // // Set image anchor to the center of the image
      // videoSprite.anchor.x = 0.5;
      // videoSprite.anchor.y = 0.5;      
      bg.anchor.x = 0.5;
      bg.anchor.y = 0.5;  

      // Jello.imgContainer.addChild(videoSprite);
      // Jello.bgSpriteArray.push(videoSprite);

      Jello.imgContainer.addChild(bg);
      Jello.bgSpriteArray.push(bg);

      // set first image alpha to 1, all else to 0
      bg.alpha = Jello.bgSpriteArray.length === 1 ? 1 : 0;
    });
  }

  // distortion filters added to stage
  Jello.createFilters = function() {
    Jello.stage.addChild(Jello.displacementSprite);

    Jello.displacementFilter.scale.x = Jello.displacementFilter.scale.y = Jello.winWidth / Jello.imgWidth;

    Jello.imgContainer.filters = [
      Jello.displacementFilter
    ]
  }

  // function changes the distortion level to a specific amount
  Jello.distortionLevel = function(amt) {
    if(!Jello.isTransitioning){
      Jello.isTransitioning = true;
      TweenLite.to(Jello.settings, 1, {
        transition: amt,
        speed: Jello.currentMap.speed,
        dispScale: Jello.currentMap.scale,
        ease: Power2.easeInOut,
        onComplete: () => {
          Jello.isTransitioning = false;
        }
      });
    }
  }

  // scroll events

  Jello.initScroll = function() {
    window.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
      Jello.toggleDistortionIn(1, Jello.changeImage.bind(this))
      // Jello.changeImage()
      console.log('scrolling down')
      }
      if (e.deltaY < 0) {
      Jello.toggleDistortionIn(1, Jello.changeImage.bind(this))
      // Jello.changeImage()
      console.log('scrolling up')
      }
    })

  }
  // click events
//   eventListener() {
//     const changeImageBtn = document.getElementsByClassName('js-change-image')[0];
//     const changeDistortionBtn = document.getElementsByClassName('js-change-distortion')[0];
//     const toggleDistorionBtn = document.getElementsByClassName('js-toggle-distortion')[0];

//     changeImageBtn.onclick = () => {
//       Jello.changeImage();
//     }

//     changeDistortionBtn.onclick = () => {
//       Jello.changeMap();
//     }

//     toggleDistorionBtn.onclick = () => {
//       Jello.toggleDistortion();
//     }
  
// }


  // turn the distortion on and off using the options.transistion variable
  // toggleDistortion(dis, callback) {
  //   if(!Jello.isDistorted) {
  //     Jello.distortionLevel(dis);
  //     Jello.isDistorted = true;
  //   } else {
  //     Jello.distortionLevel(dis);
  //     Jello.isDistorted = false;
  //   }
  //   if(typeof callback == "function") 
  //   callback();
  // }

  Jello.toggleDistortionIn = function(dis, callback) {
    //if(!Jello.isDistorted) {
      if (!dis) {
        Jello.distortionLevel(1);
      }
      Jello.distortionLevel(dis);
      Jello.isDistorted = true;
      console.log('distortion in')

      if(typeof callback == "function") 
      callback();
    //} 
  }

  Jello.toggleDistortionOut = function(dis, callback) {
    //if(Jello.isDistorted) {
      if (!dis) {
        Jello.distortionLevel(0);
      }
      Jello.distortionLevel(dis);
      Jello.isDistorted = false;
      console.log('distortion out')
      if(typeof callback == "function") 
      callback();
    //} 
  }

  

// ============ TEAR DOWN =============== //

  Jello.tearDown = function() {
    //window.cancelAnimationFrame(Jello.raf);
    Jello.settings = {};
    Jello.bgArray = [];
    Jello.bgSpriteArray = [];
  }


  Jello.initialize = function() {
    console.log('Jello initialized')

    Jello.defaults = {
      transition: 0,
      speed: 0.5,
      dispScale: 200,
      dispX: true,
      dispY: true,
      count: 0
    };

    // Object.assign overwrites defaults with options to create settings
  Jello.update = function() {
    Jello.settings = Object.assign({}, Jello.defaults, Jello.options);
  }

  Jello.update();

    // An array of images for background (.jpg)
    // They'll transition in the order listed below
    Jello.bgArray.push(
      'image-1',
      'image-2',
      'image-3',
      'image-4'
    );

    // An array of displacement maps
    // They'll transition in the order below with the included settings
    Jello.mapArray.push(
      {
        image: 'dmap-clouds-01.jpg',
        speed: 0.5,
        scale: 200
      },
      {
        image: 'dmap-glass-01.jpg',
        speed: 0.3,
        scale: 200
      }
    );

    Jello.backgroundFill();
    Jello.buildStage();
    Jello.createBackgrounds();
    Jello.createFilters();
    Jello.animateFilters();
    //Jello.eventListener();
    Jello.initScroll();

    Jello.renderer.view.setAttribute('class', 'jello-canvas');
    Jello.canvasHolder.appendChild(Jello.renderer.view);
  }

  Jello.initialize();
  
// }

export default Jello
