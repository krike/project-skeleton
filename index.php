<?php

if ($_SERVER['HTTP_HOST'] != "localhost:8888" && $_SERVER['HTTP_HOST'] != "localhost" && $_SERVER['HTTP_HOST'] != "192.168.1.101:88" ) {
	define('ENVIRONMENT', 'production');
} else {
	define('ENVIRONMENT', 'development');
}
/*
 *---------------------------------------------------------------
 * ERROR REPORTING
 *---------------------------------------------------------------
 *
 * Different environments will require different levels of error reporting.
 * By default development will show errors but testing and live will hide them.
 */

if (defined('ENVIRONMENT'))
{
    switch (ENVIRONMENT)
    {
        case 'development':
            error_reporting(E_ALL);
        break;

        case 'testing':
        case 'production':
            error_reporting(0);
        break;

        default:
            exit('The application environment is not set correctly.');
    }
}
	

include_once 'bootstrap.php';