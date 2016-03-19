<?php

/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/5/2016
 * Time: 5:22 AM
 */
final class Utils
{
    public static function calculateHMAC($data, $key)
    {
        return base64_encode(hash_hmac('sha1', $data, $key));
    }

    public static function getAddress()
    {
        /*** check for https ***/
        $protocol =isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http';
        /*** return the full address ***/
        return $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    }

    public static function get_http_response_code($url)
    {
        $headers = get_headers($url);
        return [substr($headers[0], 9, 3),$headers[0]];
    }


}