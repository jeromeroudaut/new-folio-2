/* eslint-disable */

import S from 'skylake'
import Jello from "./Jello.js"
import PrevNext from "./PrevNext.js"


const Transition = {}

Transition.currentStep = 0

Transition.state = {
    open: false,
    change: true,
    header: false,

    // save initial values
    init: function() {
        var origValues = {};
        for (var prop in this) {
            if (this.hasOwnProperty(prop) && prop != "origValues") {
                origValues[prop] = this[prop];
            }
        }
        this.origValues = origValues;
    },

    // restore initial values
    reset: function() {
        for (var prop in this.origValues) {
            this[prop] = this.origValues[prop];
        }
    }
}

Transition.open = function() {

Transition.arr = S.Geb.class("h-txt-title")
Transition.arrTitle = S.Geb.class("h-client")
Transition.arrText = S.Geb.class("h-txt-desc-txt")
Transition.arrBotTitle = S.Geb.class("h-bottom-title")
Transition.arrBotRole = S.Geb.class("h-bottom-value-r")
Transition.arrBotAgency = S.Geb.class("h-bottom-value-a")
Transition.arrBotYear = S.Geb.class('h-bottom-value-y')

Transition.arrPagiTopNo = S.Geb.class('h-pagi-top-no')
Transition.arrPagiBotNo = S.Geb.class('h-pagi-bottom-no')

Transition.arrTopPagiWrap = S.Geb.class('h-pagi-top-no-wrap')
Transition.arrTopTitleWrap = S.Geb.class('h-pagi-top-title-wrap')
Transition.arrBotPagiWrap = S.Geb.class('h-pagi-bottom-no-wrap')
Transition.arrBotTitleWrap = S.Geb.class('h-pagi-bottom-title-wrap')

// Transition.arrPagiProgWrap = S.Geb.class('h-pagi-prog-no-wrap')
Transition.arrPagiProgNo = S.Geb.class('h-pagi-prog-no')
Transition.nodes = Array.prototype.slice.call( document.querySelector('.h-pagi-prog-no').children ),

// Transition.arrPagiProgNoMarker = S.Geb.class('h-pagi-prog-no-marker')

Transition.sectionTitle = S.Geb.class("h-section-title")

Transition.pagiBottomMarkerWrap = S.Geb.id('h-pagi-bottom-marker-wrap')
Transition.pagiLine = S.Geb.id('h-pagi-line')
Transition.pagiBottomMarker = S.Geb.id('h-pagi-bottom-marker')
Transition.pagiSocialWrap = S.Geb.id("h-pagi-social-wrap")

Transition.intro = new S.Timeline()
const isObj = S.Is.object(Transition.intro)
//Transition.intro.from({el: '#sail', p: {y: [100, -100]}, d: 5000, delay: 6000, e: 'Power4InOut'})
// Transition.intro.from({el: '.header', p: {scaleX: [1.1, 1]}, scaleY: [1.1, 1], d: 5000, e: 'Power4InOut', delay: 7000})

// Transition.outro = new S.Timeline()
// const isObj2 = S.Is.object(Transition.outro)
// Transition.outro.from({el: '#sail', p: {y: [100, -100]}, d: 5000, e: 'Power4InOut'})

Transition.state.init()
Transition.scrollInit()
}




    let debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
            };
    };

    function throttled(delay, fn) {
        let lastCall = 0;
        return function (...args) {
          const now = (new Date).getTime();
          if (now - lastCall < delay) {
            return;
          }
          lastCall = now;
          return fn(...args);
        }
      }

      function throttle(fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function () {
          var context = scope || this;
      
          var now = +new Date,
              args = arguments;
          if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
              last = now;
              fn.apply(context, args);
            }, threshhold);
          } else {
            last = now;
            fn.apply(context, args);
          }
        };
      }

    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = [37, 38, 39, 40];

    Transition.preventDefault = function(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
    }

    Transition.keydown = function(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                Transition.preventDefault(e);
                return;
            }
        }
    }

    Transition.wheel = function(e) {
    Transition.preventDefault(e);
    }

    Transition.disable_scroll = function() {
        const body = S.Dom.body
        S.Listen(body, 'remove', 'mouseWheel', Transition.headerScroll)

      }
      
     Transition.enable_scroll = function() {
        const body = S.Dom.body
        S.Listen(body, 'add', 'mouseWheel', Transition.headerScroll)
        
      }

      Transition.toggleState = function() {
        !Transition.state.open ? Transition.state.open = true : Transition.state.open = false;
        console.log('Transition.state: ' + Transition.state.open)
      }

      Transition.toggleChangePage = function(callback) {
        Transition.state.change ? Transition.state.change = false : Transition.state.change = true;
        if(typeof callback == "function") 
        callback();
        console.log('Transition.change: ' + Transition.state.change)
      }

   Transition.next = debounce(function() {
 
        Transition.disable_scroll() 
        PrevNext.items = Transition.nodes.length - 1
        Transition.currentStep = PrevNext.moveIndexNext()
        
        console.log('scrolling down - nextItem')        
        console.log('currentStep: ' + Transition.currentStep)


        if (Transition.currentStep === 1) {

            Transition.toggleChangePage()        
        
        } 

        if (Transition.currentStep === 4) {

            console.log('index 4 experienceUp')
            Transition.experienceUp()
        } 

        if (Transition.currentStep === 5) {

            console.log('index 5 recognitionUp')
            Transition.recognitionUp()

        } 

        if (Transition.currentStep === 6) {

            console.log('index 6 socialUp')
            Transition.socialUp()
            
            
        } 


        return Transition.currentStep
        
    }, 250);


    Transition.prev = debounce(function() {

        Transition.disable_scroll()
        PrevNext.items = Transition.nodes.length - 1
        Transition.currentStep = PrevNext.moveIndexPrevious()

        console.log('scrolling up - prevItem')        
        console.log('currentStep: ' + Transition.currentStep)


        if (Transition.currentStep === 0) {

            //Transition.toggleState()
            Transition.toggleChangePage()        

                
        } 

        if (Transition.currentStep === 3) {

            console.log('index 3 experienceDown')
            //Transition.recognitionDown()
            Transition.experienceDown()

            } 

        if (Transition.currentStep === 4) {

            console.log('index 4 recognitionDown')
            Transition.recognitionDown()

            
            } 

        if (Transition.currentStep === 5) {

            console.log('index 5 socialDown recognitionUp')
            Transition.socialDown()

            //Transition.socialDown()
            } 

        if (Transition.currentStep === 6) {

            Transition.toggleState()
        } 

        return Transition.currentStep
        
    }, 250);

    Jello.changeImageInit = function(currenti) {
    
        Jello.bgSpriteArray.map((sprite, i, callback) => {
    
          if(i === currenti) {
            TweenLite.to(sprite, 3, {alpha: 1, ease:Power2.easeInOut, onComplete: Jello.toggleDistortionOut, onCompleteScope: this});
          } else {
            TweenLite.to(sprite, 2, {alpha: 0, ease:Power2.easeInOut});
          }
        });
      }
    
      Jello.changeImageTextInit = function(currenti) {

        // Jello.imageCounter = currenti
        console.log('changeImageTextInit currenti is: ' + currenti)
        Jello.bgSpriteArray.map((sprite, i, callback) => {
    
          if(i === currenti) {
            TweenLite.to(sprite, 2, {alpha: 1, ease:Power2.easeInOut, onComplete: Jello.toggleDistortionOut, onCompleteScope: this});
          } else {
            TweenLite.to(sprite, 2, {alpha: 0, ease:Power2.easeInOut});
          }
        });
      }  

      Jello.changeImageHeaderDown = function(currenti) {

        // Jello.imageCounter = currenti
        console.log('changeImageHeaderDown currenti is: ' + currenti)
        Jello.bgSpriteArray.map((sprite, i, callback) => {
    
          if(i === currenti) {
            TweenLite.to(sprite, 2, {alpha: 1, ease:Power2.easeInOut, onComplete: Jello.toggleDistortionOut, onCompleteScope: this});
          } else {
            TweenLite.to(sprite, 2, {alpha: 0, ease:Power2.easeInOut});
          }
        });
      }  

    Jello.changeImageNxt = function(currenti) {

        // Jello.imageCounter = currenti
        console.log('changeImageNxt currenti is: ' + currenti)
        Jello.bgSpriteArray.map((sprite, i, callback) => {
    
          if(i === (currenti + 1)) {
            TweenLite.to(sprite, 2, {alpha: 1, ease:Power2.easeInOut, onComplete: Jello.toggleDistortionOut, onCompleteScope: this});
          } else {
            TweenLite.to(sprite, 2, {alpha: 0, ease:Power2.easeInOut});
          }
        });
      }

      Jello.changeImagePrv = function(currenti) {

        // Jello.imageCounter = currenti
        console.log('changeImagePrv currenti is: ' + currenti)
        Jello.bgSpriteArray.map((sprite, i, callback) => {
    
            if(i === (currenti - 1)) {
              TweenLite.to(sprite, 2, {alpha: 1, ease:Power2.easeInOut, onComplete: Jello.toggleDistortionOut, onCompleteScope: this});
            } else {
              TweenLite.to(sprite, 2, {alpha: 0, ease:Power2.easeInOut});
            }
          });
      }

      Jello.toggleDistortionIn = function(dis, callback) {

        if (!dis) {
            Jello.distortionLevel(1);
          }
          Jello.distortionLevel(dis);
          Jello.isDistorted = true;
          console.log('distortion in')
    
          if(typeof callback == "function") 
          callback();

      }
    
      Jello.toggleDistortionOut = function(dis, callback) {

        if (!dis) {
            Jello.distortionLevel(0);
          }
          Jello.distortionLevel(dis);
          Jello.isDistorted = false;
          console.log('distortion out')
          if(typeof callback == "function") 
          callback();
        
      }

