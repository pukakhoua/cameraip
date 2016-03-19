<?php
/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/2/2016
 * Time: 9:33 PM
 */

$app->add(function ($request, $response, $next) {
    $response = $response->withStatus(200)
        ->withHeader('Access-Control-Allow-Origin','*')
        ->withHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
        ->withHeader('Access-Control-Allow-Headers','some_value');
    $response = $next($request, $response);

    return $response;
});

function Test(){

}