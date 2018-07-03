<?php

namespace App\Controller;

use \Engine\Controller\Controller;

class HomeController extends Controller {

    public function show () {

        /*------------------------------------
            MESSAGE
        ------------------------------------*/

        $this->data->msg = '';

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'Website — Home';
        $this->head['description'] = '';
        $this->head['opengraph'] = '/static/media/fav/open-graph/1200-630.png';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/

        $this->render('home');
    }

}
