<?php

/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/2/2016
 * Time: 9:39 PM
 */
class GuardSevice
{

    function __construct()
    {

    }

    public function InitSession()
    {
        $timestamp = time();
        $hashedPublicKey = HASH_HMAC(
            'sha1'
            , ApiConfig::PROXY_PUBLIC_KEY . $timestamp
            , ApiConfig::PROXY_SECRET_KEY
        );
        setcookie(ApiConfig::TOKEN_NAME, $hashedPublicKey, time() + (86400 * 7), "/"); // 86400 = 1 day
        $_SESSION[ApiConfig::TOKEN_NAME] = $hashedPublicKey;
    }


}