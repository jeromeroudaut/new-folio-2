/* eslint-disable */

import S from 'skylake'
import Xhr from './Xhr.js'


class EventDelegation {

    constructor (getInstance) {

        console.dir(Xhr)
        // Opts
        this.getInstance = getInstance
        // Parameters
        this.p = window.Penryn
        this.b = S.Dom.body
        //this.a = S.Geb.id('a-link')
        this.xhr = S.Geb.id('xhr')

        // Bind
        S.BindMaker(this, ['eventDelegation', 'done', 'xhrCallback'])

    }

    // Singleton () {
    //     var instance;
     
    //     function createInstance() {
    //         var object = new Xhr.xhrC();
    //         return object;
    //     }
     
    //     return {
    //         getInstance: function () {
    //             if (!instance) {
    //                 instance = createInstance();
    //             }
    //             return instance;
    //         }
    //     };
    // }

    run () {
        S.BindMaker(this, ['eventDelegation', 'done', 'xhrCallback'])
        S.Listen(S.Dom.body, 'add', 'click', this.eventDelegation)
        // S.Listen('#h-link', 'add', 'click', this.eventDelegation)
        // S.Listen('#a-link', 'add', 'click', this.eventDelegation)

        console.log('coming from EventDelegation run method')
    }

    eventDelegation (event) {
        const w = window
        let target = event.target
        let targetIsATag = false
        let targetIsASubmit = false

        while (target) {
            if (target.tagName === 'A') {
                targetIsATag = true
                break
            } else if ((target.tagName === 'INPUT' || target.tagName === 'BUTTON') && target.type === 'submit') {
                targetIsASubmit = true
                break
            }
            target = target.parentNode
        }

        if (targetIsATag) {
            const targetHref = target.dataset.href === undefined ? target.href : target.dataset.href

            if (target.classList.contains('_tb')) {
                prD()
                w.open(targetHref)
            } else if (target.classList.contains('_tbs')) {
                prD()

                if (this.isTouch && this.isSafari) {
                    w.location.href = targetHref
                } else {
                    w.open(targetHref)
                }
            } else {
                const hrefBeginByHash = targetHref.charAt(targetHref.length - 1) === '#'
                const hrefIsMailto = targetHref.substring(0, 6) === 'mailto'

                if (hrefBeginByHash) {
                    prD()
                } else if (!hrefIsMailto && !target.classList.contains('_ost') && targetHref !== '' && target.getAttribute('target') !== '_blank') {
                    prD()

                    if (window.Penryn.isOutroOn) {
                        this.path = {
                            old: S.Win.path,
                            new: targetHref.replace(/^.*\/\/[^/]+/, '')
                        }
                    
                        if (this.path.old !== this.path.new) {
                            this.p.outroIsOn = false

                            this.target = target
                            this.xhrReq()
                        }
                    }
                } else if (hrefIsMailto) {
                    prD()
                    const myWindow = w.open(targetHref)
                    setTimeout(_ => {
                        myWindow.close()
                    }, 300)
                }
            }
        } else if (targetIsASubmit) {
            prD()
        }

        function prD () {
            event.preventDefault()
        }
    }

    xhrReq () {
        const oldInstance = this.getInstance(this.path.old)

        this.p.done = this.done
        this.p.target = this.target
        this.p.path = this.path

        // Old outro
        oldInstance.controller.outro()
    }

    done () {
        let target = event.target
        const targetHref = target.dataset.href === undefined ? target.href : target.dataset.href
        this.path = {
            old: S.Win.path,
            new: targetHref.replace(/^.*\/\/[^/]+/, '')
        }
        // Xhr.prototype.controller(this.path.new, EventDelegation.prototype.xhrCallback())
    }

    xhrCallback (response) {
        console.log(response)
        console.log('hello from xhrCallback')
        const transit = {
                    insertNew: _ => {
                        S.Geb.id('xhr').insertAdjacentHTML('beforeend', response)
                    },
                    removeOld: _ => {
                        const oldXhrContent = S.Geb.id('xhr').children[0]
                        oldXhrContent.parentNode.removeChild(oldXhrContent)
                    }
                }
        transit.removeOld()
        transit.insertNew()

        // // New intro
        //newInstance.prototype.intro()
    }

}

EventDelegation.destHome = function() {
  S.Listen("#a-link", "add", "click", function() {
    Xhr.prototype.controller("/", myCallback);

    function myCallback(response, args) {
      console.log("myCallback called");
    }
  });
};

EventDelegation.destAbout = function() {
  S.Listen("#h-link", "add", "click", function() {
    Xhr.prototype.controller("about", myCallback);

    function myCallback(response, args) {
      console.log("myCallback called");
    }
    
  });
};

export default EventDelegation
