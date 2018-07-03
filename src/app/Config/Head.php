<?php

namespace App\Config;

class Head {

    public static function data () {
        $head['urlBase'] = 'http://192.168.0.14'; // Desktop version only with protocol
        $head['serverName'] = '192.168.0.14'; // Desktop or mobile without protocol

        $head['twitter']['pseudo']  = '';
        $head['twitter']['creator'] = '';

        return $head;
    }

}
