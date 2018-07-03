/* eslint-disable */

import Loader from '../../app/Bundle/Common/Transition/Loader.js'
import Transition from '../../app/Bundle/Common/Transition/Transition.js'
import Xhr from '../../Engine/Xhr.js'
import EventDelegation from '../../Engine/EventDelegation.js'
import Listeners from '../../Engine/Listeners.js'
import Menu from '../../app/Bundle/Common/Transition/Menu.js'
import S from 'skylake'

console.dir(Listeners)

class HomeController extends Listeners {

    constructor () {
        super(Listeners)
        console.dir(Listeners)
        console.log('home constructor')
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
            //         el: '#h-link',
            //         module: HomeController,
            //         method: 'outro'
            //     }
            // ],
            // click: [
            //     {
            //         el: '#burger',
            //         module: Vendor,
            //         method: 'bindButtonClick'
            //     }
            // ],
            // scroll: {
            //     throttle: {
            //         throttle: true,
            //         skylake: 'Scroll'
            //     }
                // module: Resize,
                // method: 'calculate'
            //}
        })
    }

    preload (opts) {
        // Transition.callback()
        //Transition.disable_scroll()
        Transition.open()
        console.log('Transition.outro from HomeController')
        Listeners.prototype.add({cb:
            Loader.run({cb: this.intro()})
        })
        console.log('Loader.run from HomeController')
        Menu.prototype.bindButtonClick()
        //EventDelegation.destAbout()  
        //EventDelegation.prototype.run()
        
    }
    intro (opts) {
        Listeners.prototype.add({cb:Transition.intro.play()})
        {cb: this.outro()}
        console.log('Transition.intro from HomeController')
    }

    outro (done, listeners) {
        Listeners.prototype.remove({
            destroy: true
        })
        
    }
    
}

export default HomeController
