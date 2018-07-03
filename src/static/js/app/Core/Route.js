/*

router.init('/', HomeController)
router.init('/about', AboutController)
router.init('/work/:id/:name', WorkOneController).with('id', '[0-9]+').with('name', '[a-z0-9-]+')
router.init('/work/:type', WorkAllController).with('type', 'date|title')
router.init('/work', WorkAllController)

*/

import Router from '../../Engine/Router.js'
import ErrorController from '../Controller/ErrorController.js'
import HomeController from '../Controller/HomeController.js'
import AboutController from '../Controller/AboutController.js'

class Route {

    constructor () {
        const router = new Router()

        router.init('/', HomeController)
        router.init('/about', AboutController)

        router.error(ErrorController)

        router.run()
    }

}

export default Route
