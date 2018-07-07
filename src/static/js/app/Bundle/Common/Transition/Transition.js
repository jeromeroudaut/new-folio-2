/* eslint-disable */

import S from 'skylake'
import jQuery from "jquery"


const Transition = {}

Transition.headerVisible = !0;
Transition.currentStep = 0
Transition.nextStep = 0


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
Transition.arrPagiProgNo = S.Geb.class('h-pagi-prog-no')

Transition.arrTopPagiWrap = S.Geb.class('h-pagi-top-no-wrap')
Transition.arrTopTitleWrap = S.Geb.class('h-pagi-top-title-wrap')
Transition.arrBotPagiWrap = S.Geb.class('h-pagi-bottom-no-wrap')
Transition.arrBotTitleWrap = S.Geb.class('h-pagi-bottom-title-wrap')
Transition.sectionTitle = S.Geb.class("h-section-title")
Transition.sectionBck = S.Geb.class("h-xp-col-back")


Transition.pagiBottomMarkerWrap = S.Geb.id('h-pagi-bottom-marker-wrap')
Transition.pagiLine = S.Geb.id('h-pagi-line')
Transition.pagiBottomMarker = S.Geb.id('h-pagi-bottom-marker')
Transition.pagiSocialWrap = S.Geb.id("h-pagi-social-wrap")

Transition.intro = new S.Timeline()
const isObj = S.Is.object(Transition.intro)
//Transition.intro.from({el: '#sail', p: {y: [100, -100]}, d: 5000, delay: 6000, e: 'Power4InOut'})
// Transition.intro.from({el: '.header', p: {scaleX: [1.1, 1]}, scaleY: [1.1, 1], d: 5000, e: 'Power4InOut', delay: 7000})

