/* eslint-disable */

/*

CONTROLLER
──────────

Xhr.controller(pageName, myCallback, args);

function myCallback(response, args) {

    // Insert HTML
    app.insertAdjacentHTML('beforeend', response);

}

ONPOPSTATE
──────────

Xhr.onPopstate()

*/

import S from 'skylake'
import EventDelegation from './EventDelegation.js'
import Transition from '../app/Bundle/Common/Transition/Transition.js'
import Menu from '../app/Bundle/Common/Transition/Menu.js'


class Xhr {

    constructor () {

        

    }

    controller(page, callback, args) {
        const path = 'index.php?url=' + page + '&xhr=true'
        const xhr = new XMLHttpRequest()
        const pageEl = S.Geb.id('xhr')
        

        xhr.open('GET', path, true)
        console.log('Xhr class controller loaded')

        xhr.onreadystatechange = _ => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let xhrC = JSON.parse(xhr.responseText).xhrController
              

                S.Geb.tag('title')[0].textContent = xhrC.title
                // EventDelegation.prototype.xhrCallback(xhrC)

                getHistoryUpdate()
                const transit = {
                    insertNew: _ => {
                        pageEl.insertAdjacentHTML('beforeend', xhrC.view)
                    },
                    removeOld: _ => {
                        while (pageEl.hasChildNodes()) {
                            pageEl.removeChild(pageEl.lastChild);
                          }
                        // const oldXhrContent = pageEl.children[0]
                        // oldXhrContent.parentNode.removeChild(oldXhrContent)
                    }
                }
                transit.removeOld()
                transit.insertNew()
                //pageEl.insertAdjacentHTML('beforeend', xhrC.view)
                //window.Penryn.outroIsOn = true
                EventDelegation.prototype.run()
                Transition.disable_scroll()
                console.log('hello from xhr')
                loadjscssfile("/static/js/app.js", "js") //dynamically load and add this .js file
                loadjscssfile("/static/style/css/app.css", "css") ////dynamically load and add this .css file
                Xhr.prototype.onPopstate()
            }
            
        }

       
        xhr.send(null)
        
        // Browser history update
        function getHistoryUpdate () {
            const pageUrl = page === 'home' ? '/' : page

            history.pushState({key: 'value'}, 'titre', pageUrl)
        }
    }

    process() {
        console.log(global.myXhr)
        EventDelegation.prototype.xhrCallback(xhrC)
    }

    onPopstate() {
        const d = document
        const w = window

        let blockPopstateEvent = d.readyState !== 'complete'

        S.Listen(w, 'add', 'load', load)
        S.Listen(w, 'add', 'popstate', popstate)

        function load () {
            setTimeout(_ => {
                blockPopstateEvent = false
            }, 0)
        }

        function popstate (e) {
            if (blockPopstateEvent && d.readyState === 'complete') {
                e.preventDefault()
                e.stopImmediatePropagation()
            }
        }

        w.onpopstate = e => {
            /* state is null when change url without change page → story stream social wall for example */
            if (e.state !== null) {
                w.location.href = S.Win.path
            }
        }
    }


}

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
 
export default Xhr

