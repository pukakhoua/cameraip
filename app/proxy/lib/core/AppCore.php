<?php
/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/3/2016
 * Time: 5:29 AM
 */

final class AppCore
{
    public static function CheckIgnoreRoute($urlToCheck){
        if (in_array($urlToCheck, AppConfig::IGNORE_ROUTES))
            return true;
        return false;
    }

}