const fs = require('fs')
const config = require('../../config/config.js')

module.exports = page => {
    for (let i = 0; i < page.qty; i++) {
        createJsController(i)
    }

    function createJsController (i) {
        const jsControllerName = page.completeController[i]
        const jsControllerDest = config.page.js.controller + jsControllerName + '.js'

        var stream = fs.createWriteStream(jsControllerDest)
        stream.once('open', _ => {
            stream.write('import Loader from \'../Bundle/Common/Transition/Loader.js\'\r\n')
            stream.write('import Transition from \'../Bundle/Common/Transition/Transition.js\'\r\n')
            stream.write('import Listeners from \'../Bundle/Common/Listeners/Listeners.js\'\r\n')
            stream.write('\r\n')
            stream.write('class ' + jsControllerName + ' {\r\n')
            stream.write('\r\n')
            stream.write('    preload () {\r\n')
            stream.write('        Loader.run({\r\n')
            stream.write('            listeners: Listeners\r\n')
            stream.write('        })\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('    intro () {\r\n')
            stream.write('        Transition.intro({\r\n')
            stream.write('            listeners: Listeners\r\n')
            stream.write('        })\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('    outro () {\r\n')
            stream.write('        Transition.outro({\r\n')
            stream.write('            listeners: Listeners\r\n')
            stream.write('        })\r\n')
            stream.write('    }\r\n')
            stream.write('\r\n')
            stream.write('}\r\n')
            stream.write('\r\n')
            stream.write('export default ' + jsControllerName + '\r\n')
            stream.end()
        })
    }
}
