<?php
/**
 * this class is used for index (home ) of the site 
 * get value from database and display on home page
 * 
 * 
 *
 */

class AboutController extends Zend_Controller_Action
{

    public function init()
    {

		/*
		 * Initialize action controller here
		 * 
		 */
		
		
		$this->view->controller = $instance = $this->getRequest()->getControllerName();
		$this->view->action = $this->getRequest()->getActionName();
    }

    public function indexAction()
    {
		

    }


}