Transition.outro = new S.Timeline()
const isObj2 = S.Is.object(Transition.outro)
Transition.outro.from({el: '#sail', p: {y: [100, -100]}, d: 5000, e: 'Power4InOut'})

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

   Transition.next = debounce(function() {
 
        Transition.disable_scroll() 
        Transition.nextStep = Transition.currentStep + 1
        console.log('scrolling down - nextItem')
        Transition.currentStep = Transition.nextStep 
        
        console.log('currentStep: ' + Transition.currentStep)
        console.log('nextStep: ' + Transition.nextStep)

        if (Transition.currentStep === 1) {

            //Transition.imgReset()
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
            //Transition.pagiFadeOut()
            
            
        } 

        if (Transition.currentStep >= 7) {

            return Transition.currentStep = 7
                
        } 

        return Transition.currentStep
        
    }, 250);


    Transition.prev = debounce(function() {

        Transition.disable_scroll()
        Transition.nextStep = Transition.currentStep - 1
        //for cirular array
        //Transition.nextStep = (Transition.currentStep + Transition.arr.length - 1) % Transition.arr.length
        console.log('scrolling up - prevItem')
        Transition.currentStep = Transition.nextStep 
        

        console.log('currentStep: ' + Transition.currentStep)
        console.log('nextStep: ' + Transition.nextStep)

        // if (Transition.currentStep === -1) {

        //     console.log('index 0 header down')

        //     Transition.headerDown()

        // } 

        if (Transition.currentStep === 0) {

            Transition.imgResetIn()

        } 

        if (Transition.currentStep <= -1) {

            Transition.headerDown()
            return Transition.currentStep = -1
                
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

        return Transition.currentStep
        
    }, 250);
    

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
    var div = document.querySelector('.header');
    var divOffset = offset(div);
    console.log(divOffset.top)


    Transition.headerUp = function() {

        Transition.disable_scroll()
        Transition.headerUp = new S.Timeline()
        const isObj3 = S.Is.object(Transition.headerUp)
        //Transition.headerUp.from({el: '.scroll-icon', p: {opacity: [1, 0]}, d: 1200, delay: 200, e: 'Power4InOut'})
        Transition.headerUp.from({el: '.header', p: {y: [0, -100]}, d: 1300, e: 'ExpoOut'})
        Transition.headerUp.play({cb: Transition.titleInit})

        //console.log(divOffset.left, divOffset.top);

    };
    
    Transition.headerDown = function() {

        Transition.disable_scroll()
        Transition.headerDown = new S.Timeline()
        const isObj4 = S.Is.object(Transition.headerDown)
        const t = -1

        Transition.headerDown.from({el: Transition.arrBotTitle[0], p: {y: [0, 100]}, d: 300, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrBotTitle[1], p: {y: [0, 100]}, d: 300, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrBotTitle[2], p: {y: [0, 100]}, d: 300, e: 'Power4InOut'})
        
        
        Transition.headerDown.from({el: '.header', p: {y: [-100, 0]}, d: 800, e: 'Power4InOut'})
        Transition.headerDown.from({el: '.scroll-icon-wrap', p: {opacity: [0, 1], y: [100, 0]}, d: 1500, e: 'Power4InOut', delay: 900})


        Transition.imgReset()

        Transition.headerDown.from({el: '#h-pagi-progress', p: {x: [0, -165]}, d: 600, e: 'Power4InOut'})
        Transition.headerDown.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.headerDown.from({el: '#gloss-overlay', p: {x: [0, -100]}, d: 300, e: 'Power4InOut'})
        //Transition.headerDown.from({el: '#body-mid-line', p: {y: [0, -100], opacity: [1, 0]}, d: 600, e: 'Power4InOut'})


        //Transition.headerDown.from({el: '#h-txt-desc-line', p: {x: [-110, 0]}, d: 2800, e: 'Power4InOut'})

        // Transition.headerDown.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {opacity: [1, 0]}, d: 600, e: 'Power4InOut'})
        // Transition.headerDown.from({el: '#h-pagi-bottom-marker', p: {opacity: [1, 0]}, d: 600, e: 'Power4InOut'})
        // Transition.headerDown.from({el: '#h-pagi-line', p: {opacity: [1, 0]}, d: 600, e: 'Power4InOut'})
        
        //Transition.headerDown.from({el: '.scroll-icon', p: {opacity: [0, 1]}, d: 1200, e: 'Power4InOut'})

        // Transition.headerDown.from({el: "#h-img-0", p: {opacity: [1, 0], y:[0, 100]}, d: 1200, e: 'Power4InOut'})
        // Transition.headerDown.from({el: "#h-img-0-b", p: {opacity: [1, 0], x:[0, 4]}, d: 600, e: 'Power4InOut'})

        Transition.headerDown.play({delay: 800, cb: Transition.reset})
        //console.log(divOffset.left, divOffset.top);

    };

    Transition.titleInit = function() {
  
        Transition.currentStep = 0
        
        const textInit = new S.Timeline()
        const isObj5 = S.Is.object(textInit)
    
    
        textInit.from({el: Transition.arr[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        console.log('title text')
        textInit.from({el: Transition.arrText[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        textInit.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
    
        textInit.from({el: Transition.arrBotTitle[0], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        textInit.from({el: Transition.arrBotTitle[1], p: {y: [100, 0]}, d: 1500, e: 'Power4InOut'})
        textInit.from({el: Transition.arrBotTitle[2], p: {y: [100, 0]}, d: 1800, e: 'Power4InOut'})
    
        textInit.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [100, 0]}, d: 1800, e: 'Power4InOut'})
        textInit.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [100, 0]}, d: 1800, e: 'Power4InOut'})
        textInit.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [100, 0]}, d: 2000, e: 'Power4InOut'})
    
        //textInit.from({el: '#h-txt-desc-line', p: {x: [-110, 0], opacity: [0, 1]}, d: 2800, e: 'Power4InOut'})
        textInit.from({el: '#body-mid-line', p: {y: [-110, 0], opacity: [0, 1]}, d: 2800, e: 'Power4InOut'})
        textInit.from({el: '#h-pagi-progress', p: {x: [-165, 0]}, d: 600, e: 'Power4InOut'})


        Transition.arrTopPagiWrap[Transition.currentStep + 1].style.height = "auto";
        Transition.arrTopTitleWrap[Transition.currentStep + 1].style.height = "auto";

        textInit.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {y: [-100, 0]}, d: 1200, e: 'Power4InOut'})

        textInit.from({el: '#h-pagi-line', p: {x: [-100, 0], opacity: [0, 1]}, d: 1200, e: 'Power4InOut'})
        textInit.from({el: '#h-pagi-bottom-marker', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

        textInit.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        console.log(Transition.arrPagiProgNo)

        textInit.from({el: '#gloss-overlay', p: {x: [-100, 0]}, d: 1200, e: 'Power4InOut'})

        textInit.from({el: "#h-img-" + Transition.currentStep, p: {opacity: [0, 1], y:[-60, 0]}, d: 1200, delay: 400, e: 'Power4InOut'})

        // textInit.from({el: "#h-img-0-b", p: {opacity: [0, 1], x:[4, 0]}, d: 1200, delay: 150, e: 'Power4InOut'})
    
        textInit.play({cb: setTimeout(Transition.enable_scroll, 3000)})
    
        };
    
       Transition.reset = function() {
    
        const elReset = new S.Timeline()
        const isObj15 = S.Is.object(elReset)
    
        elReset.from({el: '#body-mid-line', p: {y: [0, -100]}})

        console.log('hello from Transition.reset')
        elReset.play()
        
    
       }
    
    Transition.imgReset = function() {

        const imgReset = new S.Timeline()
        const isObj23 = S.Is.object(imgReset)

        // imgReset.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {y: [0, -100]}, d: 2800, e: 'Power4InOut'})
        //if (Transition.currentStep <= 0) {
        imgReset.from({el: '#h-pagi-line', p: {x: [0, 100]}, d: 1200, e: 'Power4InOut'})
        imgReset.from({el: '#h-pagi-bottom-marker', p: {y: [0, -100]}, d: 1200, e: 'Power4InOut'})
        //}
        //imgReset.from({el: "#h-img-0-b", p: {opacity: [1, 0], x:[0, 4]}, d: 600, e: 'Power4InOut'})
        imgReset.play()
    }

    Transition.imgResetIn = function() {

        const imgResetIn = new S.Timeline()
        const isObj24 = S.Is.object(imgResetIn)

        //imgResetIn.from({el: "#h-img-0-b", p: {opacity: [0, 1], x:[4, 0]}, d: 600, delay: 2000, e: 'Power4InOut'})
        imgResetIn.play()
    }

    Transition.pagiOut = function() {
            
        for (var n = 7; n > Transition.currentStep + 1; n--) {
            Transition.arrTopPagiWrap[Transition.currentStep + 2].style.height = ""
            Transition.arrTopTitleWrap[Transition.currentStep + 2].style.height = ""
            
            }
            
            console.log('hello from pagiOut')
    }


    Transition.experienceUp = function() {
        
        const openExp = new S.Timeline()
        const isObj27 = S.Is.object(openExp)
        const t = -1

        //////

        openExp.from({el: '#body-mid', p: {x: [0, -100]}, d: 1200, e: 'Power4InOut'})
        openExp.from({el: '#body-right', p: {x: [0, 100]}, d: 1200, e: 'Power4InOut'})
        openExp.from({el: '#section-6', p: {opacity: [0, 1]}, d: 1200, e: 'Power4InOut'})

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

        openExp.from({el: '#body-mid-line', p: {opacity: [1, 0]}, d: 1200, e: 'Power4InOut'})


        openExp.from({el: Transition.sectionTitle[0], p: {y: [100, 0]}, d: 1200, delay: 400, e: 'Power4InOut'})
        openExp.from({el: Transition.sectionBck[0], p: {opacity: [0, .15]}, d: 1200, e: 'Power4InOut'})
        openExp.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1800, delay: 600, e: 'Power4InOut'})
        openExp.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1800, delay: 600, e: 'Power4InOut'})


        openExp.play()
        //////

   }

    Transition.recognitionUp = function() {

        const recUp = new S.Timeline()
        const isObj16 = S.Is.object(recUp)

        recUp.from({el: '#section-7', p: {opacity: [0, 1]}, d: 1200, e: 'Power3In'})

        recUp.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
        recUp.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
        recUp.from({el: Transition.sectionTitle[0], p: {y: [0, 100]}, d: 1200, delay: 400, e: 'Power4InOut'})
        recUp.from({el: Transition.sectionBck[0], p: {opacity: [.15, 0]}, d: 1200, e: 'Power4InOut'})

        recUp.from({el: Transition.sectionTitle[1], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 1000})
        recUp.from({el: Transition.sectionBck[1], p: {opacity: [0, .15]}, d: 1200, e: 'Power4InOut'})
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

    socUp.from({el: '#section-8', p: {opacity: [0, 1]}, d: 1200, e: 'Power4InOut'})
    
    socUp.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
    socUp.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
    socUp.from({el: Transition.sectionTitle[1], p: {y: [0, 100]}, d: 1200, delay: 400, e: 'Power4InOut'})
    socUp.from({el: Transition.sectionBck[1], p: {opacity: [.15, 0]}, d: 1200, e: 'Power4InOut'})


    socUp.from({el: Transition.sectionTitle[2], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 1000})
    socUp.from({el: Transition.sectionBck[2], p: {opacity: [0, .15]}, d: 1200, e: 'Power4InOut'})
    socUp.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
    socUp.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
    
    // socUp.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
    // socUp.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

    // socUp.from({el: '#h-social', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
    // socUp.from({el: '#h-social-title', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
    // socUp.from({el: '.cf', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

    socUp.play()

}

   Transition.experienceDown = function() {
        
        const openExpIn = new S.Timeline()
        const isObj28 = S.Is.object(openExpIn)

        //////
        openExpIn.from({el: Transition.sectionTitle[0], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        openExpIn.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
        openExpIn.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
        openExpIn.from({el: Transition.sectionBck[0], p: {opacity: [.15, 0]}, d: 1200, delay: 600, e: 'Power4InOut'})

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

        openExpIn.from({el: '#body-mid-line', p: {opacity: [0, 1]}, d: 1200, delay: 600, e: 'Power4InOut'})

        
        openExpIn.play()
        //////

}

Transition.recognitionDown = function() {

    const recDown = new S.Timeline()
    const isObj17 = S.Is.object(recDown)

    // recDown.from({el: Transition.arrBotTitle[0], p: {y: [100, 0]}, d: 1800, e: 'Power4InOut'})
    // recDown.from({el: Transition.arrBotTitle[1], p: {y: [100, 0]}, d: 2100, e: 'Power4InOut'})
    // recDown.from({el: Transition.arrBotTitle[2], p: {y: [100, 0]}, d: 2400, e: 'Power4InOut'})

    recDown.from({el: '#section-7', p: {opacity: [1, 0]}, d: 1200, e: 'Power3In'})

    recDown.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
    recDown.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
    recDown.from({el: Transition.sectionTitle[1], p: {y: [0, 100]}, d: 1200, delay: 400, e: 'Power4InOut', delay: 1000})
    recDown.from({el: Transition.sectionBck[1], p: {opacity: [.15, 0]}, d: 1200, e: 'Power4InOut'})

    recDown.from({el: Transition.sectionTitle[0], p: {y: [100, 0]}, d: 1200,  e: 'Power4InOut', delay: 1000})
    recDown.from({el: Transition.sectionBck[0], p: {opacity: [0, .15]}, d: 1200, e: 'Power4InOut'})
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

        socDown.from({el: '#section-8', p: {opacity: [1, 0]}, d: 1200, e: 'Power4InOut'})

        
        socDown.from({el: '#h-xp-txt', p: {y: [0, 100]}, d: 600, e: 'Power4InOut'})
        socDown.from({el: '#h-xp-list', p: {y: [0, 100]}, d: 600, delay: 300, e: 'Power4InOut'})
        socDown.from({el: Transition.sectionTitle[2], p: {y: [0, 100]}, d: 1200, delay: 400, e: 'Power4InOut', delay: 1000})
        socDown.from({el: Transition.sectionBck[2], p: {opacity: [.15, 0]}, d: 1200, e: 'Power4InOut'})
        
        socDown.from({el: Transition.sectionTitle[1], p: {y: [100, 0]}, d: 1200,  e: 'Power4InOut', delay: 1000})
        socDown.from({el: Transition.sectionBck[1], p: {opacity: [0, .15]}, d: 1200, e: 'Power4InOut'})
        socDown.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
        socDown.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 600})
        
        // socDown.from({el: '#h-social', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        // socDown.from({el: '#h-social-title', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        // socDown.from({el: '.cf', p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

        // socDown.from({el: '.h-xp-title', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        // socDown.from({el: '#h-xp-list', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        // socDown.from({el: '#h-xp-txt', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
        
        //socDown.play({cb: Transition.pagiFadeIn, cbDelay: 600})
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
            Transition.arrPagiTopNo[Transition.currentStep + 1].style.color = "#fff";
            Transition.arrPagiTopNo[Transition.currentStep + 1].style.transition = "color 200ms";
            Transition.pagiBottomMarker.style.color = "#fff";
            Transition.pagiLine.style.background = "#fff";
            Transition.pagiBottomMarker.style.transition = "color 200ms";
            
        }
    }

    Transition.updateProgress = function(num1) {
        var percent = Math.ceil( num1 * 100 / 6 ) + '%';
        document.getElementById('progress').style.width = percent;
    }

    Transition.n2 = function() {


        Transition.next()

        if (Transition.currentStep <= 5) {
        Transition.updateProgress(Transition.currentStep + 1);
        } else if (Transition.currentStep >= 6) {
            Transition.updateProgress(Transition.currentStep)
        }
        
        Transition.textInOut = new S.Timeline()
        const isObj8 = S.Is.object(Transition.textInOut)
        const t = -1

        
        Transition.textInOut.from({el: '#body-mid-line', p: {y: [0, -110 * t]}, d: 1200, e: 'Power4InOut'})   
        

        Transition.textInOut.from({el: Transition.arr[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textInOut.from({el: Transition.arrText[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textInOut.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

        Transition.textInOut.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textInOut.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textInOut.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

        Transition.textInOut.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], 
            p: {x: [0, -100]}, d: 1200, e: 'Power4InOut'})

        Transition.textInOut.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

        if (Transition.currentStep >= 6) {

            Transition.textInOut.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], 
                p: {x: [0, 0]}, d: 1200, e: 'Power4InOut'})
    
            Transition.textInOut.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [0, 0]}, d: 1200, e: 'Power4InOut'})

        }

        if (Transition.currentStep < 4) {
            Transition.textInOut.from({el: "#h-img-" + Transition.currentStep, p: {opacity: [1, 0], y:[0, -60]}, d: 1200, e: 'Power4InOut'})
        }

        if (Transition.currentStep <= 6) {
        Transition.arrTopPagiWrap[Transition.currentStep + 1].style.height = "auto";
        Transition.arrTopTitleWrap[Transition.currentStep + 1].style.height = "auto";
        }

 
        Transition.textInOut.play({ cb: function() {

        
            Transition.textIn2 = new S.Timeline()
            const isObj9 = S.Is.object(Transition.textIn2)

            // if (Transition.currentStep === 4) {
            // Transition.textInOut.from({el: '#h-txt-desc-line', p: {opacity: [0, 0]}, e: 'Power4InOut'}) } else {
            Transition.textIn2.from({el: '#body-mid-line', p: {y: [-110, 0]}, d: 1200, e: 'Power4InOut'})
            // }

            Transition.textIn2.from({el: Transition.arr[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
            Transition.textIn2.from({el: Transition.arrText[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
            Transition.textIn2.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

            Transition.textIn2.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
            Transition.textIn2.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
            Transition.textIn2.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

            Transition.textIn2.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {x: [100, 0]}, d: 1200, e: 'Power4InOut'})

            Transition.textIn2.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

            if (Transition.currentStep >= 7) {

                Transition.textIn2.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {x: [0, 0]}})

                Transition.textIn2.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [0, 0]}})
            }

            if (Transition.currentStep < 4) {
                Transition.textIn2.from({el: "#h-img-" + Transition.currentStep, p: {opacity: [0, 1], y:[-60, 0]}, d: 1200, e: 'Power4InOut'})
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

        Transition.updateProgress(Transition.currentStep - 1);

        Transition.textOutIn = new S.Timeline()
        const isObj10 = S.Is.object(Transition.textOutIn)

        
        // if (Transition.currentStep === 3) {
        //      Transition.textOutIn.from({el: '#h-txt-desc-line', p: {opacity: [1, 0]}})
        // } else {
        Transition.textOutIn.from({el: '#body-mid-line', p: {y: [0, -110]}, d: 1200, e: 'Power4InOut'})
        //}

        Transition.textOutIn.from({el: Transition.arr[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textOutIn.from({el: Transition.arrText[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textOutIn.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})


        Transition.textOutIn.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textOutIn.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
        Transition.textOutIn.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})

        if (Transition.currentStep <=  0) {
            Transition.textOutIn.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {y: [0, 100]}, d: 1200, delay: 300, e: 'Power4InOut'})
            
        } else {
            Transition.textOutIn.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {x: [0, 100]}, d: 1200, e: 'Power4InOut'}) 
        }

        Transition.textOutIn.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [0, 100]}, d: 1200, e: 'Power4InOut'})
           

        if (Transition.currentStep < 4) {
        Transition.textOutIn.from({el: "#h-img-" + Transition.currentStep, p: {opacity: [1, 0], y:[0, -60]}, d: 1200, e: 'Power4InOut'})
        }

        
        
        Transition.textOutIn.play({cb: function() {

                setTimeout(Transition.pagiOut, 300)
                
                Transition.textOut2 = new S.Timeline()
                const isObj11 = S.Is.object(Transition.textOut2)
                const t = -1

                if (Transition.currentStep === -1) {
                    Transition.textOut2.from({el: '#body-mid-line', p: {y: [-110, -110]}, d: 1200, e: 'Power4InOut'})
                } else {
                    Transition.textOut2.from({el: '#body-mid-line', p: {y: [-110 * t, 0]}, d: 1200, e: 'Power4InOut'})
                }
                

                Transition.textOut2.from({el: Transition.arr[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
                Transition.textOut2.from({el: Transition.arrText[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
                Transition.textOut2.from({el: Transition.arrTitle[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

                Transition.textOut2.from({el: Transition.arrBotRole[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
                Transition.textOut2.from({el: Transition.arrBotAgency[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})
                Transition.textOut2.from({el: Transition.arrBotYear[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

                
                Transition.textOut2.from({el: Transition.arrPagiTopNo[Transition.currentStep + 1], p: {x: [-100, 0]}, d: 1200, e: 'Power4InOut'})
                
                Transition.textOut2.from({el: Transition.arrPagiProgNo[Transition.currentStep], p: {y: [100, 0]}, d: 1200, e: 'Power4InOut'})

                if (Transition.currentStep < 4 && Transition.currentStep > -1) {
                    Transition.arrPagiTopNo[Transition.currentStep + 1].style.color = "";
                    Transition.pagiBottomMarker.style.color = "";
                    Transition.pagiLine.style.background = "";
                }

                if (Transition.currentStep < 4 && Transition.currentStep > -1) {
                Transition.textOut2.from({el: "#h-img-" + Transition.currentStep, p: {opacity: [0, 1], y:[-60, 0]}, d: 1200, e: 'Power4InOut'})
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
    if ( delta !== null) {
        
        if (delta < 0 && divOffset.top === 0) {
            
            Transition.headerUp()

        } else if (delta > 0 && divOffset.top < -600) {

            Transition.p2()


        } else if (delta < 0 && divOffset.top < -600) {

            Transition.n2()
            
            
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
