/* 
Menu Overlay 
*/
class ShapeOverlays {
  constructor(elm) {
    this.elm = elm;
    this.path = elm.querySelectorAll('path');
    this.numPoints = 4;
    this.duration = 1000;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.delayPerPath = 60;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
  }
  toggle() {
    this.isAnimating = true;
    for (var i = 0; i < this.numPoints; i++) {
      this.delayPointsArray[i] = 0;
    }
    if (this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }
  open() {
    this.isOpened = true;
    this.elm.classList.add('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  close() {
    this.isOpened = false;
    this.elm.classList.remove('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  updatePath(time) {
    const points = [];
    for (var i = 0; i < this.numPoints; i++) {
      const thisEase = (i % 2 === 1) ? ease.sineOut : ease.exponentialInOut;
      points[i] = (1 - thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 H ${points[0]}` : `M ${points[0]} 0`;
    for (var i = 0; i < this.numPoints - 1; i++) {
      const p = (i + 1) / (this.numPoints - 1) * 100;
      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
      str += `C ${points[i]} ${cp} ${points[i + 1]} ${cp} ${points[i + 1]} ${p} `;
    }
    str += (this.isOpened) ? `H 100 V 0` : `H 0 V 0`;
    return str;
  }
  render() {
    if (this.isOpened) {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }
  renderLoop() {
    this.render();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    }
    else {
      this.isAnimating = false;
    }
  }
}
// these easing functions are based on the code of glsl-easing module.
// https://github.com/glslify/glsl-easings
//

const ease = {
  exponentialIn: (t) => {
    return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
  },
  exponentialOut: (t) => {
    return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
  },
  exponentialInOut: (t) => {
    return t == 0.0 || t == 1.0
      ? t
      : t < 0.5
        ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
        : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
  },
  sineOut: (t) => {
    const HALF_PI = 1.5707963267948966;
    return Math.sin(t * HALF_PI);
  },
  circularInOut: (t) => {
    return t < 0.5
        ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
        : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  },
  cubicIn: (t) => {
    return t * t * t;
  },
  cubicOut: (t) => {
    const f = t - 1.0;
    return f * f * f + 1.0;
  },
  cubicInOut: (t) => {
    return t < 0.5
      ? 4.0 * t * t * t
      : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: (t) => {
    return -t * (t - 2.0);
  },
  quarticOut: (t) => {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  },
}


/* 
Menu Overlay
*/
var app = {};
app.menuVisible = false;
app.keyCodeESC = 27;
const elmOverlay = document.querySelector('.shape-overlays');
const overlay = new ShapeOverlays(elmOverlay);

$(function() {
  if ($("body").hasClass("portfolio") || $("body").hasClass("single-page")) app.loadAndFadeInCaseImages();

  // Top menu
  $('.menu').click(function(e) {
    e.preventDefault();
    !app.menuVisible ? app.revealMenu() : app.hideMenu();
  });

  // Hide nav if clicked outside of a menu alternative
  $('.nav').click(function(e) {
    app.hideMenu();
  });
  // Make sure that links don't close the menu
  $('.nav a').click(function(e) {
    e.stopPropagation();
  });

  // Listen to ESC, close menu if visible
  $(document).keyup(function(e) {
    if (e.keyCode == app.keyCodeESC) app.handleESCKey();
  });

  
});


app.loadAndFadeInCaseImages = function() {
  // Load background images
  $("[data-image]").each(function(i, elem) {
    var $elem = $(elem),
    url = "/images/portfolio/" + $elem.attr('data-image');
    if (url == null || url.length <= 0 ) { return; }

    $elem.addClass('image-loading');
    $('<img/>').attr('src', url).load(function() {
      $(this).remove();
      $bg = $('<div class="case-item-bg"/>');
      $bg.css( 'background-image', 'url(' + url + ')');

      $elem.prepend($bg);
      $elem
        .removeClass('image-loading')
        .addClass('image-ready');
    });
  });
}

app.handleESCKey = function() {
  $(document).trigger("pressed:ESC");
  if (app.menuVisible) app.hideMenu();
}

app.toggleMenuStates = function() {
  //$('body').toggleClass('no-scroll');
  $('.menu').toggleClass('menu-active');
  $('.nav').toggleClass('nav-active');
}

app.revealMenu = function() {
  app.menuVisible = true;
  overlay.toggle();
  app.toggleMenuStates();
  
  anime({
    targets:'',
    scale: [0.2, 3],
    opacity: [0.2,1],
    easing: "easeInCubic",
    duration: 300
  });

  var containerDelay = 200;
  anime({
    targets:'.js-nav',
    opacity: [0, 1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 200
  });

  var menuItemDelay = 90;
  containerDelay += 75;
  $(".js-nav-header").css("opacity", "0");
  anime({
    targets: ".js-nav-header",
    opacity: [0,1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 200
  });

  $(".js-nav-header-line").css("transform", "scale(0.2)");
  anime({
    targets:'.js-nav-header-line',
    scaleX: [0.28, 1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 600
  });
  containerDelay += 350;

  $(".js-nav-animate").each(function(i) {
    $(this).css({
      "opacity": "0",
      "transform" : "scale(0.9)",
      "padding-left" : "1px"
    });
  });

  anime({
    targets: '.js-nav-animate',
    translateY: ["-7px", 0],
    scale: [0.9, 1],
    opacity: [0, 1],
    delay: function(el, i) {
      return containerDelay + menuItemDelay * (i+1)
    },
    duration: 1100,
    easing: "easeOutExpo",
    complete: function() {
      $(document).trigger("app:menuDidReveal");
    }
  });

}

app.hideMenu = function() {
  app.menuVisible = false;
  app.toggleMenuStates();
  overlay.toggle();
  $(document).trigger("app:menuWillHide");

  $(".header").css({
    "overflow": "hidden"
  });
  $("#body-content-wrapper").css({
    "overflow": "hidden"
  });

  var containerDelay = 200;
  anime({
    targets: '.menu-animated-background',
    scale: [3,0],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 300
  });

  anime({
    targets:'.js-nav',
    opacity: [1, 0],
    easing: "easeInOutExpo",
    duration: 200
  });

  anime({
    targets:'.js-nav-header-line',
    scale: [1, 0.5],
    easing: "easeInExpo",
    duration: 300
  });

  anime({
    targets: '.js-nav-animate',
    translateY: "10px",
    scale: [1, 0.9],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 200
  });

}

// Typically called by views that want to display something in the same 
// position of the menu icon
app.hideMenuIcon = function() {
  $(".menu").hide();
}

app.showMenuIcon = function() {
  $(".menu").show();  
}


const elmHamburger = document.querySelector('.menu');
const navItems = document.querySelectorAll('.nav-link');
const subNavItems = document.querySelectorAll('.nav-sublink');

  // //remove global menu items
  // function removeGlobalMenu() {
  //   for (var i = 0; i < navItems.length; i++) {
  //     navItems[i].classList.remove('js-nav-animate');
  //   }
  // }

//loop thru nav_sublinks listening for click, onclick close overlay, close hamburger menu
for (var i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener('click', function(){
    //console.log('clicked!!');
    if (overlay.isAnimating) {
      return false;
    }
    app.hideMenu();   
  });
  
};

for (var i = 0; i < subNavItems.length; i++) {
  subNavItems[i].addEventListener('click', function(){
    //console.log('clicked!!');
    if (overlay.isAnimating) {
      return false;
    }
    app.hideMenu();   
  });
  
};

export default app;


/* 
Menu Overlay End 
*/





// /* eslint-disable */

// import S from "skylake";
// import jQuery from "jquery";

// class Menu {

//   constructor() {

//     this.menuVisible = false;
//     this.keyCodeESC = 27;
//     this.el = S.Geb.id('burger');
//     this.elmHamburger = S.Geb.id('burger');
//     this.navItems = S.Geb.class('.burger-menu-bg');

//     S.BindMaker(this, ['callback', 'bindButtonClick', 'addy', 'revealMenu', 'hideMenu'])

//   }

//   // if ($("body").hasClass("body-content-wrapper") || $("body").hasClass("single-page")) burger.loadAndFadeInCaseImages();

//   callback(e) {
    
//     S.Geb.id('burger').removeEventListener("click", Menu.prototype.callback);
//     console.log("burger clicked!!");
//     e.preventDefault();
//     // e.stopImmediatePropagation()
//     !Menu.menuVisible ? Menu.prototype.revealMenu() : Menu.prototype.hideMenu();

//   }

//   bindButtonClick() {
//     S.Listen("#burger", "add", "click", Menu.prototype.callback);
//     // S.Listen('#h-content', 'add', 'scroll', callback)
//     console.log("bindButtonClick");
//   }

//   // bindButtonClick()

//   addy() {
//     S.Geb.id('burger').addEventListener("click", Menu.prototype.callback);
//     //Listeners.prototype.remove('destroy')
//     console.log("hello from burger.addy callback");
//   }

  

//   // burger.loadAndFadeInCaseImages = function() {
//   //   // Load background images
//   //   $("[data-image]").each(function(i, elem) {
//   //     var $elem = $(elem),
//   //     url = "/images/portfolio/" + $elem.attr('data-image');
//   //     if (url == null || url.length <= 0 ) { return; }

//   //     $elem.addClass('image-loading');
//   //     $('<img/>').attr('src', url).load(function() {
//   //       $(this).remove();
//   //       $bg = $('<div class="case-item-bg"/>');
//   //       $bg.css( 'background-image', 'url(' + url + ')');

//   //       $elem.prepend($bg);
//   //       $elem
//   //         .removeClass('image-loading')
//   //         .addClass('image-ready');
//   //     });
//   //   });
//   // }

//   revealMenu() {
//     Menu.menuVisible = true;
//     //overlay.toggle();
//     Menu.toggleMenuStates();

//     const tl = new S.Timeline();
//     const isObj = S.Is.object(tl);

//     tl.from({
//       el: ".burger-line-hover",
//       p: { x: [0, 105] },
//       d: 1600,
//       e: "ExpoOut",
//       delay: 800
//     });
//     tl.from({
//       el: ".burger-close",
//       p: { y: [-108, 0] },
//       d: 1600,
//       e: "Power4InOut"
//     });

//     tl.from({
//       el: "#burger-menu-sail-l",
//       p: { y: [0, 100] },
//       d: 1200,
//       e: "Power4InOut"
//     });
//     tl.from({
//       el: "#burger-menu-sail-r",
//       p: { y: [0, 100] },
//       d: 1200,
//       e: "Power4InOut",
//       delay: 50
//     });
//     tl.from({
//       el: "#burger-menu-list",
//       p: { y: [0, 223.3] },
//       d: 2500,
//       e: "Power4InOut"
//     });
//     tl.from({
//       el: "#burger-menu-line",
//       p: { y: [-100, 100] },
//       d: 2500,
//       e: "Power4InOut"
//     });

//     tl.from({
//       el: ".burger-menu-link",
//       p: { y: [-100, 0] },
//       d: 1600,
//       e: "ExpoOut",
//       delay: 1800
//     });
//     tl.from({
//       el: ".burger-menu-share",
//       p: { y: [100, 0] },
//       d: 1600,
//       e: "ExpoOut",
//       delay: 400,
//       cb: Menu.prototype.addy
//     });

//     tl.play();
//   }

//   hideMenu() {
//     Menu.menuVisible = false;
//     Menu.toggleMenuStates();

//     const tl = new S.Timeline();
//     const isObj = S.Is.object(tl);

//     tl.from({
//       el: "#burger-menu-sail-l",
//       p: { y: [100, 0] },
//       d: 1500,
//       e: "Power4InOut"
//     });
//     tl.from({
//       el: "#burger-menu-sail-r",
//       p: { y: [100, 0] },
//       d: 1500,
//       e: "Power4InOut",
//       delay: 50
//     });

//     tl.from({
//       el: "#burger-menu-list",
//       p: { y: [223.3, 0] },
//       d: 1500,
//       e: "Power4InOut"
//     });
//     tl.from({
//       el: ".burger-menu-share",
//       p: { y: [0, 100] },
//       d: 800,
//       e: "ExpoOut"
//     });
//     tl.from({
//       el: ".burger-menu-link",
//       p: { y: [0, -100] },
//       d: 1600,
//       e: "ExpoOut",
//       delay: 800
//     });

//     tl.from({
//       el: ".burger-close",
//       p: { y: [0, -108] },
//       d: 1600,
//       e: "Power4InOut"
//     });
//     tl.from({
//       el: ".burger-line-hover",
//       p: { x: [105, 0] },
//       d: 800,
//       e: "ExpoOut",
//       delay: 800
//     });
//     tl.from({
//       el: "#burger-menu-line",
//       p: { y: [100, -100] },
//       d: 1500,
//       e: "Power4InOut",
//       cb: Menu.prototype.addy
//     });

//     tl.play();
//   }

//   // Typically called by views that want to display something in the same
//   // position of the menu icon
//   // burger.hideMenuIcon = function() {
//   //   $(".menu").hide();
//   // }

//   // burger.showMenuIcon = function() {
//   //   $(".menu").show();
//   // }
//   //this.scroll.off()

  
// }
  
// $(function(){

//   // Hide nav if clicked outside of a menu alternative
//   $('#burger-menu').click(function(e) {
//     Menu.prototype.hideMenu();
//   });

//   // Make sure that links don't close the menu
//   // $('.nav a').click(function(e) {
//   //   e.stopPropagation();
//   // });

//   // Listen to ESC, close menu if visible
//   $(document).keyup(function(e) {
//     if (e.keyCode == this.keyCodeESC) this.handleESCKey();
//   });

//   Menu.handleESCKey = function () {
//     $(document).trigger("pressed:ESC");
//     if (this.menuVisible) Menu.hideMenu();
//   }



//   const elmHamburger = document.querySelector('#burger');
//   const navItems = document.querySelectorAll('.burger-menu-link-wrap');
//   //const subNavItems = document.querySelectorAll('.nav-sublink');
  
//     // //remove global menu items
//     // function removeGlobalMenu() {
//     //   for (var i = 0; i < navItems.length; i++) {
//     //     navItems[i].classList.remove('js-nav-animate');
//     //   }
//     // }
  
//   //loop thru nav_sublinks listening for click, onclick close overlay, close hamburger menu
//   for (var i = 0; i < navItems.length; i++) {
//          navItems[i].classList.add('active');
//          console.log('adding active to burger-menu-link-wrap')
//       }
//     // navItems[i].addEventListener('click', function(){
//     //   //console.log('clicked!!');
//     //   if (elmHamburger.className === 'active') {
//     //     return false;
//     //   }
//       // Menu.prototype.hideMenu();

//   });

//   Menu.toggleMenuStates = function() {
//     //$('body').toggleClass('no-scroll');
//     $("#burger").toggleClass("active");
//     //$('#burger').toggleClass('np');
//     $("#burger-menu").toggleClass("active");

//     $(".burger-menu-link:hover").toggleClass("active");
//     // $("#burger-menu-line-wrap").toggleClass("oh");
//   }

// export default Menu;
