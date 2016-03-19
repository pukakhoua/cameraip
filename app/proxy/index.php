<?php

require 'vendor/autoload.php';
require_once 'lib/config/AppConfig.php';
require_once 'lib/config/ApiConfig.php';

require_once 'lib/core/DB.php';
require_once 'lib/core/AppCore.php';
require_once 'services/guard.service.php';
require_once 'lib/core/Utils.php';


require_once 'lib/core/bootstrap.core.php';
require_once 'lib/core/StatusCodes.php';

session_start();
$time = $_SERVER['REQUEST_TIME'];

$timeout_duration = AppConfig::SESSION_TIMEOUT;


if (isset($_SESSION['LAST_ACTIVITY']) && ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    session_unset();
    session_destroy();
    session_start();

//    $gs=new GuardSevice();
//    $gs->InitSession();
//    header("HTTP/1.1 401 Internal Server Error");
}


$_SESSION['LAST_ACTIVITY'] = $time;


/**-------------------
 * HANDLE ERROR
 *-------------------*/
$c = new Slim\Container(AppConfig::SLIM_CONFIGS);

require_once 'lib/core/errorhandler.core.php';


$app = new Slim\App($c);
require_once __DIR__ . '/middlewares/transporter.middleware.php';
require_once __DIR__ . '/middlewares/appguard.middleware.php';


// Automatically load router files
$routers = glob('routes/*.route.php');
foreach ($routers as $router) {
    require $router;
};

$app->run();
