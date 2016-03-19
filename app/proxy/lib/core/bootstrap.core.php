<?php
/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/15/2016
 * Time: 12:33 PM
 */
//error_reporting(E_ALL & ~E_NOTICE);

date_default_timezone_set('Asia/Ho_Chi_Minh');

ini_set("log_errors", "1");
ini_set("error_log", "Errors.log.txt");
ini_set("display_errors", AppConfig::IS_DEBUG ? "1" : '0');
