<?php

/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 1/28/2016
 * Time: 5:37 PM
 */
class AppConfig
{
    const SLIM_CONFIGS = [
        'settings' => [
            'displayErrorDetails' => false,
        ],
    ];

    const IGNORE_ROUTES = array(
        'init-session'
    );

    const API_ROOT = 'http://bedstore.ng-datacenter.com:9999/web/';

    const API_SECRET_KEY = 'ng-KeyWeb';
    const API_PUBLIC_KEY = '13b6111d2a4cd8b01096fb48da89496d8228e3a6';
    const SESSION_TIMEOUT = 1800;//in seconds
    const IS_DEBUG = false;
    const SERVER_ERR_MSG = 'Internal Server Error';
}

