<?php

/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/9/2016
 * Time: 7:37 PM
 */
class RestCredentials
{
    private $requestData;
    private $signature;

    public function __construct($requestData, $signature)
    {
        $this->requestData = $requestData;
        $this->signature = $signature;
    }

    public function getRequestData()
    {
        return $this->requestData;
    }

    public function getSignature()
    {
        return $this->signature;
    }
}