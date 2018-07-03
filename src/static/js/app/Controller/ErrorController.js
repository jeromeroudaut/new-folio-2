import Loader from '../../app/Bundle/Common/Transition/Loader.js'
import Transition from '../../app/Bundle/Common/Transition/Transition.js'
import Listeners from '../../Engine/Listeners.js'

class ErrorController {

    preload () {
        Loader.run({
            listeners: Listeners
        })
    }

    intro () {
        Transition.intro({
            listeners: Listeners
        })
    }

    outro () {
        Transition.outro({
            listeners: Listeners
        })
    }

}

export default ErrorController
