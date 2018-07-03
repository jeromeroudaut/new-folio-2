/* eslint-disable */

import Loader from '../../app/Bundle/Common/Transition/Loader.js'
import Transition from '../../app/Bundle/Common/Transition/Transition.js'
import Xhr from '../../Engine/Xhr.js'
import EventDelegation from '../../Engine/EventDelegation.js'
import Listeners from '../../Engine/Listeners.js'
import Menu from '../../app/Bundle/Common/Transition/Menu.js'
import S from 'skylake'

console.dir(Listeners)

class AboutController extends Listeners {

    constructor () {
        super(Listeners)
        moduleInit: true
        console.dir(Listeners)
        console.log('about constructor')
        this.init({
            mouseWheel: [
                {
                    moduleInit: true,
                    el: 'body',
                    module: Transition,
                    method: 'scrollInit',
                    outroM: this.outroM
                }
            ],
            // click: [
            //     {
            //         el: '#burger',
            //         module: Vendor,
            //         method: 'bindButtonClick'
            //     }
            // ],
            ro: {
                throttle: {
                    delay: 200,
                    atEnd: true
                }
                // module: Resize,
                // method: 'calculate'
            }
        })
    }

    preload (opts) {
        Transition.open()
        console.log('Transition.outro from HomeController')
        Listeners.prototype.add({cb:
            Loader.run({cb: this.intro()})
        })
        console.log('Loader.run from HomeController')
        Menu.prototype.bindButtonClick()
        EventDelegation.destHome()  
        //EventDelegation.prototype.run()
        
    }

    intro (opts) {
        Listeners.prototype.add({cb:Transition.intro.play()})
        // {cb: this.outro()}
        console.log('Transition.intro from HomeController')
    }

    outro (done, listeners) {
        Listeners.prototype.remove({
            destroy: true
        })
        
        }

}

export default AboutController
