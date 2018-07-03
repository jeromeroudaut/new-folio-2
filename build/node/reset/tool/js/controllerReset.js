const fs = require('fs')
const config = require('../../config/config.js')

module.exports = _ => {
    const folder = config.js.controller

    fs.readdir(folder, (err, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i] !== 'HomeController.js' && files[i] !== 'ErrorController.js') {
                getUnlink(files[i])
            }
            if (i === files.length - 1) {
                createJsController()
            }
        }
    })

    function getUnlink (file) {
        fs.unlinkSync(folder + file)
    }

    function createJsController () {
        const jsControllerDest = config.js.controller + 'AboutController.js'

        var stream = fs.createWriteStream(jsControllerDest)
        stream.once('open', _ => {
            stream.write('import Loader from \'../Bundle/Common/Transition/Loader.js\'\r\n')
            stream.write('import Transition from \'../Bundle/Common/Transition/Transition.js\'\r\n')
            stream.write('import Listeners from \'../Bundle/Common/Listeners/Listeners.js\'\r\n')
            stream.write('\r\n')
            stream.write('class AboutController {\r\n')
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
            stream.write('export default AboutController\r\n')
            stream.end()
        })
    }
}
