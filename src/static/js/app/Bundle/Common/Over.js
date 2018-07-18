/* eslint-disable */

//import jQuery from "jquery";
import S from 'skylake'
import Xhr from "../../../Engine/Xhr.js";
import EventDelegation from "../../../Engine/EventDelegation.js";


//$('#h-link').on('click', Over)

const destAbout = function() {

    S.Listen('#h-link', 'add', 'click', function() {

        Xhr.controller('about', myCallback);

        function myCallback(response, args) {
        // Insert HTML
            //xhr.insertAdjacentHTML('beforeend', response);
            console.dir(EventDelegation)
            EventDelegation.prototype.run()
            EventDelegation.prototype.eventDelegation(event)
            //EventDelegation.prototype.xhrReq()
            EventDelegation.prototype.done()
            console.log('hello from aboutXhr')
            EventDelegation.prototype.xhrCallback(response)
        }
    })

    Xhr.onPopstate()

}

const destHome = function() {

    S.Listen('#a-link', 'add', 'click', function() {

        Xhr.controller('/', myCallback);

        function myCallback(response, args) {
        // Insert HTML
            //xhr.insertAdjacentHTML('beforeend', response);
            console.dir(EventDelegation)
            EventDelegation.prototype.run()
            EventDelegation.prototype.eventDelegation(event)
            //EventDelegation.prototype.xhrReq()
            EventDelegation.prototype.done()
            console.log('hello from homeXhr')
            EventDelegation.prototype.xhrCallback(response)
        }
    })

    Xhr.onPopstate()

}


export default Over


// class Over extends EventDelegation {

    //   constructor() {
    
    //     super(EventDelegation);
    
    //     Over = function() {
    
    //         S.Listen('#h-link', 'add', 'click', function() {
        
    //         Xhr.controller('about', myCallback);
        
    //             function myCallback(response, args) {
    //             const app = document.querySelector("#app");
    //             // Insert HTML
    //             console.dir(EventDelegation)
    //             //app.insertAdjacentHTML('beforeend', response);
    //             EventDelegation.prototype.xhrCallback(response);
    //             console.log("xhrCallback from Over.js");
    //             }
        
    //         Xhr.onPopstate();
    //         })
    //     }
    
    //   } 
