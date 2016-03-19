<?php
/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/9/2016
 * Time: 8:34 AM
 */


$app->add(function ($request, $response, $next) {
    if (AppCore::CheckIgnoreRoute($request->getUri()->getPath())) {
        return $response = $next($request, $response);
    }
    $method = $request->getMethod();
    $contentRaw = $request->getParams();//For POST anf PUT method
    $content = http_build_query($contentRaw);
    $contentType = $request->getHeaderLine('Content-Type');
    $date = gmdate('m/d/Y H:i:s T');
    $path = $request->getUri()->getPath();
    $uri = AppConfig::API_ROOT . $path;
    $signature = $method . '\n'
        . md5($content) . '\n'
        . $contentType . '\n'
        . $date . '\n'
        . $uri;

    $auth = Utils::calculateHMAC($signature, AppConfig::API_SECRET_KEY);

    $postdata = $content;
    $apiUrl = AppConfig::API_ROOT . $path;
    $header = [
        'Content-Type: ' . $contentType,
        'X-Auth: BED_ADM ' . AppConfig::API_PUBLIC_KEY . ':' . $auth,
        'X-Date: ' . $date,
        'Accept: application/json'
    ];

    $cur = curl_init($apiUrl);
    curl_setopt($cur, CURLOPT_RETURNTRANSFER, true);
    if ($method == 'POST') {
        curl_setopt($cur, CURLOPT_POST, $method == 'POST');
        curl_setopt($cur, CURLOPT_POSTFIELDS, $postdata);
    }
    if ($method == 'PUT') curl_setopt($cur, CURLOPT_PUT, $method == 'PUT');
    if ($method == 'GET') curl_setopt($cur, CURLOPT_HTTPGET, $method == 'GET');
    //curl_setopt($cur, CURLOPT_HEADER, true);
    curl_setopt($cur, CURLOPT_HTTPHEADER, $header);
    $data = curl_exec($cur);
    $info = curl_getinfo($cur);
    $http_codes = $info['http_code'];
    $response = $response
        ->withJson(
            $http_codes == 200
                ? json_decode($data, true)
                : is_string($data) ? json_decode($data, true) : $data
        )
        ->withStatus($http_codes);
    curl_close($cur);
    return $response;

});