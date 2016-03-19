<?php
/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 1/31/2016
 * Time: 9:11 AM
 */

$app->get('/init-session', function ($request, $response) {
    if(!isset($_SESSION[ApiConfig::TOKEN_NAME])){
        $guard = new GuardSevice();
        $guard->InitSession();
        unset($guard);
        //sleep(180);
    }

});