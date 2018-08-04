<?php

class UserController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    	
    	$this->view->controller =  $this->getRequest()->getControllerName();
    	$this->view->action = $this->getRequest()->getActionName();
    	
    	
    }

    public function indexAction()
    {
        // action body
    	$user = new Zend_Session_Namespace('user');
    	if(isset($user->userId))
    	{
    		@$path = HTTP_PATH . 'userprofile/index';
    		$this->_redirect($path);
    	}else{
    		
    		@$path = HTTP_PATH . 'user/login';
    		$this->_redirect($path);
    	}
    }

     public function registerAction()
    {
        // action body
        $this->view->topTitle = "Sign up with BrotherTravel" ;
        
        // action body
        $this->view->headTitle("Sign up user , Register User with Brother Travel ");
        $params = $this->_request->getParams();
        //check post form or not
        if ($this->getRequest()->isPost()) {
        /*
        echo "<pre>";
        print_r($params);
        die("***************************Stopper");
*/
        if ($params) {

            $u = new User();
            $id = $u->signupUser($params);
            
        }
        //echo Zend_Json::encode($id);
        $flash = $this->_helper->getHelper('FlashMessenger');
        $message = $this->view->translate('User has been regitered successfully.');
        $flash->addMessage(array('success' => $message ));
        $this->_redirect(HTTP_PATH.'user/login');
        
        die();


        }

    }   


    
    public function loginAction()
    {
    	// action body
        $this->view->topTitle = "Sign In" ;
    	
    	$user = new Zend_Session_Namespace('user');
    	if(isset($user->userId))
    	{
    		@$path = HTTP_PATH . 'userprofile/index';
    		$this->_redirect($path);
    	}
    	// action body
    	$this->view->headTitle("Login page");
    	$params = $this->_request->getParams();
    	
    	if(isset($params['msg']))
    	{
    		//set msg session for message
    		$msg = new Zend_Session_Namespace('msg');
    		if(!isset($msg->msg)) {
    			//if session set then message not show again and again
    			$msg->msg = true;
    			$this->view->message = $this->view->translate('Invalid username or password.Please try again.');
    		}
    		 
    	}
    	
    	//check post form or not
    	if ($this->getRequest()->isPost()) {
/*echo "<pre>";
print_r($params);
die("***************************Stopper");*/
    		//unset then the msg session
    		Zend_Session::namespaceUnset('msg');
    		$username = $params['uname'];
    		$password = $params['pwd'];
            $roleId = 2;

        //set authentication if user valid
        $data_adapter = new Auth_StaffAdapter($username, $password, $roleId);
    		$auth = Zend_Auth::getInstance();
    		$result = $auth->authenticate($data_adapter);
    	
    		if (Auth_StaffAdapter::hasIdentity()) {
    			 
    			//create object of user class
    			$Obj = new User();
    			$Obj = Doctrine_Core::getTable('User')
    			->findOneBy('id', Auth_StaffAdapter::getIdentity()->id);
    	
    			$user = new Zend_Session_Namespace('user');
    			$user->user_data = $Obj;
    			// echo"<pre>";
    			//print_r($user->user_data);die;
    			 
    			$user->userId = $Obj['id'];
    			$user->firstName = $Obj['firstName'];
    			$user->email = $Obj['email'];
    	
    			    	
    			//set session for permission
    			$sessionNamespace = new Zend_Session_Namespace();
    	
    			$referer = new Zend_Session_Namespace('referer');
    			 
    			if(isset($referer->refer) && $referer->refer != ''){
    				$url  =  $referer->refer;
    				Zend_Session::namespaceUnset('referer');
    			}else{
    				$url  =  HTTP_PATH . 'userprofile/index';
    			}
    			//redirect to other page(user list)
    			$this->_redirect($url);
    	
    		} else {
    			$wronguser = $this->_request->getParam('user');
    			 
    			$this->view->username=$wronguser;
    			$flash = $this->_helper->getHelper('FlashMessenger');
    			 
    			$flash->addMessage(array('emailError'=>$username));
    			 
    			@$path = HTTP_PATH . 'user/login/msg/1';
    			//redirect to same page but with msg parameter
    			$this->_redirect($path);
    	
    		}
    	}

    
    }
    

    
    public function logoutAction() {
    	//clear identity of the user
    	Auth_StaffAdapter::clearIdentity();
    	//unset the session
    	//Zend_Session::namespaceUnset('settings');
    	Zend_Session::namespaceUnset('user');
    	 
    	//redirect to auth index action of the auth
    	$this->_helper->redirector("login" ,'user' , null );
    	
    	//$this->_redirect(.'');
    
    }
    
    
 // END Class   
}

