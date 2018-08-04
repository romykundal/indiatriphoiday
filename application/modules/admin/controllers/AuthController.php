<?php

class Admin_AuthController extends Zend_Controller_Action {

	/**
	 * handle database connection
	 * (non-PHPdoc)
	 * @see Zend_Controller_Action::init()
	 */
	public function init() {
		
		BackEnd_Helper_viewHelper::addConnection();//connection generate with second database

	}
	/**
	 * handle request
	 * @see Zend_Controller_Action::preDispatch()
	 * @author  Er.kundal
 	 * @version 1.0
	 */
	public function preDispatch ()
	{
	
		//get action name from zend parametes
		$action = $this->getRequest()->getActionName();
		
		// check action  
		switch($action)
		{
			case "logout" :
			
			break;
			
			default :
				//if user is authenticated 
				if (Auth_StaffAdapter::hasIdentity() )
				{
					$this->_redirect('/admin/');
				}
			break;	
		}
	
	}
	
	/**
	 * Action use for login user
	 * user enter the valid username and password then
	 * redirect to user list in admin panle
	 * @author Er.kundal
	 * @version 1.1
	 */
	public function indexAction() {
		//echo $this->view->translate('CMS LOGIN');
		//Get all params from post/get
		
		$this->view->headTitle("Admin Login page");
		$params = $this->_request->getParams();
		//if param msg set then
		if(isset($params['msg']))
		{
			//set msg session for message
			$msg = new Zend_Session_Namespace('msg');
			if(!isset($msg->msg)) {
				//if session set then message not show again and again
				$msg->msg = true;
				$this->view->message = $this->view->translate('Invalid Username or Password. Please try again.');
			}
			
		} 
		//check post form or not
		if ($this->getRequest()->isPost()) {
			
		//unset then the msg session
		Zend_Session::namespaceUnset('msg');
		$username = $params['uname'];
		$password = $params['pwd'];
		$roleId = 1;

		//set authentication if user valid
		$data_adapter = new Auth_StaffAdapter($username, $password, $roleId);
		$auth = Zend_Auth::getInstance();
		
		$result = $auth->authenticate($data_adapter);
		
		if (Auth_StaffAdapter::hasIdentity()) {
			//create object of user class
			$Obj = new User();
			//$Obj->updateLoginTime(Auth_StaffAdapter::getIdentity()->id);
			$Obj = Doctrine_Core::getTable('User')
			->findOneBy('id', Auth_StaffAdapter::getIdentity()->id);
			$user = new Zend_Session_Namespace('user');
			$user->user_data = $Obj;
			//set session for permission
			$sessionNamespace = new Zend_Session_Namespace();
			//$sessionNamespace->settings = $Obj->permissions;
			//$Obj->setUserSession(Auth_StaffAdapter::getIdentity()->id,$_COOKIE['token']);
			$referer = new Zend_Session_Namespace('referer');
			
			if(isset($referer->refer) && $referer->refer != ''){
				$url  =  $referer->refer;
				Zend_Session::namespaceUnset('referer');
			}else{
				$url  =  HTTP_PATH . 'admin/';
			}
			//redirect to other page(user list)
			$this->_redirect($url);
				
		} else {
			//redirect to same page but with msg parameter
			$this->_helper->redirector('index', 'auth', 'admin',array('msg'=>1));
			
		}
	 }
		
   }
 	/**
	 * function generates a random password
	 * @version 1.1   
	 * @author mkaur
	 */
	public function forgotpasswordAction(){
		
		//get parameter from post /get
		$this->view->headTitle("Forgot password page");
		$params = $this->_request->getParams();
		
		//if msg param set
		if(isset($params['msg']))
		{
			//set session for msg in zend session namespance
			$msg = new Zend_Session_Namespace('msg');
			if(!isset($msg->msg)) {
				//display message in error panel only one time
				$msg->msg = true;
				$this->view->message = $this->view->translate('Your E-mail ID is not in our database');
			}
			
		}
		//check form is post or not
		if ($this->getRequest()->isPost()) {
			
				//unset then the msg session
				Zend_Session::namespaceUnset('msg');
				$email = $params["email"];
				//check user by email from database
				$result = Auth_StaffAdapter::forgotPassword($email);
				
				if ($result == true) {
					
					//generate new password 
					$newPwd = Auth_StaffAdapter::genRandomString(10);
					$setPass = Doctrine_Core::getTable('User')
					->findOneBy("id", $result['id']);
					$setPass->password = $newPwd;
					//set new password in database
					$setPass->save();
					//create view object
					$html = new Zend_View();
					$html->setScriptPath(APPLICATION_PATH. '/modules/admin/views/scripts/template/');
					//assign valeues
					$html->assign('name', $result['username']);
					$html->assign('pwd', $newPwd);
					$html->assign('host', HTTP_PATH ."admin");
					//render view
					$bodyText = $html->render('template.phtml');
					$SiteName = "Extras App";
					$EmailFrom = "rkumar@seasiaconsulting.com";
					$recipents = array("to" => $this->getRequest()->getParam("email"));
					$subject = $this->view->translate("Forgot password");
					$body = $bodyText;
					$mail = new Zend_Mail();
					// $mail->setBodyText($body);
					$mail->setBodyHtml($body);
					$mail->setFrom($SiteName, $EmailFrom);
					$mail->addTo($this->getRequest()->getParam("email"), $result['username']);
					$mail->setSubject('Account detail on '.$SiteName.' ');
					$mail->send();
					
					//send a mail to user password update notification
					//$sendEmail = BackEnd_Helper_viewHelper::SendMail($recipents,$subject, $body);
					$url  =  HTTP_PATH . 'admin/auth/pwdresetsuccessfully';
					$this->_redirect($url);
				
				
				} else {
				        //redirect to same action with param like msg
						$this->_helper->redirector('forgotpassword', 'auth', 'admin',array('msg'=>1));
					
				}
				
		}
		
	}
	/**
	 * logoutaction expire the session and redirect. 
	 * @author 
	 * @version 1.0
	 */
	public function logoutAction() {
		//clear identity of the user
		Auth_StaffAdapter::clearIdentity();
		//unset the session
		Zend_Session::namespaceUnset('settings');
		Zend_Session::namespaceUnset('user');
		//redirect to auth index action of the auth
		
		$this->_redirect("/admin"); 

	}

		
	/**
	 * display forgot password successfully 
	 * page
	 * @author Er.kundal
	 * @version 1.0
	 */
	public function pwdresetsuccessfullyAction() {
		// action body
	}
}

