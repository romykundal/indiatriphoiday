<?php

// Define path to application directory
defined('APPLICATION_PATH')
		|| define('APPLICATION_PATH',
				realpath(dirname(__FILE__) . '/../application'));

defined('LIBRARY_PATH')
		|| define('LIBRARY_PATH', realpath(dirname(__FILE__) . '/../library'));

defined('DOCTRINE_PATH') || define('DOCTRINE_PATH', LIBRARY_PATH . '/Doctrine');

// Define application environment
defined('APPLICATION_ENV')
		|| define('APPLICATION_ENV',
				(getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV')
						: 'production'));

define("HTTP_PATH", 'http://' . $_SERVER['HTTP_HOST'] . '/');

//PUBLIC PATH
defined('PUBLIC_PATH')
		|| define('PUBLIC_PATH',
			'http://' . $_SERVER['HTTP_HOST']
			. dirname($_SERVER['SCRIPT_NAME']) . '/');

//define root path
defined('ROOT_PATH')
		|| define('ROOT_PATH', dirname($_SERVER['SCRIPT_FILENAME']) . '/');


/**
 * define images path
 * @author Er.kundal
 */
//define upload path
defined('UPLOAD_PATH')
      || define('UPLOAD_PATH', 'images/');


//define upload image path
defined('UPLOAD_IMG_PATH')
		|| define('UPLOAD_IMG_PATH', UPLOAD_PATH . 'upload/');


defined('IMG_PATH')
|| define('IMG_PATH', PUBLIC_PATH . "images/"  );


$webSiteOfUser =  null;
//Ensure library/ is on include_path
set_include_path(
		implode(PATH_SEPARATOR,
				array(realpath(APPLICATION_PATH . '/../library'),
						get_include_path(),)));
set_include_path(
		implode(PATH_SEPARATOR,
				array(realpath(DOCTRINE_PATH), get_include_path(),)));
/** Zend_Application */
require_once 'Zend/Application.php';

//require_once 'PHPExcel/PHPExcel.php';


// Create application, bootstrap, and run
$application = new Zend_Application(APPLICATION_ENV,
		APPLICATION_PATH . '/configs/application.ini');

$application->bootstrap()->run();

