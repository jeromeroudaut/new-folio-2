/* eslint-disable */

import * as PIXI from 'pixi.js';

export default class Jello {
    // Cached variables that can be used and changed in all the functions in the class
    constructor(options = {}) {
        this.defaults = {};
        this.options = options;
        this.canvasHolder = document.getElementById('jello-container');
        this.imgWidth = 1920;
        this.imgHeight = 1080;
        this.imgRatio = this.imgHeight / this.imgWidth;
        this.winWidth = window.innerWidth;
        this.bgArray = [];
        this.bgSpriteArray = [];
        this.renderer = PIXI.autoDetectRenderer( this.imgWidth, (this.winWidth * this.imgRatio), {transparent: true} );
        this.stage = new PIXI.Container();
        this.imgContainer = new PIXI.Container();
        this.imageCounter = 0;
        this.displacementSprite = PIXI.Sprite.fromImage('static/media/img/distortion/clouds.jpg');
        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
        this.currentMap = {};
        this.mapCounter = 0;
        this.mapArray = [];
        this.raf = this.animateFilters.bind(this);

        // PREVNEXT
        this.current = 0;
        this.isDistorted = false; // begin transition with no distortion
        this.isTransitioning = false;

        this.initialize();
    }

    initialize() {
        console.log('Jello initialized');

        this.defaults = {
            transition: 0,
            speed: 0.5,
            dispScale: 200,
            dispX: true,
            dispY: true,
            count: 0
        };

        this.update();

        // An array of images for background (.jpg)
        // They'll transition in the order listed below
        // this.bgArray.push(
        //   'image-1',
        //   'image-2',
        //   'image-3',
        //   'image-4'
        // );

        // Video array
        this.bgArray.push(
            'video-0',
            'video-1',
            'video-2',
            'video-3'
        );

        // An array of displacement maps
        // They'll transition in the order below with the included settings
        this.mapArray.push(
            {
                image: 'dmap-clouds-01.jpg',
                speed: 0.5,
                scale: 200
            },
            {
                image: 'dmap-clouds-02.jpg',
                speed: 0.3,
                scale: 200
            }
        );


        this.unloadScrollBars();
        this.backgroundFill();
        this.buildStage();
        this.createBackgrounds();
        this.createFilters();
        this.animateFilters();
        //this.eventListener();
        // MOUSEWHEEL
        this.debounce(this.initScroll());

        this.renderer.view.setAttribute('class', 'jello-canvas');
        this.canvasHolder.appendChild(this.renderer.view);
    }

    unloadScrollBars() {
        document.documentElement.style.overflow = 'hidden'; // firefox, chrome
        document.body.scroll = 'no'; // ie only
    }

    // define animations and call this.raf
    animateFilters() {
        this.displacementFilter.scale.x = this.settings.dispX ? this.settings.transition * this.settings.dispScale : 0;
        this.displacementFilter.scale.y = this.settings.dispY ? this.settings.transition * (this.settings.dispScale + 10) : 0;

        this.displacementSprite.x = Math.sin(this.settings.count * 0.15) * 200;
        this.displacementSprite.y = Math.cos(this.settings.count * 0.13) * 200;

        // by commenting out rotation - we get yard.agency transition effect
        // this.displacementSprite.rotation = this.settings.count * 0.06;

        this.settings.count += 0.05 * this.settings.speed;

        this.renderer.render(this.stage);

        window.requestAnimationFrame(this.raf);
    }

    // canvas built to fill width of window
    backgroundFill() {
        this.renderer.view.setAttribute('style', 'height:auto;width:100%;');
    }

