<?php
/**
 * all the regarding Email Lightbox functionality
 * @author sunny patial
 * 
 */
class Admin_AccountsettingController extends Zend_Controller_Action
{
	/**
	 * check authentication before load the page
	 * @see Zend_Controller_Action::preDispatch()
	 * @author sunny patial
	 * @version 1.0
	 */
	public function preDispatch() {
		$conn2 = BackEnd_Helper_viewHelper::addConnection();//connection generate with second database
		$params = $this->_getAllParams();
		if (!Auth_StaffAdapter::hasIdentity()) {
			$referer = new Zend_Session_Namespace('referer');
			$referer->refer = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			$this->_redirect('/admin/auth/index');
		}
		BackEnd_Helper_viewHelper::closeConnection($conn2);
		$this->view->controllerName = $this->getRequest()->getParam('controller');
		$this->view->action = $this->getRequest()->getParam('action');
	
	}
	public function init()
    {
        /* Initialize action controller here */
    }

    /**
     * get stores to step 2 create account from database
     * get Codes for No more free logins from database
     * @author sunny patial
     * @version 1.0
     */
    public function indexAction()
    {
        // action body
    	$store_data = Signupfavoriteshop::getalladdstore();
    	$this->view->store_data=$store_data;
    	$data = Signupcodes::getfreeCodelogin();
    	$this->view->codelogindata = $data;
    	$maxacc_data = Signupmaxaccount::getallmaxaccounts();
    	$this->view->maxacc_data=$maxacc_data;
    	
        
    }
    public function deletecodeAction()
    {
    	$id=$this->getRequest()->getParam("id");
    	Signupcodes::deletecodebyid($id);
    	$data = Signupcodes::getfreeCodelogin();
    	echo Zend_Json::encode($data);
    	die;
    }
    public function addnewcodeAction(){
    	$userid=Zend_Auth::getInstance()->getIdentity()->roleId;
    	$codetext=$this->getRequest()->getParam("code");
    	Signupcodes::addcode($codetext,$userid);
    	$data = Signupcodes::getfreeCodelogin();
    	echo Zend_Json::encode($data);
    	die;
    }
    public function deletestoreAction(){
    	$id=$this->getRequest()->getParam("id");
    	Signupfavoriteshop::deletestorebyid($id);
    	$store_data = Signupfavoriteshop::getalladdstore();
    	echo Zend_Json::encode($store_data);
    	die;
    }
    public function statusupdateAction(){
    	$status=$this->getRequest()->getParam("status");
    	Signupmaxaccount::updatestatus($status);
    	//$last_status = Signupmaxaccount::getlaststatus();
    	//echo Zend_Json::encode($last_status);
    	die;
    }
    public function maxlimitAction(){
    	// request for account limit...
    	$limit=$this->getRequest()->getParam("limit");
    	// check how much account available 
    	$get_totalacc=Signupmaxaccount::getallmaxaccounts();
    	$totalfreeacc=$get_totalacc[0]['no_of_acc'];
    	$current_acc=Visitor::Visitortotal_acc();
    	//$available_acc=$totalfreeacc-$current_acc;
    	$save_acc=$limit-$current_acc;
    	if($save_acc>=0)
    	{
    	$userid=Zend_Auth::getInstance()->getIdentity()->roleId;
    	Signupmaxaccount::updatemaxlimit($limit,$userid);
    	}
    	else
    	{
    		$avail=$current_acc.",".$totalfreeacc;
    	echo Zend_Json::encode($avail);
    	}
    	die;
    }
    public function getshopsAction(){
    	$srh = $this->getRequest()->getParam('keyword');
    	$flag = 0;
    	//call to seach top 10 offer function in model class
    	$data = Signupfavoriteshop::searchTopTenShops($srh, $flag);
    	$ar = array();
    	if (sizeof($data) > 0) {
    	
    		foreach ($data as $d) {
    	
    			$ar[] = ucfirst($d['name']);
    			$ar[]=$d['id'];
    		}
    	} else {
    	
    		$msg = $this->view->translate('No Record Found');
    		$ar[] = $msg;
    	}
    	echo Zend_Json::encode($ar);
    	die();
    }
    public function addnewshopAction(){
    	$shopname=$this->getRequest()->getParam("shopname");
    	$shopid=$this->getRequest()->getParam("shopid");
    	$userid=Zend_Auth::getInstance()->getIdentity()->roleId;
    	$data = Signupfavoriteshop::addshop($shopname,$userid,$shopid);
    	$shopdata = Signupfavoriteshop::getalladdstore();
    	echo Zend_Json::encode($shopdata);
    	die;
    }
}

