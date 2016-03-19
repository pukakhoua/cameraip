<?php
/**
 * Created by PhpStorm.
 * User: Poka
 * Date: 2/15/2016
 * Time: 12:27 PM
 */

set_error_handler('exceptions_error_handler');
register_shutdown_function('fatal_handler');

function fatal_handler()
{
    $lastError = error_get_last();
    $exception = error_get_last();
    if (!is_null($exception)) {
        header('Content-Type: application/json');
        $data = [
            'data' => null,
            'status' => 500,
            'error' => AppConfig::IS_DEBUG
                ? ['code' => $exception['type'],
                    'message' => $exception['message'],
                    'file' => $exception['file'],
                    'line' => $exception['line'],
                    'trace' => null]
                : AppConfig::SERVER_ERR_MSG
        ];
        echo json_encode($data);
    }
}
function exceptions_error_handler($severity, $message, $filename, $lineno)
{
    if (error_reporting() == 0) {
        return;
    }


    $errType = '';
    switch ($severity) {//http://php.net/manual/en/errorfunc.constants.php
        case E_USER_ERROR:
            $errType = 'E_USER_ERROR';
            //exit(1);
            break;

        case E_USER_WARNING:
            $errType = 'E_USER_WARNING';
            break;

        case E_USER_NOTICE:
            $errType = 'E_USER_NOTICE';
            break;
        case E_NOTICE:
            $errType = 'E_NOTICE';
            break;
        default:
            $errType = 'UNKNOWN';
            break;
    }
    $errMesg = '[ ' . $errType . ' ]' . ': ' . $message . ' in ' . $filename . ' on line ' . $lineno . "\n";
    error_log($errMesg);

    /* Don't execute PHP internal error handler */
   // return true;

    if (error_reporting() & $severity) {
        throw new ErrorException($message, 0, $severity, $filename, $lineno);
    }
}



$c['errorHandler'] = function ($c) {
    return function ($request, $response, $exception) use ($c) {
        error_log($exception);
        $data = [
            'data' => null,
            'status' => 500,
            'error' => AppConfig::IS_DEBUG
                ? ['code' => $exception->getCode(),
                    'message' => $exception->getMessage(),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'trace' => explode("\n", $exception->getTraceAsString())]
                : AppConfig::SERVER_ERR_MSG
        ];

        return $c->get('response')->withJson($data)->withStatus(500);
    };
};