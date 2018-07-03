/* eslint-disable */

import JQuery from 'jquery'
import S from 'skylake'

const intro = function() {
  const tl = new S.Timeline()
  const isObj = S.Is.object(tl)

  tl.from({el: "#loader-line-wrap", p: { opacity: [1, 0]}, d: 400, e: 'Power4InOut'});
  tl.from({el: '#sail-top', p: {y: [0, -100]}, d: 1500, e: 'Power4InOut'})
  tl.from({el: '#sail-bot', p: {y: [0, 100]}, d: 1500, e: 'Power4InOut'})
  tl.from({el: '.header', p: {scale: [1.2, 1]}, d: 1800, delay: 250, e: 'Power3In'})
  //tl.from({el: '.tagline', p: {y: [100, 0]}, d: 1600, e: 'Power4InOut'})
  tl.from({el: '#burger-border-wrap', p: {opacity: [0, .6]}, d: 1500, e: 'ExpoOut', delay: 200})
  tl.from({el: '.burger-line-hover', p: {x: [105, 0]}, d: 1000, e: 'ExpoOut', delay: 500})
  tl.from({el: '.scroll-icon-wrap', p: {opacity: [0, 1], y: [100, 0]}, d: 1500, e: 'Power4InOut', delay: 500})
  tl.from({el: '#burger-mask', p: {y: [100, -100]}, d: 2000, e: 'ExpoOut', delay: 500})

  tl.play()
}


const Loader = {}

Loader.pr = new S.Timeline()
const isObj = S.Is.object(Loader.pr)
const t = 1

Loader.pr.from({el: ".loader-line", p: { x: [-100, 0] }, d: 6000, e: "Power4InOut", delay: 900});

Loader.run = function() {

    Loader.pr.play({cb: intro})

};

console.log('loader.js')



export default Loader