Transition.headerScroll = (currentScrollY, delta, event) => {

    var delta = null,
    currentScrollY = false,
    event = window.event;


    function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    // example use
    var div = document.querySelector('#header');
    var divOffset = offset(div);
    console.log(divOffset.top)


    Transition.headerUp = function() {

        Transition.disable_scroll()
        Transition.headerUp = new S.Timeline()
        const isObj3 = S.Is.object(Transition.headerUp)
        
        Transition.headerUp.from({el: '#header', p: {y: [0, -100]}, d: 400, e: 'ExpoOut'})
        Transition.headerUp.play({cb: Transition.titleInit})

    };
    
    Transition.headerDown = function() {

        Transition.disable_scroll()
        Transition.headerDown = new S.Timeline()
        const isObj4 = S.Is.object(Transition.headerDown)
        const t = -1

        Jello.toggleDistortionIn(1, Jello.changeImageHeaderDown(0))

        // textInit.from({el: '#intro', p: {opacity: [1, 0]}, d: 1200, e: 'Power4InOut'})

        Transition.headerDown.from({el: '#body-mid', p: {x: [0, -200]}, d: 900, e: 'Power4InOut', delay: 1000})
        Transition.headerDown.from({el: '#body-right', p: {x: [0, 100]}, d: 900, e: 'Power4InOut'})
        Transition.headerDown.from({el: '#body-mid-line', p: {x: [0, -100], opacity: [0, .15]}, d: 900, e: 'Power4InOut', delay: 400})

        Transition.headerDown.from({el: Transition.arrBotTitle[0], p: {y: [0, 100]}, d: 900, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrBotTitle[1], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrBotTitle[2], p: {y: [0, 100]}, d: 1500, e: 'Power4InOut'})
    
        Transition.headerDown.from({el: Transition.arrBotRole[0], p: {y: [0, 100]}, d: 1500, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrBotAgency[0], p: {y: [0, 100]}, d: 1500, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrBotYear[0], p: {y: [0, 100]}, d: 1700, e: 'Power4InOut'})

        Transition.headerDown.from({el: Transition.arr[0], p: {y: [0, 100]}, d: 900, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrText[0], p: {y: [0, 100]}, d: 900, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrTitle[0], p: {y: [0, 100]}, d: 900, e: 'Power4InOut'})

        // Transition.headerDown.from({el: '#h-pagi-line', p: {x: [0, -110], opacity: [0, 1]}, d: 2500, e: 'Power4InOut'})
        // Transition.headerDown.from({el: '#h-pagi-prog', p: {opacity: [1, 0]}, d: 300, e: 'Power4InOut'})
        Transition.headerDown.from({el: '.icon-wrap', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})

        // Transition.arrTopPagiWrap[1].style.height = "auto";
        // Transition.arrTopTitleWrap[1].style.height = "auto";

        Transition.headerDown.from({el: Transition.arrPagiTopNo[1], p: {y: [0, -100]}, d: 900, e: 'Power4InOut'})

        Transition.headerDown.from({el: '#h-pagi-line', p: {x: [0, 100]}, d: 1200, e: 'Power4InOut'})

        Transition.headerDown.from({el: '#h-pagi-bottom-marker', p: {y: [0, 100]}, d: 900, e: 'Power4InOut'})

        Transition.headerDown.from({el: '#h-pagi-progress', p: {opacity: [1, 0]}, d: 900, e: 'Power4InOut'})
        Transition.headerDown.from({el: '.h-pagi-prog-no-marker', p: {y: [0, 100]}, d: 900, e: 'Power4InOut', delay: 300})
        Transition.headerDown.from({el: Transition.arrPagiProgNo[0], p: {y: [0, 100]}, d: 900, e: 'Power4InOut', delay: 300})

        Transition.headerDown.from({el: '.scroll-icon', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        Transition.headerDown.from({el: '.tagline', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 800})
        Transition.headerDown.from({el: '#header', p: {y: [-100, 0]}, d: 1200, e: 'Power4InOut'})

        //Transition.toggleChangePage()
        // Transition.toggleState()
        Transition.state.reset()

        console.log('hello from headerDown!')
        Transition.headerDown.play({cb: setTimeout(Transition.enable_scroll, 3000)})

    };

    Transition.pagiReset = function() {

        const pagiReset = new S.Timeline()
        const isObj23 = S.Is.object(pagiReset)

        pagiReset.from({el: '#h-pagi-line', p: {x: [0, 100]}, d: 1200, e: 'Power4InOut'})
        pagiReset.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        pagiReset.from({el: '#h-pagi-bottom-marker', p: {y: [0, -100]}, d: 1200, e: 'Power4InOut'})

        pagiReset.play()
    }

    // Transition.imgResetIn = function() {

    //     const imgResetIn = new S.Timeline()
    //     const isObj24 = S.Is.object(imgResetIn)

    //     //imgResetIn.from({el: "#h-img-0-b", p: {opacity: [0, 1], x:[4, 0]}, d: 600, delay: 2000, e: 'Power4InOut'})
    //     imgResetIn.play()
    // }

    // Transition.reset = function() {
    
    //     const elReset = new S.Timeline()
    //     const isObj15 = S.Is.object(elReset)
    
        

    //     elReset.play({delay: 800})
        
    
    //    }

    Transition.titleInit = function() {
  
        const textInit = new S.Timeline()
        const isObj5 = S.Is.object(textInit)
    
        Jello.toggleDistortionIn(1, Jello.changeImageTextInit(1))

        textInit.from({el: '.scroll-icon', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        textInit.from({el: '.tagline', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut', delay: 800})
        textInit.from({el: '#header', p: {y: [0, -100]}, d: 1200, e: 'Power4InOut'})

        // textInit.from({el: '#intro', p: {opacity: [1, 0]}, d: 1200, e: 'Power4InOut'})

    
        textInit.from({el: '#body-mid', p: {x: [-200, 0]}, d: 900, e: 'Power4InOut', delay: 1000})
        textInit.from({el: '#body-right', p: {x: [100, 0]}, d: 900, e: 'Power4InOut'})
        textInit.from({el: '#body-mid-line', p: {x: [-100, 0], opacity: [0, .15]}, d: 900, e: 'Power4InOut', delay: 400})

        textInit.from({el: Transition.arrBotTitle[0], p: {y: [100, 0]}, d: 900, e: 'Power4InOut'})
        textInit.from({el: Transition.arrBotTitle[1], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        textInit.from({el: Transition.arrBotTitle[2], p: {y: [100, 0]}, d: 1500, e: 'Power4InOut'})
    
        textInit.from({el: Transition.arrBotRole[0], p: {y: [100, 0]}, d: 1500, e: 'Power4InOut'})
        textInit.from({el: Transition.arrBotAgency[0], p: {y: [100, 0]}, d: 1500, e: 'Power4InOut'})
        textInit.from({el: Transition.arrBotYear[0], p: {y: [100, 0]}, d: 1700, e: 'Power4InOut'})

        textInit.from({el: Transition.arr[0], p: {y: [100, 0]}, d: 900, e: 'Power4InOut'})
        textInit.from({el: Transition.arrText[0], p: {y: [100, 0]}, d: 900, e: 'Power4InOut'})
        textInit.from({el: Transition.arrTitle[0], p: {y: [100, 0]}, d: 900, e: 'Power4InOut'})

        textInit.from({el: '#h-pagi-line', p: {x: [-110, 0], opacity: [0, 1]}, d: 2500, e: 'Power4InOut'})
        textInit.from({el: '#h-pagi-prog', p: {opacity: [0, 1]}, d: 300, e: 'Power4InOut'})
        textInit.from({el: '.icon-wrap', p: {y: [100, 0]}, d: 600, e: 'Power4InOut'})

        Transition.arrTopPagiWrap[1].style.height = "auto";
        Transition.arrTopTitleWrap[1].style.height = "auto";

        textInit.from({el: Transition.arrPagiTopNo[1], p: {y: [-100, 0]}, d: 900, e: 'Power4InOut'})

        textInit.from({el: '#h-pagi-bottom-marker', p: {y: [100, 0]}, d: 900, e: 'Power4InOut'})

        textInit.from({el: '#h-pagi-progress', p: {opacity: [0, 1]}, d: 900, e: 'Power4InOut'})
        textInit.from({el: '.h-pagi-prog-no-marker', p: {y: [100, 0]}, d: 900, e: 'Power4InOut', delay: 300})
        textInit.from({el: Transition.arrPagiProgNo[0], p: {y: [100, 0]}, d: 900, e: 'Power4InOut', delay: 300})

        console.log('hello from textInit!')

        Transition.toggleChangePage()
        Transition.toggleState()

        textInit.play({cb: setTimeout(Transition.enable_scroll, 3000)})
    
        };
    
       
    
    

    Transition.pagiOut = function() {
        
        var timer

        if(timer) {
			window.clearTimeout(timer);
		  }
		  timer = window.setTimeout(function() {
		   // actual code here. Your call back function.
           for (var n = 7; n > Transition.currentStep + 1; n--) {
            Transition.arrTopPagiWrap[Transition.currentStep + 2].style.height = ""
            Transition.arrTopTitleWrap[Transition.currentStep + 2].style.height = ""
            
            }
		  console.log( "Pagi-Out Firing!" );
		  }, 100);
        
    }


    Transition.experienceUp = function() {
        
        const openExp = new S.Timeline()
        const isObj27 = S.Is.object(openExp)
        const t = -1

        //////
        openExp.from({el: '#intro', p: {opacity: [1, 0]}, d: 300, e: 'Power4InOut'})

        openExp.from({el: '#body-mid', p: {x: [0, -100]}, d: 1200, e: 'Power4InOut'})
        openExp.from({el: '#body-right', p: {x: [0, 100]}, d: 1200, e: 'Power4InOut'})

        openExp.from({el: Transition.arrBotTitle[0], p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
        openExp.from({el: Transition.arrBotTitle[1], p: {y: [0, 100]}, d: 900, e: 'Power4InOut'})
        openExp.from({el: Transition.arrBotTitle[2], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

        openExp.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        openExp.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        openExp.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [0, 100]}, d: 1400, e: 'Power4InOut'})
        

        openExp.from({el: Transition.arr[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        console.log('title text')
        openExp.from({el: Transition.arrText[Transition.currentStep], p: {y: [0, 100]}, d: 1000, e: 'Power4InOut'})
        openExp.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [0, 100]}, d: 1000, e: 'Power4InOut'})
        openExp.from({el: '#body-mid-line', p: {opacity: [.15, 0]}, d: 1200, e: 'Power4InOut', delay: 400})


        openExp.from({el: Transition.sectionTitle[0], p: {y: [100, 0]}, d: 1200, delay: 400, e: 'Power4InOut'})

        openExp.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1800, delay: 600, e: 'Power4InOut'})
        openExp.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1800, delay: 600, e: 'Power4InOut'})


        openExp.play()
        //////

   }

    Transition.recognitionUp = function() {
        
        const recUp = new S.Timeline()
        const isObj16 = S.Is.object(recUp)

        recUp.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
        recUp.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
        recUp.from({el: Transition.sectionTitle[0], p: {y: [0, 100]}, d: 1200, delay: 400, e: 'Power4InOut'})

        recUp.from({el: Transition.sectionTitle[1], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 1000})
        recUp.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
        recUp.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
        
        // recUp.from({el: '#h-reco-title', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
        // recUp.from({el: '.h-reco-txt-title', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        // recUp.from({el: '.h-reco-txt-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 100})

        recUp.play()

   }


   Transition.socialUp = function() {

    const socUp = new S.Timeline()
    const isObj20 = S.Is.object(socUp)

    
    socUp.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
    socUp.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
    socUp.from({el: Transition.sectionTitle[1], p: {y: [0, 100]}, d: 1200, delay: 400, e: 'Power4InOut'})


    socUp.from({el: Transition.sectionTitle[2], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 1000})
    socUp.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
    socUp.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
    
    // socUp.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
    // socUp.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

    // socUp.from({el: '#h-social', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
    // socUp.from({el: '#h-social-title', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
    // socUp.from({el: '.cf', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
    Transition.toggleState()
    socUp.play()

}

   Transition.experienceDown = function() {
        
        const openExpIn = new S.Timeline()
        const isObj28 = S.Is.object(openExpIn)

        //////
        openExpIn.from({el: '#intro', p: {opacity: [0, 1]}, d: 300, e: 'Power4InOut'})
        openExpIn.from({el: Transition.sectionTitle[0], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        openExpIn.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
        openExpIn.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})

        openExpIn.from({el: '#body-mid', p: {x: [-100, 0]}, d: 1200, delay: 600, e: 'Power4InOut'})
        openExpIn.from({el: '#body-right', p: {x: [100, 0]}, d: 1200, e: 'Power4InOut'})

        openExpIn.from({el: Transition.arr[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        openExpIn.from({el: Transition.arrText[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        openExpIn.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})        

        openExpIn.from({el: Transition.arrBotTitle[0], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        openExpIn.from({el: Transition.arrBotTitle[1], p: {y: [100, 0]}, d: 1500, e: 'Power4InOut'})
        openExpIn.from({el: Transition.arrBotTitle[2], p: {y: [100, 0]}, d: 1800, e: 'Power4InOut'})

        openExpIn.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [100, 0]}, d: 1800, e: 'Power4InOut'})
        openExpIn.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [100, 0]}, d: 1800, e: 'Power4InOut'})
        openExpIn.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [100, 0]}, d: 2000, e: 'Power4InOut'})

        openExpIn.from({el: '#body-mid-line', p: {opacity: [0, .15]}, d: 1200, delay: 600, e: 'Power4InOut'})

        
        openExpIn.play()
        //////

}

Transition.recognitionDown = function() {

    const recDown = new S.Timeline()
    const isObj17 = S.Is.object(recDown)

    // recDown.from({el: Transition.arrBotTitle[0], p: {y: [100, 0]}, d: 1800, e: 'Power4InOut'})
    // recDown.from({el: Transition.arrBotTitle[1], p: {y: [100, 0]}, d: 2100, e: 'Power4InOut'})
    // recDown.from({el: Transition.arrBotTitle[2], p: {y: [100, 0]}, d: 2400, e: 'Power4InOut'})

    recDown.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
    recDown.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
    recDown.from({el: Transition.sectionTitle[1], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut', delay: 1000})

    recDown.from({el: Transition.sectionTitle[0], p: {y: [100, 0]}, d: 1200,  e: 'Power4InOut', delay: 1000})
    recDown.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
    recDown.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})

    // recDown.from({el: '#h-reco-title', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
    // recDown.from({el: '.h-reco-txt-list', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
    // recDown.from({el: '.h-reco-txt-title', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

    recDown.play()

    }

    Transition.socialDown = function() {

        const socDown = new S.Timeline()
        const isObj21 = S.Is.object(socDown)

        //Transition.hideSocial()

        
        socDown.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
        socDown.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
        socDown.from({el: Transition.sectionTitle[2], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut', delay: 1000})
        
        socDown.from({el: Transition.sectionTitle[1], p: {y: [100, 0]}, d: 1200,  e: 'Power4InOut', delay: 1000})
        socDown.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
        socDown.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
        
        // socDown.from({el: '#h-social', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        // socDown.from({el: '#h-social-title', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        // socDown.from({el: '.cf', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

        // socDown.from({el: '.h-xp-title', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        // socDown.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        // socDown.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        
        //socDown.play({cb: Transition.pagiFadeIn, cbDelay: 600})
        Transition.toggleState()
        socDown.play()

    }

    Transition.pagiFadeOut = function() {

        const pagiFadeOut = new S.Timeline()
        const isObj24 = S.Is.object(pagiFadeOut)

        pagiFadeOut.from({el: '#h-pagi-line', p: {x: [0, -102]}, d: 800, e: 'Power4InOut'})
        pagiFadeOut.from({el: '#h-pagi-bottom-marker', p: {y: [0, 100]}, d: 800, e: 'Power4InOut'})
        pagiFadeOut.play({cb: Transition.socialUp})
        console.log('hello from pagiFadeOut')
    }

    Transition.pagiFadeIn = function() {

        const pagiFadeIn = new S.Timeline()
        const isObj25 = S.Is.object(pagiFadeIn)

        pagiFadeIn.from({el: '#h-pagi-line', p: {x: [-102, 0]}, d: 800, e: 'Power4InOut'})
        pagiFadeIn.from({el: '#h-pagi-bottom-marker', p: {y: [100, 0]}, d: 800, e: 'Power4InOut'})
        pagiFadeIn.play()
        console.log('hello from pagiFadeIn')
    }

    Transition.showSocial = function() {
        const showSocial = new S.Timeline()
        const isObj26 = S.Is.object(showSocial)

        Transition.pagiSocialWrap.style.zIndex = 4;
        showSocial.from({el: '#h-pagi-social', p: {y: [100, 0]}, d: 1400, delay: 300, e: 'Power4InOut'})
        showSocial.play()
    }

    Transition.hideSocial = function() {
        const hideSocial = new S.Timeline()
        const isObj26 = S.Is.object(hideSocial)

        Transition.pagiSocialWrap.style.zIndex = -1;
        hideSocial.from({el: '#h-pagi-social', p: {y: [0, 100]}, d: 500, e: 'Power4In'})
        hideSocial.play()
    }

    Transition.pagiColor = function() {

        if (Transition.currentStep > 3) {
            Transition.pagiBottomMarkerWrap.style.transform = "translate3d(0,0,0)"
            Transition.pagiBottomMarkerWrap.style.transform = "rotate(-90deg)"
            Transition.arrPagiTopNo[Transition.currentStep + 1].style.color = "#f4f8fd";
            Transition.arrPagiTopNo[Transition.currentStep + 1].style.transition = "color 200ms";
            Transition.pagiBottomMarker.style.color = "#f4f8fd";
            Transition.pagiLine.style.background = "#f4f8fd";
            Transition.pagiBottomMarker.style.transition = "color 200ms";
            
        }
    }

    Transition.updateProgress = function(num1) {
        var percent = Math.ceil( num1 * 100 / 6 ) + '%';
        document.getElementById('h-pagi-prog').style.width = percent;
    }

    Transition.n2 = function() {

        Transition.next()

        // var timer
        
        // if(timer) {
        //     window.clearTimeout(timer);
        // }
        // timer = window.setTimeout(function() {
           // actual code here. Your call back function.
        //switchVideo(Transition.currentStep)
        Jello.toggleDistortionIn(1, Jello.changeImageNxt(Transition.currentStep))
        //   console.log( "Firing!" );
        // }, 250);

        Transition.textInOut = new S.Timeline()
        const isObj8 = S.Is.object(Transition.textInOut)
        const t = -1

        if (Transition.currentStep <= 5) {
            Transition.updateProgress(Transition.currentStep + 1);
        } else if (Transition.currentStep === 6) {
            Transition.updateProgress(Transition.currentStep)
        } else if (Transition.currentStep >= 7) {
            Transition.updateProgress(6)
        }
        

        Transition.textInOut.from({el: Transition.arr[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textInOut.from({el: Transition.arrText[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textInOut.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

        Transition.textInOut.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textInOut.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textInOut.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})


        if (Transition.currentStep >= 0 && Transition.currentStep <= 5) {

            Transition.textInOut.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], 
                p: {x: [0, -100]}, d: 900, e: 'Power4InOut'})
    
            Transition.textInOut.from({el: '#h-pagi-progress', p: {opacity: [1, 0]}, d: 800, e: 'Power4InOut'})
        
            Transition.textInOut.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [0, 100]}, d: 900, e: 'Power4InOut', delay: 800})
        
        } 


        if (Transition.currentStep <= 6) {
        Transition.arrTopPagiWrap[Transition.currentStep + 1].style.height = "auto";
        Transition.arrTopTitleWrap[Transition.currentStep + 1].style.height = "auto";
        }

 
        Transition.textInOut.play({ cbDelay: 300, cb: function() {

        
            Transition.textIn2 = new S.Timeline()
            const isObj9 = S.Is.object(Transition.textIn2)
            const t = -1


            Transition.textIn2.from({el: Transition.arr[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
            Transition.textIn2.from({el: Transition.arrText[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
            Transition.textIn2.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

            Transition.textIn2.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
            Transition.textIn2.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
            Transition.textIn2.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})


            if (Transition.currentStep >= 0 && Transition.currentStep <= 6) {

                Transition.textIn2.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {x: [100, 0]}, d: 900, e: 'Power4InOut'})

                Transition.textIn2.from({el: '#h-pagi-progress', p: {opacity: [0, 1]}, d: 1200, e: 'Power4InOut'})

                Transition.textIn2.from({el: '.h-pagi-prog-no-marker', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

                Transition.textIn2.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 150})

            
            } 


            if (Transition.currentStep <= 6) {
            Transition.arrTopPagiWrap[Transition.currentStep + 1].style.height = "auto";
            Transition.arrTopTitleWrap[Transition.currentStep + 1].style.height = "auto";
            }
        
            Transition.pagiColor()

            Transition.textIn2.play({cb: setTimeout(Transition.enable_scroll, 3000)})

            }
        })

    }

    Transition.p2 = function() {

        Transition.prev()

        // var timer
        
        // if(timer) {
        //     window.clearTimeout(timer);
        // }
        // timer = window.setTimeout(function() {
           // actual code here. Your call back function.
        //switchVideo(Transition.currentStep)
        Jello.toggleDistortionIn(1, Jello.changeImagePrv(Transition.currentStep))

        console.log( "Firing!" );
        // }, 250);

        Transition.updateProgress(Transition.currentStep - 1);

        Transition.textOutIn = new S.Timeline()
        const isObj10 = S.Is.object(Transition.textOutIn)
        const t = -1


        Transition.textOutIn.from({el: Transition.arr[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textOutIn.from({el: Transition.arrText[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textOutIn.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})


        Transition.textOutIn.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textOutIn.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textOutIn.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})


        if (Transition.currentStep >= -1 && Transition.currentStep <= 7) {


            Transition.textOutIn.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], 
                p: {x: [0, 100]}, d: 900, e: 'Power4InOut'})
    
            Transition.textOutIn.from({el: '#h-pagi-progress', p: {opacity: [1, 0]}, d: 800, e: 'Power4InOut'})

            Transition.textOutIn.from({el: '.h-pagi-prog-no-marker', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        
            Transition.textOutIn.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [0, 100]}, d: 900, e: 'Power4InOut', delay: 800})
        }

        
        Transition.textOutIn.play({cbDelay: 300, cb: function() {

                setTimeout(Transition.pagiOut, 300)
                
                Transition.textOut2 = new S.Timeline()
                const isObj11 = S.Is.object(Transition.textOut2)
                

                Transition.textOut2.from({el: Transition.arr[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
                Transition.textOut2.from({el: Transition.arrText[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
                Transition.textOut2.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

                Transition.textOut2.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
                Transition.textOut2.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
                Transition.textOut2.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

                Transition.textOut2.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {x: [-100, 0]}, d: 900, e: 'Power4InOut'})


                if (Transition.currentStep >= 0 && Transition.currentStep <= 6) {

                    Transition.textOut2.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {x: [100, 0]}, d: 900, e: 'Power4InOut'})
    
                    Transition.textOut2.from({el: '#h-pagi-progress', p: {opacity: [0, 1]}, d: 1200, e: 'Power4InOut'})

                    Transition.textOut2.from({el: '.h-pagi-prog-no-marker', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

                    Transition.textOut2.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 150})
                }


                if (Transition.currentStep < 4 && Transition.currentStep > -1) {
                    Transition.arrPagiTopNo[Transition.currentStep + 1].style.color = "";
                    Transition.pagiBottomMarker.style.color = "";
                    Transition.pagiLine.style.background = "";
                }
                
                
                Transition.textOut2.play({cb: setTimeout(Transition.enable_scroll, 3000)})
        
        }})

    }
 

    if ( !event ) { // if the event is not provided, we get it from the window object
        event = window.event;
    }
    if ( event.wheelDelta ) { // will work in most cases
        delta = event.wheelDelta / 60;
    } else if ( event.detail ) { // fallback for Firefox
        delta = -event.detail / 2;
    }
    if ( delta !== null ) {
    
        if (delta < 0 && divOffset.top === 0 && Transition.state.change) {
            
            Transition.headerUp() //headerUp calls back textInit

        }  else if (delta < 0 && divOffset.top < -600 && Transition.state.open) {

            Transition.n2() //scroll next
            
        } else if (delta > 0 && divOffset.top < -600 && !Transition.state.change && !Transition.state.header) {

            Transition.headerDown() //turns off Transition.p2, and headerDown from section 2

        } else if (delta > 0 && divOffset.top < -600 && Transition.state.open) {

            Transition.p2() //scroll prev

        } else if (delta > 0 && divOffset.top < -600 && !Transition.state.open && PrevNext.limit) {

            Transition.p2() //scroll prev from section 8 backstop

        } 

    }
}


Transition.scrollInit = () => {
    const body = S.Dom.body
    //S.BindMaker(this, ['Transition.headerScroll'])
    //S.scroll = new S.Scroll(Transition.headerScroll)
    S.Listen(body, 'add', 'mouseWheel', Transition.headerScroll)

    
    // this.scroll.on()
    // this.scroll.off()
    console.log('hello from scroll init')
}

console.log('transition.js')

export default Transition
