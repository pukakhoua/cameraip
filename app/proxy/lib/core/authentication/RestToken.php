<?php

/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/9/2016
 * Time: 7:41 PM
 */
class RestToken
{
    private $timestamp;
    private $credential;

    public function __construct($credential, $timestamp)
    {
        $this->credential = $credential;
        $this->timestamp = $timestamp;
    }

    public function getCredential()
    {
        return $this->credential;
    }

    public function getTimestamp()
    {
        return $this->timestamp;
    }

}