<?php
/**
 * CONSTANTS
 */
define('BASE_DIR', dirname(__FILE__));
define('BASE_URL', 'http://' . $_SERVER['HTTP_HOST'] . str_replace('/index.php', '', $_SERVER['PHP_SELF']));

include_once 'vendor/autoload.php';
include_once 'custom_autoload.php';

if(ENVIRONMENT != 'production') {
   /**
    * ROUTING
    */
   $base  = dirname($_SERVER['PHP_SELF']);

   // Update request when we have a subdirectory    
   if(ltrim($base, '/')){ 
       $base = str_replace(' ', '%20', $base);
       $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($base));
   } 
}

// Dispatch as always
$klein = new \Klein\Klein();

/**
 * Default controller & method
 */
$klein->respond('/', function(){
    //forward to home/index
    $controller = new home();
    $controller->index();
});

/**
 * Fetch custom controller & method
 */
$klein->respond('/[:controller]/[:method]?/[:action]?/[:value]?', function ($request) {
    if (class_exists(ucfirst($request->controller))) {
        $controllerName = $request->controller;
        $controller = new $controllerName();
        if (isset($request->method) && !empty($request->method) && method_exists($controller, $request->method)) {
            $method = $request->method;
            return $controller->$method($request->action, $request->value);
        } else {
            return $controller->index($request->action, $request->value);
        }
    } else {
        //404
    }
});

$klein->dispatch();