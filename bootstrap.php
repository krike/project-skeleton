<?php
/**
 * CONSTANTS
 */
define('BASE_DIR', dirname(__FILE__));
define('BASE_URL', 'http://' . $_SERVER['HTTP_HOST'] . str_replace('/index.php', '', $_SERVER['PHP_SELF']));

include_once 'vendor/autoload.php';

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
    $controller = new Krikke\Skeleton\Controller\Home();
    $controller->index();
});

/**
 * Fetch custom controller & method
 *
 * http://symfony.com/doc/current/components/routing/introduction.html (dynamische controller)
 */
$klein->respond('/[:controller]/[:method]?/[:action]?/[:value]?/?', function ($request) {
    $class = '\\Krikke\\Skeleton\\Controller\\' . ucfirst($request->controller);
    if (class_exists(ucfirst($class))) {
        $controller = new $class();
        if (isset($request->method) && !empty($request->method) && method_exists($controller, $request->method)) {
            $method = $request->method;
            return $controller->$method($request->action, $request->value);
        } else {
            return $controller->index();
        }
    } else {
        //404
    }
});


$klein->dispatch();