    // main container for animation
    buildStage() {
        this.imgContainer.position.x = this.imgWidth / 2;
        this.imgContainer.position.y = this.imgHeight / 2;

        this.stage.scale.x = this.stage.scale.y = this.winWidth / this.imgWidth;
        this.stage.interactive = true;
        this.stage.addChild(this.imgContainer);
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this; const
                args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // scroll index
    next() {
        this.current = this.current < this.bgArray.length - 1 ? this.current + 1 : 0;
        return this.getCurrentIndex();
    }

    prev() {
        this.current = this.current > 0 ? this.current - 1 : this.bgArray.length - 1;
        return this.getCurrentIndex();
    }

    getCurrentIndex() {
        return this.bgArray[this.current];
    }

    changeImage() {
        this.bgSpriteArray.map((sprite, i, callback) => {
            if (i === this.current) {
                TweenLite.to(sprite, 2, { alpha: 1, ease: Power2.easeInOut, onComplete: this.toggleDistortionOut, onCompleteScope: this });
            } else {
                TweenLite.to(sprite, 2, { alpha: 0, ease: Power2.easeInOut });
            }
        });
    }


    // cycle through this.mapArray and change displacement maps
    // changeMap() {
    //   if(this.mapCounter < (this.mapArray.length - 1)) {
    //     this.mapCounter++;
    //   } else {
    //     this.mapCounter = 0;
    //   }

    //   this.currentMap = this.mapArray[this.mapCounter];
    //   console.log(this.currentMap)
    //   this.displacementSprite = PIXI.Sprite.fromImage(`/assets/img/distortion/${this.currentMap.image}`);
    //   this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    //   this.createFilters();
    // }

    // preload all backgrounds for quick transitions
    createBackgrounds() {

        this.bgArray.map((video) => {
        
            // const bg = PIXI.AnimatedSprite.from(`../assets/video/${video}.mp4`);
            // bg.baseTexture.resource.source.loop = true;
            // // Set image anchor to the center of the image
            // bg.anchor.x = 0.5;
            // bg.anchor.y = 0.5; 
            
            // bg.loop = true;
            
            // this.imgContainer.addChild(bg);
            // this.bgSpriteArray.push(bg);

            // // IMAGE
            // bg.alpha = this.bgSpriteArray.length === 1 ? 1 : 0;

            // create a video texture from a path
            const bg = PIXI.Sprite.fromImage(`/static/media/video/${image}.mp4`);

            // https://github.com/pixijs/pixi.js/issues/6501 - SOLVED!!
            bg.baseTexture.resource.source.preload = true;
            bg.baseTexture.resource.source.loop = true;
            bg.baseTexture.resource.source.autoplay = true;

            const videoSprite = new PIXI.Sprite(bg);

            videoSprite.anchor.x = 0.5;
            videoSprite.anchor.y = 0.5;  

            // preload and autoplay video
            //videoSprite.preload = 'auto';
            //this.autoPlay = videoSprite.autoplay;

            this.imgContainer.addChild(videoSprite);
            this.bgSpriteArray.push(videoSprite);


            // IMAGE
            videoSprite.alpha = this.bgSpriteArray.length === 1 ? 1 : 0;

        });

    }

    // distortion filters added to stage
    createFilters() {
        this.stage.addChild(this.displacementSprite);

        this.displacementFilter.scale.x = this.displacementFilter.scale.y = this.winWidth / this.imgWidth;

        this.imgContainer.filters = [
            this.displacementFilter
        ];
    }

    // function changes the distortion level to a specific amount
    distortionLevel(amt) {
        if (!this.isTransitioning) {
            this.isTransitioning = true;
            TweenLite.to(this.settings, 1, {
                transition: amt,
                speed: this.currentMap.speed,
                dispScale: this.currentMap.scale,
                ease: Power2.easeInOut,
                onComplete: () => {
                    this.isTransitioning = false;
                }
            });
        }
    }

    handleWheel() {
        event.preventDefault();
        event.stopPropagation();
    }

    onTouchUp(event) {
        event.stopPropagation();

        this.mouse.x = event.changedTouches
            ? event.changedTouches[0].clientX
            : event.clientX;
        this.mouse.y = event.changedTouches
            ? event.changedTouches[0].clientY
            : event.clientY;

        if (this.canvas) {
            this.canvas.onTouchUp(this.mouse);
        }
    }

    onWheel(event) {
        const normalized = Normalize(event);
        const speed = normalized.pixelY * 0.2;

        if (this.canvas) {
            this.canvas.onWheel(speed);
        }
    }

    addEventListeners() {
        window.addEventListener('mousewheel', this.onWheel.bind(this));
        window.addEventListener('wheel', this.onWheel.bind(this));

        window.addEventListener('mousedown', this.onTouchDown.bind(this));
        window.addEventListener('mousemove', this.onTouchMove.bind(this));
        window.addEventListener('mouseup', this.onTouchUp.bind(this));

        window.addEventListener('touchstart', this.onTouchDown.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
        window.addEventListener('touchend', this.onTouchUp.bind(this));
    }

    throttle(cb, timeout) {
        // You can rewrite this function by replacing the time limit with the
        // scroll pitch. I think that would be the best solution.
        // let delta = e.deltaY || e.detail || e.wheelDelta;
        // ... sum delta and call callback by the number of steps: accumulator/step

        let lastCall = 100;

        return function () {
            if (new Date() - lastCall > timeout) {
                lastCall = new Date();

                cb();
            }
        };
    }

    initScroll() {
        window.addEventListener('wheel', (e) => {
            this.direction = e.deltaY < 0;

            if (e.deltaY < 0 && this.isDistorted === false) {
                this.toggleDistortionIn(1, this.changeImage.bind(this), this.next());

                console.log('scrolling up - next');
            }


            if (e.deltaY > 0 && this.isDistorted === false) {
                this.toggleDistortionIn(1, this.changeImage.bind(this), this.prev());

                console.log('scrolling down - previous');
            }
        });
    }
    // click events
    // eventListener() {
    //   const changeImageBtn = document.getElementsByClassName('js-change-image')[0];
    //   const changeDistortionBtn = document.getElementsByClassName('js-change-distortion')[0];
    //   const toggleDistorionBtn = document.getElementsByClassName('js-toggle-distortion')[0];

    //   changeImageBtn.onclick = () => {
    //     this.changeImage();
    //   }

    //   changeDistortionBtn.onclick = () => {
    //     this.changeMap();
    //   }

    //   toggleDistorionBtn.onclick = () => {
    //     this.toggleDistortion();
    //   }

    // }

    toggleDistortionIn(dis, callback, callback2) {
        if (!this.dis) {
            this.distortionLevel(1);
        }
        this.distortionLevel(dis);
        this.isDistorted = true;
        console.log('distortion in');

        if (typeof callback == 'function') { callback(); }
        if (typeof callback2 == 'function') { callback2(); }
        // }
    }

    toggleDistortionOut(dis, callback) {
        if (!dis) {
            this.distortionLevel(0);
        }
        this.distortionLevel(dis);
        this.isDistorted = false;
        console.log('distortion out');
        if (typeof callback == 'function') { callback(); }
        // }
    }

    // Object.assign overwrites defaults with options to create settings
    update() {
        this.settings = Object.assign({}, this.defaults, this.options);
    }

    // ============ TEAR DOWN =============== //

    tearDown() {
        window.cancelAnimationFrame(this.raf);
        this.settings = {};
        this.bgArray = [];
        this.bgSpriteArray = [];
    }
}


