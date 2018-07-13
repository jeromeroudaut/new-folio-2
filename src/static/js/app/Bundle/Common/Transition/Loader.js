/* eslint-disable */

const Loader = {}

Loader.lineWrap = S.Geb.id('loader-line-wrap')


import JQuery from 'jquery'
import S from 'skylake'

const intro = function() {
  const tl = new S.Timeline()
  const isObj = S.Is.object(tl)

  tl.from({el: "#loader-line-wrap", p: { opacity: [1, 0]}, d: 400, e: 'Power4InOut'})
  Loader.lineWrap.style.display = "none";

  tl.from({el: '#sail-top', p: {y: [0, -100]}, d: 1500, e: 'Power4InOut'})
  tl.from({el: '#sail-bot', p: {y: [0, 100]}, d: 1500, e: 'Power4InOut'})
  //tl.from({el: '#h-back-0', p: {opacity: [0, 1]}, d: 300, e: 'ExpoOut'})
  tl.from({el: '.header', p: {scale: [1.2, 1]}, d: 1200, delay: 900, e: 'Power4InOut'})
  //tl.from({el: '#glcanvas-wrap', p: {opacity: [0, 1]}, d: 900, e: 'ExpoOut'})

  tl.from({el: '.tagline', p: {y: [100, 0]}, d: 1500, e: 'Power4InOut', delay: 1200})
  tl.from({el: '.menu__icon', p: {opacity: [0, 1]}, d: 1500, e: 'ExpoOut', delay: 200})
  // tl.from({el: '.burger-line-hover', p: {x: [105, 0]}, d: 1000, e: 'ExpoOut', delay: 500})
  tl.from({el: '.scroll-icon', p: {y: [100, 0]}, d: 1500, e: 'Power4InOut', delay: 1200})


  //tl.from({el: '.tagline', p: {y: [100, 0]}, d: 1600, e: 'Power4InOut'})
  
  // tl.from({el: '#burger-mask', p: {y: [100, -100]}, d: 2000, e: 'ExpoOut', delay: 500})

  tl.play()
}

function unloadScrollBars() {
  document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  document.body.scroll = "no"; // ie only
}

unloadScrollBars()


Loader.pr = new S.Timeline()
const isObj = S.Is.object(Loader.pr)
const t = -1

Loader.pr.from({el: ".loader-line", p: { x: [-100, -100 * t] }, d: 6000, e: "Power4InOut", delay: 900});

Loader.run = function() {

    Loader.pr.play({cb: intro})

};

console.log('loader.js')



export default Loader