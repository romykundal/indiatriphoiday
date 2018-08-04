<?php
/**
 *load all function,view required for zend 
 *@author kraj
 *@version 1.0
 */
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {
	
	function _initTranslation()
	{
		// Define the path where the language files are
		// Create an instance of Zend's gettext adapter
		//$translate = new Zend_Translate_Adapter_Gettext('C:\wamp\www\kortingscode\kortingscode\application\language\test.mo', 'hi');
		// Set the location to 'en' just to check wheter the english translation is working
		//$translate->setLocale('hi');
	
		// Set this Translation as global translation for the view helper
		//Zend_Registry::set('Zend_Translate', $translate);
	}
	
	/**
	 * Defined docoment type of view , meta description and head title of view
	 * @author Er.kundal
	 * @version1.0
	 */
	protected function _initDocType() {
	
		$this->bootstrap('View');
		$view = $this->getResource('View');
		$view->doctype('HTML5');
		// Set the initial title and separator:
		$view->headTitle('India trip holiday')->setSeparator(' :: ');
		$view->headMeta()
		     ->appendHttpEquiv('Content-type', 'text/html; charset=UTF-8')
		     ->appendName('description', 'India trip holiday');
	}
	
	
	/**
	 * set all path of application,form,model etc
	 * @return Zend_Loader_Autoloader
	 * @author Er.kundal
	 * @version1.0
	 */
	protected function _initAutoLoad() {
		$autoLoader = Zend_Loader_Autoloader::getInstance();
		$resourceLoader = new Zend_Loader_Autoloader_Resource(
				array('basePath' => APPLICATION_PATH,
						'namespace' => 'Application',
						'resourceTypes' => array(
								'form' => array('path' => 'forms/',
										'namespace' => 'Form'),
								'model' => array('path' => 'models/',
										'namespace' => 'Model'))));
		return $autoLoader;
	}
	protected function _initNavigation() {
	}
	
	
	/**
	 * Set module level layout and doctype of rendered view
	 * @author kraj
	 * @version1.0
	 */
	protected function _initSiteModules() {
		//Don't forget to bootstrap the front controller as the resource may not been created yet...
		$this->bootstrap("frontController");
		$viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper(
				'viewRenderer');
		$viewRenderer->initView();
		$viewRenderer->view->doctype('XHTML1_STRICT');
		$front = $this->getResource("frontController");
		//Add modules dirs to the controllers for default routes...
		$front->addModuleDirectory(APPLICATION_PATH . '/modules');

	}
	
	
	/**
	 * Create connection with database by doctrine and
	 * defined model ,time zone and get dsn(doman name server)
	 * @return Ambigous <Doctrine_Connection, multitype:>
	 * @author kraj
	 * @version1.0
	 */
	protected function _initDoctrine() {

		spl_autoload_register(array('Doctrine', 'modelsAutoload'));

		$manager = Doctrine_Manager::getInstance();
		//$manager->setAttribute(Doctrine_Core::ATTR_TBLNAME_FORMAT, $doctrineOptions["prefix"] . '_%s');

		$manager->setAttribute(Doctrine_Core::ATTR_MODEL_LOADING,
						Doctrine_Core::MODEL_LOADING_CONSERVATIVE);
		$manager->setAttribute(Doctrine_Core::ATTR_AUTO_ACCESSOR_OVERRIDE, true);
		$manager->setAttribute(Doctrine::ATTR_AUTOLOAD_TABLE_CLASSES, true);

		Doctrine_Core::loadModels(APPLICATION_PATH . '/models');

		$doctrineOptions = $this->getOption('doctrine');

		$conn = Doctrine_Manager::connection($doctrineOptions["dsn"],
				"doctrine");
		date_default_timezone_set('Asia/Calcutta');

		return $conn;
	}
	
	/**
	 * set cross domain session.for sso
	 */
/*	protected function _initSession()
	{
		Zend_Session::setOptions(array('cookie_domain' => '.seasiaconsulting.com','name'=>'token'));
		Zend_Session::start();
	}
	*/
	
	
	/**
	 * defined and set module level layout
	 * @author kkumar
	 * @version1.0
	 */
	protected function _initLayoutHelper() {
		$this->bootstrap('frontController');
		$layout = Zend_Controller_Action_HelperBroker::addHelper(
				new ModuleLayoutLoader());
	}

	protected function _initCache(){


			$frontendOptions = array(
			   'lifetime' => 300,                   // cache lifetime
			   'automatic_serialization' => true  
			);
			 
			$backendOptions = array('cache_dir' => './tmp/');
			 
			$cache = Zend_Cache::factory('Output',
			                             'File',
			                             $frontendOptions,
			                             $backendOptions);

			Zend_Registry::set('cache',$cache);

	}
}
/**
 * load module layout by geting value from application file
 * and set layout for module
 * @author rohit
 */
class ModuleLayoutLoader extends Zend_Controller_Action_Helper_Abstract
 {
 		public function preDispatch() {
		$bootstrap = $this->getActionController()->getInvokeArg('bootstrap');
		$config = $bootstrap->getOptions();
		$module = $this->getRequest()->getModuleName();
		if (isset($config[$module]['resources']['layout']['layout'])
				&& isset($config[$module]['resources']['layout']['layoutPath'])) {
			$layoutScript = $config[$module]['resources']['layout']['layoutPath'];
			$layoutName = $config[$module]['resources']['layout']['layout'];

			$this->getActionController()->getHelper('layout')
					->setLayoutPath($layoutScript);
			$this->getActionController()->getHelper('layout')
					->setLayout($layoutName);
		}
	}
}

