/* eslint-disable */

import S from 'skylake'
import Jello from "./Jello.js"
import Transition from "./Transition.js"


const Loader = {}

Loader.lineWrap = S.Geb.id('loader-line-wrap')

const intro = function() {
  const tl = new S.Timeline()
  const isObj = S.Is.object(tl)

  Jello.toggleDistortionIn(1, Jello.changeImageInit)

  tl.from({el: "#loader-line-wrap", p: { opacity: [1, 0]}, d: 400, e: 'Power4InOut'})
  Loader.lineWrap.style.display = "none";

  tl.from({el: '#sail-top', p: {y: [0, -100]}, d: 1500, e: 'Power4InOut'})
  tl.from({el: '#sail-bot', p: {y: [0, 100]}, d: 1500, e: 'Power4InOut'})

  tl.from({el: '#header', p: {opacity: [0, 1]}, d: 1200, e: 'Power4InOut'})
  tl.from({el: '#intro', p: {opacity: [0, 1]}, d: 1200, delay: 300, e: 'Power4InOut'})
  tl.from({el: '.tagline', p: {y: [100, 0]}, d: 1500, e: 'Power4InOut', delay: 300})
  tl.from({el: '.scroll-icon', p: {y: [100, 0]}, d: 1200, e: 'Power4InOut', delay: 500})


  tl.from({el: '.menu', p: {opacity: [0, 1]}, d: 900, e: 'ExpoOut'})


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

Loader.pr.from({el: ".loader-line", p: { x: [-100, -100 * t] }, d: 6000, e: "Power4InOut", delay: 450});

Loader.run = function() {

    Loader.pr.play({cb: intro})

};

console.log('loader.js')



export default Loader