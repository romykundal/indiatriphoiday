<?php

class SiteController extends Zend_Controller_Action
{

	
   public function indexAction()
    {
    	$siteslist = Site::getSites();
    	$this->view->sites= Zend_Json::encode($siteslist);
    	
   	}
    
     
   
// End class
}
