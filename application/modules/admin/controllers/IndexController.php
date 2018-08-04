<?php

class Admin_IndexController extends Zend_Controller_Action
{

	public function preDispatch ()
	{
	
		if (!Auth_StaffAdapter::hasIdentity())
		{
			$referer = new Zend_Session_Namespace('referer');
			$referer->refer = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			$this->_redirect('/admin/auth/index');
			
		}
	
	}
    public function init()
    {
       BackEnd_Helper_viewHelper::addConnection();//connection generate with second database
    	   
    }

    public function indexAction()
    {
    	$this->view->headTitle("Dashboard");
    }

    public function savewidgetAction()
    {
        // action body
    }


}



